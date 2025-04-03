import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

// Use different providers based on environment
const providers = [];

// Always add Credentials provider for local development
providers.push(
  Credentials({
    name: 'Demo Account',
    credentials: {
      username: { label: "Username", type: "text", placeholder: "demo" },
      password: { label: "Password", type: "password", placeholder: "demo" }
    },
    async authorize(credentials) {
      // Simple local demo login
      if (credentials?.username === 'demo' && credentials?.password === 'demo') {
        return {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          image: '/placeholder-user.jpg'
        };
      }
      return null;
    }
  })
);

// Add GitHub provider if configured
if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
  providers.push(GitHub);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: '/login'
  }
});
