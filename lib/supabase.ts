import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client for use in browser environments (client components, pages).
 * This client uses the public anonymous key and is safe to expose to users.
 */
export const createBrowserClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

/**
 * Creates a Supabase client for use in server environments (Route Handlers, Server Actions).
 *
 * IMPORTANT: This module should NEVER be imported into a client-side component.
 *
 * This client uses the service role key and has super-admin privileges.
 * It should only be used on the server for operations requiring elevated access.
 */
export const createServiceClient = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set for server-side operations.');
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};
