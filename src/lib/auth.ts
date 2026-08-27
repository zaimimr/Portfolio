import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { envOptional } from "@/lib/env";
import {
  authorizeAdminGithubProfile,
  refreshAdminGithubToken,
} from "@/lib/admin-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt", maxAge: 12 * 60 * 60 },
  pages: { signIn: "/sign-in", error: "/sign-in" },
  callbacks: {
    signIn: ({ profile }) =>
      authorizeAdminGithubProfile(
        profile,
        envOptional("ADMIN_GITHUB_ACCOUNTS"),
      ),
    jwt: ({ token, profile }) =>
      refreshAdminGithubToken(
        token,
        profile,
        envOptional("ADMIN_GITHUB_ACCOUNTS"),
      ),
    session: ({ session, token }) => {
      if (typeof token.login === "string") {
        session.user.login = token.login;
      }
      if (typeof token.githubId === "string") {
        session.user.githubId = token.githubId;
      }
      return session;
    },
  },
});
