import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";
import { PRIMARY_GITHUB_ACCOUNT, safeAdminCallbackUrl } from "@/lib/admin-auth";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const callbackUrl = safeAdminCallbackUrl(params.callbackUrl);
  const denied = params.error === "AccessDenied";
  const failed = typeof params.error === "string" && !denied;
  const session = await auth();
  if (session?.user) {
    redirect(callbackUrl);
  }
  return (
    <main className="bg-bg text-ink flex min-h-dvh items-center justify-center px-4">
      <div className="border-line/15 bg-surface w-full max-w-sm rounded-md border p-6">
        <p className="font-display text-2xl font-bold">Z.</p>
        <h1 className="mt-4 font-mono text-sm font-semibold">Admin</h1>
        {denied ? (
          <div className="mt-2">
            <p className="text-danger font-mono text-sm">Access denied.</p>
            <p className="text-mono-sm text-ink-muted mt-1 font-mono">
              That GitHub account is not invited.
            </p>
          </div>
        ) : failed ? (
          <p className="text-mono-sm text-danger mt-2 font-mono">
            Sign-in failed ({String(params.error)}). Try again.
          </p>
        ) : (
          <p className="text-mono-sm text-ink-muted mt-2 font-mono">
            Sign in with GitHub to continue.
          </p>
        )}
        <form
          action={async () => {
            "use server";
            await signIn(
              "github",
              { redirectTo: callbackUrl },
              { login: PRIMARY_GITHUB_ACCOUNT.login },
            );
          }}
        >
          <button
            type="submit"
            className="border-line/25 bg-surface-raised hover:bg-bg mt-5 w-full rounded-md border px-4 py-2 font-mono text-sm"
          >
            Continue with zaimimr
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: callbackUrl });
          }}
        >
          <button
            type="submit"
            className="text-mono-sm text-ink-muted hover:bg-bg hover:text-ink mt-2 w-full rounded-md px-4 py-2 font-mono"
          >
            Use another invited account
          </button>
        </form>
      </div>
    </main>
  );
}
