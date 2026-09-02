import type { ReactNode } from "react";
import { val } from "../../../val.config";
import settingsVal from "@/content/settings.val";
import { fetchVal } from "@/val/val.rsc";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/site/command-palette";
import { JsonLd } from "@/components/seo/json-ld";
import {
  personSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/structured-data";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings = await fetchVal(settingsVal);
  const socials = settings.socials.map((social) => ({
    label: val.raw(social.label),
    url: val.raw(social.url),
  }));
  const email = val.raw(settings.email);

  return (
    <div className="flex min-h-dvh flex-col">
      <JsonLd
        id="ld-identity"
        data={[personSchema(), websiteSchema(), professionalServiceSchema()]}
      />
      <a
        href="#main"
        className="bg-accent text-accent-ink sr-only z-50 rounded-md px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer socials={socials} email={email} />
      <CommandPalette socials={socials} email={email} />
    </div>
  );
}
