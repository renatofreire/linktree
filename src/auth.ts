import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { findUserByCredentials } from "./services/user";
import { Credentials as CredentialsType } from "./types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) =>
        findUserByCredentials(credentials as CredentialsType),
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user, token }) {
      session.userId = user?.id || token?.sub || "";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
