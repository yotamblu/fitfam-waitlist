import { NextRequest, NextResponse } from "next/server";
import { waitlistSignupSchema } from "@/lib/waitlist/schema";
import { hashIp, isRateLimited } from "@/lib/waitlist/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const GENERIC_ERROR = "משהו השתבש. נסו שוב.";
const UNIQUE_VIOLATION = "23505";

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  // Honeypot: a hidden field real users never see or fill in. If it has a
  // value, the request came from a bot — report success without touching
  // the database, so the bot has no signal to adapt against.
  if (
    typeof body === "object" &&
    body !== null &&
    "company" in body &&
    typeof (body as { company?: unknown }).company === "string" &&
    (body as { company: string }).company.length > 0
  ) {
    return NextResponse.json({ success: true });
  }

  const parsed = waitlistSignupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "נתונים לא תקינים." },
      { status: 400 }
    );
  }

  // Anything below here can throw for infra reasons (missing env vars,
  // Supabase being unreachable, etc.) — always surface those as a generic
  // JSON error instead of letting them crash the request uncaught.
  try {
    const ipHash = hashIp(getClientIp(req));

    if (await isRateLimited(ipHash)) {
      return NextResponse.json(
        { error: "יותר מדי ניסיונות. נסו שוב בעוד כמה דקות." },
        { status: 429 }
      );
    }

    const { email, favoriteSport } = parsed.data;

    const { error } = await getSupabaseAdmin().from("waitlist_signups").insert({
      email,
      favorite_sport: favoriteSport ?? null,
      ip_hash: ipHash,
      user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
    });

    if (error) {
      // Already on the list — treat as success rather than leaking that the
      // email exists (avoids turning this into an email-enumeration endpoint).
      if (error.code === UNIQUE_VIOLATION) {
        return NextResponse.json({ success: true });
      }
      console.error("Waitlist insert failed:", error.message);
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist signup failed:", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
