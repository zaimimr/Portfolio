import Link from "next/link";
import { draftMode } from "next/headers";
import settingsVal from "@/content/settings.val";
import { fetchVal } from "@/val/val.rsc";

export default async function ContentPage() {
  const [draft, settings] = await Promise.all([
    draftMode(),
    fetchVal(settingsVal),
  ]);
  return (
    <section>
      <h1 className="font-display text-h3 font-bold">Content</h1>
      <p className="text-mono-sm text-ink-muted mt-1 font-mono">
        Everything lives in Val. No database, just commits.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="border-line/15 bg-surface rounded-md border p-4">
          <h2 className="font-mono text-sm font-semibold">Val Studio</h2>
          <p className="text-mono-sm text-ink-muted mt-2 font-mono">
            Edit content modules and publish as git commits.
          </p>
          <Link
            href="/val"
            className="border-line/25 text-mono-sm text-accent-strong hover:bg-surface-raised mt-3 inline-block rounded-md border px-3 py-1.5 font-mono"
          >
            Open studio
          </Link>
        </div>
        <div className="border-line/15 bg-surface rounded-md border p-4">
          <h2 className="font-mono text-sm font-semibold">Draft mode</h2>
          <p className="text-mono-sm text-ink-muted mt-2 font-mono">
            Currently{" "}
            <span className={draft.isEnabled ? "text-success" : "text-ink"}>
              {draft.isEnabled ? "enabled" : "disabled"}
            </span>
            . Draft mode previews unpublished Val changes on the live site.
          </p>
          <div className="mt-3 flex gap-3">
            <a
              href="/api/draft/enable"
              className="border-line/25 text-mono-sm hover:bg-surface-raised rounded-md border px-3 py-1.5 font-mono"
            >
              Enable
            </a>
            <a
              href="/api/draft/disable"
              className="border-line/25 text-mono-sm hover:bg-surface-raised rounded-md border px-3 py-1.5 font-mono"
            >
              Disable
            </a>
          </div>
        </div>
        <div className="border-line/15 bg-surface rounded-md border p-4">
          <h2 className="font-mono text-sm font-semibold">Site settings</h2>
          <dl className="text-mono-sm mt-2 flex flex-col gap-1 font-mono">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Title</dt>
              <dd>{settings.siteTitle}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Email</dt>
              <dd>{settings.email}</dd>
            </div>
          </dl>
        </div>
        <div className="border-line/15 bg-surface rounded-md border p-4">
          <h2 className="font-mono text-sm font-semibold">Projects</h2>
          <p className="text-mono-sm text-ink-muted mt-2 font-mono">
            The projects module has not landed yet. Once it does, hidden
            projects show up here with a preview link.
          </p>
        </div>
      </div>
    </section>
  );
}
