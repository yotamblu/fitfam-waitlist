import "server-only";
import { createHmac } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

/**
 * HMACs the raw IP with a server-side secret before it ever touches storage
 * or logs — we need it for abuse throttling, not for tracking individual
 * visitors, so we never persist the raw address.
 */
export function hashIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT;
  if (!salt) {
    throw new Error("Missing RATE_LIMIT_SALT environment variable.");
  }
  return createHmac("sha256", salt).update(ip).digest("hex");
}

export async function isRateLimited(ipHash: string): Promise<boolean> {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  const { count, error } = await getSupabaseAdmin()
    .from("waitlist_signups")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (error) {
    // Fail open on infra errors — a broken rate-limit check shouldn't block
    // legitimate signups, and the DB's unique-email constraint still stops
    // duplicate spam either way.
    console.error("Waitlist rate limit check failed:", error.message);
    return false;
  }

  return (count ?? 0) >= RATE_LIMIT_MAX_REQUESTS;
}
