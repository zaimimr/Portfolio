import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=%2Fadmin");
  }
  const identity = session.user.login ?? session.user.name ?? "signed in";
  return (
    <div className="flex min-h-dvh bg-bg text-ink">
      <aside className="flex w-52 shrink-0 flex-col border-r border-line/15 px-4 py-6">
        <Link href="/admin" className="font-display text-2xl font-bold">
          Z.
        </Link>
        <span className="font-mono text-mono-sm text-ink-faint">admin</span>
        <AdminNav />
        <Link
          href="/"
          className="mt-auto rounded-md px-3 py-2 font-mono text-mono-sm text-ink-muted hover:bg-surface hover:text-ink"
        >
          Back to site
        </Link>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-line/15 px-6 py-3">
          <span className="font-mono text-mono-sm text-ink-muted">
            {identity}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="rounded-md border border-line/25 px-3 py-1.5 font-mono text-mono-sm text-ink-muted hover:bg-surface hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
