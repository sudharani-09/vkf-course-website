import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export function normalizeSupabaseUrl(url: string): string {
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL to .env.local");
  }
  return normalizeSupabaseUrl(url);
}

export function getSupabase() {
  const url = getSupabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error("Supabase is not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local");
  }
  if (!supabase) {
    supabase = createClient(url, key, {
      global: {
        // Bypass Next.js fetch cache so every Supabase query hits the DB fresh.
        // Without this, Next.js App Router caches PostgREST responses and admin
        // changes don't appear on the website until a redeploy.
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    });
  }
  return supabase;
}

export function getStoragePublicUrl(path: string): string {
  return `${getSupabaseUrl()}/storage/v1/object/public/site-assets/${path}`;
}
