import { v4 as uuidv4 } from 'uuid';
import { type NextRequest } from 'next/server';
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

type Cookies = NextRequest['cookies'] | ReadonlyRequestCookies;

const COOKIE_NAME = process.env.NEXT_PUBLIC_CLIENT_COOKIE || 'quotavera_client_id';

/**
 * Retrieves the client ID from cookies. If not present, generates a new one.
 *
 * @param cookies - The cookies object from a NextRequest or next/headers.
 * @returns An object containing the clientId and a flag indicating if it's new.
 */
export function getOrGenerateClientId(cookies: Cookies): { clientId: string; isNew: boolean } {
  const clientId = cookies.get(COOKIE_NAME)?.value;

  if (clientId) {
    return { clientId, isNew: false };
  }

  const newClientId = uuidv4();
  return { clientId: newClientId, isNew: true };
}
