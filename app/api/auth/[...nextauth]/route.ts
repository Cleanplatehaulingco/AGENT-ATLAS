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
        const validUser = process.env.AUTH_USERNAME || 'admin';
        const storedHash = process.env.AUTH_PASSWORD_HASH;
        const plainPassword = process.env.AUTH_PASSWORD || 'CarePing2024!';
        if (credentials.username !== validUser) return null;
        if (storedHash) {
          const valid = await bcrypt.compare(credentials.password, storedHash);
          if (!valid) return null;
        } else if (plainPassword) {
          if (credentials.password !== plainPassword) return null;
        } else {
          return null;
        }
        return { id: '1', name: 'Care Team', email: 'care@carepingapp.com' };
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: '/login' },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
