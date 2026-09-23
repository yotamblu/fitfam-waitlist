import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service_role key, which bypasses Row
// Level Security. The `server-only` import makes any accidental client-side
// import of this module fail the build instead of leaking the key to the
// browser bundle.
//
// Client creation is lazy (deferred until first request) rather than at
// module load: Next.js evaluates route modules while collecting page data
// during `next build`, so an eager env-var check here would fail the build
// itself whenever env vars aren't present at build time (e.g. locally,
// before `.env.local` is configured).

let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return cachedClient;
}
