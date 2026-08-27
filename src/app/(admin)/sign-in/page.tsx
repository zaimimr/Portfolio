import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const callbackParam = params.callbackUrl;
  const callbackUrl =
    typeof callbackParam === "string" && callbackParam.startsWith("/")
      ? callbackParam
      : "/admin";
  const denied = params.error === "AccessDenied";
  const failed = typeof params.error === "string" && !denied;
  const session = await auth();
  if (session?.user) {
    redirect(callbackUrl);
  }
  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg px-4 text-ink">
      <div className="w-full max-w-sm rounded-md border border-line/15 bg-surface p-6">
        <p className="font-display text-2xl font-bold">Z.</p>
        <h1 className="mt-4 font-mono text-sm font-semibold">Admin</h1>
        {denied ? (
          <div className="mt-2">
            <p className="font-mono text-sm text-danger">
              This door is for Zaim.
            </p>
            <p className="mt-1 font-mono text-mono-sm text-ink-muted">
              That GitHub account is not on the list.
            </p>
          </div>
        ) : failed ? (
          <p className="mt-2 font-mono text-mono-sm text-danger">
            Sign-in failed ({String(params.error)}). Try again.
          </p>
        ) : (
          <p className="mt-2 font-mono text-mono-sm text-ink-muted">
            Sign in with GitHub to continue.
          </p>
        )}
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: callbackUrl });
          }}
        >
          <button
            type="submit"
            className="mt-5 w-full rounded-md border border-line/25 bg-surface-raised px-4 py-2 font-mono text-sm hover:bg-bg"
          >
            Sign in with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}
