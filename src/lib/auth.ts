import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { envOptional } from "@/lib/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in", error: "/sign-in" },
  callbacks: {
    signIn: ({ profile }) => {
      const allowed = envOptional("ADMIN_GITHUB_LOGIN");
      const login = profile?.login;
      return allowed !== undefined && typeof login === "string" && login === allowed;
    },
    jwt: ({ token, profile }) => {
      if (typeof profile?.login === "string") {
        token.login = profile.login;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (typeof token.login === "string") {
        session.user.login = token.login;
      }
      return session;
    },
  },
});
