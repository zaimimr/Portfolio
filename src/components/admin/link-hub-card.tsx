type LinkHubCardProps = {
  label: string;
  description: string;
  url: string;
  adminUrl: string | null;
  accent: string | null;
};

export function LinkHubCard({
  label,
  description,
  url,
  adminUrl,
  accent,
}: LinkHubCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-md border border-line/20 bg-surface p-4">
      <div className="flex items-center gap-2">
        {accent ? (
          <span
            aria-hidden
            className="size-2 rounded-full"
            style={{ backgroundColor: accent }}
          />
        ) : null}
        <h2 className="font-mono text-sm font-semibold">{label}</h2>
      </div>
      <p className="text-sm text-ink-muted">{description}</p>
      <div className="mt-auto flex gap-4 pt-2 font-mono text-mono-sm">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-accent-strong hover:underline"
        >
          open
        </a>
        {adminUrl ? (
          <a
            href={adminUrl}
            target="_blank"
            rel="noreferrer"
            className="text-ink-muted hover:underline"
          >
            admin
          </a>
        ) : null}
      </div>
    </article>
  );
}
