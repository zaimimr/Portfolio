type StatTileProps = {
  label: string;
  value: string;
  hint?: string;
};

export function StatTile({ label, value, hint }: StatTileProps) {
  return (
    <div className="rounded-md border border-line/20 bg-surface p-4">
      <p className="font-mono text-mono-sm text-ink-muted">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold">{value}</p>
      {hint ? (
        <p className="mt-1 font-mono text-mono-sm text-ink-faint">{hint}</p>
      ) : null}
    </div>
  );
}
