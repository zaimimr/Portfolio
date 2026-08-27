import type { ReactNode } from "react";
import { val } from "../../../val.config";
import settingsVal from "@/content/settings.val";
import { fetchVal } from "@/val/val.rsc";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/site/command-palette";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await fetchVal(settingsVal);
  const socials = settings.socials.map((social) => ({
    label: val.raw(social.label),
    url: val.raw(social.url),
  }));
  const email = val.raw(settings.email);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
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
