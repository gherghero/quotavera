import { v4 as uuidv4 } from 'uuid';
import { type NextRequest } from 'next/server';
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

type Cookies = NextRequest['cookies'] | ReadonlyRequestCookies;

const COOKIE_NAME = process.env.NEXT_PUBLIC_CLIENT_COOKIE || 'quotavera_client_id';

/**
 * Retrieves the client ID from cookies. If not present, generates a new one,
 * sets it in the cookies, and returns it.
 *
 * @param cookies - The cookies object from either a NextRequest or next/headers.
 * @returns The client_id string.
 */
export function getOrSetClientId(cookies: Cookies): string {
  let clientId = cookies.get(COOKIE_NAME)?.value;

  if (!clientId) {
    clientId = uuidv4();
    const oneYearInSeconds = 365 * 24 * 60 * 60;
    cookies.set(COOKIE_NAME, clientId, {
      httpOnly: false, // Must be readable by client-side scripts if needed
      sameSite: 'lax',
      path: '/',
      maxAge: oneYearInSeconds,
    });
  }

  return clientId;
}
