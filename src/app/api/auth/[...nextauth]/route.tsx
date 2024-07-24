import NextAuth, { NextAuthOptions, User as NextAuthUser, Session as NextAuthSession, JWT as NextAuthJWT } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken"

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.SECRET_KEY,  // Asegúrate de que esta clave sea la misma que en Flask
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }: { token: NextAuthJWT, user?: NextAuthUser, account?: any }) {
      console.log("JWT Callback - Before:", token);
      if (account) {
        token.accessToken = account.access_token;
        token.customToken = jwt.sign(
          { userId: token.sub, email: token.email },
          process.env.SECRET_KEY,
          { expiresIn: '30d' }
        )
      }
      if (user) {
        token.id = user.id;
      }
      console.log("JWT Callback - After:", token);
      return token;
    },
    async session({ session, token }: { session: NextAuthSession, token: NextAuthJWT }) {
      console.log("Session Callback - Before:", session);
      if (session.user) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
        session.user.customToken = token.customToken as string;
      }
      console.log("Session Callback - After:", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }