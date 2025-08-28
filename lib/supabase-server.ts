import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client for use in server environments (Server Components, Route Handlers, Server Actions).
 *
 * IMPORTANT: This module should NEVER be imported into a client-side component.
 *
 * This client uses the service role key and has super-admin privileges.
 * It should only be used on the server for operations requiring elevated access.
 */
export const createServerSupabase = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase URL or Service Role Key is not set for server-side operations.');
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};
