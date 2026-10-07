import { LinkHubCard } from "@/components/admin/link-hub-card";

type Demo = { slug: string; navn: string; mal: boolean; farge: string | null };

async function getDemos(): Promise<Demo[]> {
  const res = await fetch("https://zaim-demo.vercel.app/demos.json", {
    next: { revalidate: 60 },
  });
  return res.ok ? res.json() : [];
}

function DemoGrid({ demos }: { demos: Demo[] }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {demos.map((demo) => (
        <LinkHubCard
          key={demo.slug}
          label={demo.navn}
          description={`zaim.no/demo/${demo.slug}`}
          url={`https://zaim.no/demo/${demo.slug}`}
          adminUrl={null}
          accent={demo.farge}
        />
      ))}
    </div>
  );
}

export default async function DemosPage() {
  const demos = await getDemos();
  const kunder = demos.filter((demo) => !demo.mal);
  const maler = demos.filter((demo) => demo.mal);
  return (
    <section>
      <h1 className="font-display text-h3 font-bold">Demos</h1>
      <p className="text-mono-sm text-ink-muted mt-1 font-mono">
        {kunder.length} demos
      </p>
      <DemoGrid demos={kunder} />
      <h2 className="mt-10 font-mono text-sm font-semibold">Templates</h2>
      <DemoGrid demos={maler} />
    </section>
  );
}
