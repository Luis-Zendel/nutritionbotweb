import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      customToken: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    accessToken: string;
    customToken?: string;
    sub?: string;
    email?: string;
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    customToken?: string;
  }
}
