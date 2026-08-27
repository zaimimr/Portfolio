import Link from "next/link";
import { draftMode } from "next/headers";
import { val } from "../../../../../val.config";
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
      <p className="mt-1 font-mono text-mono-sm text-ink-muted">
        Everything lives in Val. No database, just commits.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-line/15 bg-surface p-4">
          <h2 className="font-mono text-sm font-semibold">Val Studio</h2>
          <p className="mt-2 font-mono text-mono-sm text-ink-muted">
            Edit content modules and publish as git commits.
          </p>
          <Link
            href="/val"
            className="mt-3 inline-block rounded-md border border-line/25 px-3 py-1.5 font-mono text-mono-sm text-accent-strong hover:bg-surface-raised"
          >
            Open studio
          </Link>
        </div>
        <div className="rounded-md border border-line/15 bg-surface p-4">
          <h2 className="font-mono text-sm font-semibold">Draft mode</h2>
          <p className="mt-2 font-mono text-mono-sm text-ink-muted">
            Currently{" "}
            <span className={draft.isEnabled ? "text-success" : "text-ink"}>
              {draft.isEnabled ? "enabled" : "disabled"}
            </span>
            . Draft mode previews unpublished Val changes on the live site.
          </p>
          <div className="mt-3 flex gap-3">
            <a
              href="/api/draft/enable"
              className="rounded-md border border-line/25 px-3 py-1.5 font-mono text-mono-sm hover:bg-surface-raised"
            >
              Enable
            </a>
            <a
              href="/api/draft/disable"
              className="rounded-md border border-line/25 px-3 py-1.5 font-mono text-mono-sm hover:bg-surface-raised"
            >
              Disable
            </a>
          </div>
        </div>
        <div className="rounded-md border border-line/15 bg-surface p-4">
          <h2 className="font-mono text-sm font-semibold">Site settings</h2>
          <dl className="mt-2 flex flex-col gap-1 font-mono text-mono-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Title</dt>
              <dd>{settings.siteTitle}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Email</dt>
              <dd>{settings.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Freelance</dt>
              <dd>
                {val.raw(settings.availableForFreelance)
                  ? "available"
                  : "not available"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-md border border-line/15 bg-surface p-4">
          <h2 className="font-mono text-sm font-semibold">Projects</h2>
          <p className="mt-2 font-mono text-mono-sm text-ink-muted">
            The projects module has not landed yet. Once it does, hidden
            projects show up here with a preview link.
          </p>
        </div>
      </div>
    </section>
  );
}
