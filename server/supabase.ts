import { createClient, SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;

const url = process.env.SUPABASE_URL as string | undefined;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as
  | string
  | undefined;
const anonKey = process.env.SUPABASE_ANON_KEY as string | undefined;

const key = serviceRoleKey || anonKey;

if (url && key) {
  serverClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const supabaseServer = serverClient;
export const hasSupabaseServer = Boolean(serverClient);
