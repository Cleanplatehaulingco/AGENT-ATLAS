import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const validUser = process.env.AUTH_USERNAME || 'raven';
        const storedHash = process.env.AUTH_PASSWORD_HASH;
        const plainPassword = process.env.AUTH_PASSWORD;

        if (credentials.username !== validUser) return null;

        // Support either a bcrypt hash (AUTH_PASSWORD_HASH) or plain password (AUTH_PASSWORD)
        if (storedHash) {
          const valid = await bcrypt.compare(credentials.password, storedHash);
          if (!valid) return null;
        } else if (plainPassword) {
          if (credentials.password !== plainPassword) return null;
        } else {
          return null;
        }

        return { id: '1', name: 'Raven', email: 'owner@ravensbaublesngifts.com' };
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 }, // 30 days
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
