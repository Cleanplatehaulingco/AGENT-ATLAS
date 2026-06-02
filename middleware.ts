export { default } from 'next-auth/middleware';

export const config = {
  // Protect every route except login, NextAuth API, and static assets
  matcher: ['/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)'],
};
