import { val } from "../../../../val.config";
import adminLinksVal from "@/content/admin-links.val";
import { fetchVal } from "@/val/val.rsc";
import { LinkHubCard } from "@/components/admin/link-hub-card";

export default async function AdminPage() {
  const links = await fetchVal(adminLinksVal);
  return (
    <section>
      <h1 className="font-display text-h3 font-bold">Links</h1>
      <p className="mt-1 font-mono text-mono-sm text-ink-muted">
        Every side project and its dashboard, one hop away.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {links.map((link, index) => (
          <LinkHubCard
            key={index}
            label={link.label}
            description={link.description}
            url={val.raw(link.url)}
            adminUrl={link.adminUrl !== null ? val.raw(link.adminUrl) : null}
            accent={link.accent !== null ? val.raw(link.accent) : null}
          />
        ))}
      </div>
    </section>
  );
}
