import { val } from "../../../val.config";
import pagesVal from "@/content/pages.val";
import settingsVal from "@/content/settings.val";
import { fetchVal } from "@/val/val.rsc";
import { envOptional } from "@/lib/env";
import { ContactForm } from "@/components/site/contact-form";
import { SketchIcon } from "@/components/ui/sketch-icon";
import { SceneWash } from "@/components/site/scene-wash";

export async function ContactSection({
  headingLevel: Heading = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const [settings, copy] = await Promise.all([
    fetchVal(settingsVal),
    fetchVal(pagesVal),
  ]);
  const email = val.raw(settings.email);
  const formEnabled = Boolean(
    envOptional("RESEND_API_KEY") && envOptional("CONTACT_TO_EMAIL"),
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pb-section w-full scroll-mt-24 overflow-x-clip"
    >
      <div className="px-gutter mx-auto w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="flex flex-col gap-4 md:col-span-5">
            <Heading
              id="contact-heading"
              className="font-display text-h1 text-ink font-bold"
            >
              Contact
            </Heading>
            <span className="relative block max-w-md">
              <SceneWash className="-inset-x-12 -inset-y-12" />
              <span className="text-body-lg text-ink-muted block">
                {copy.contactBlurb}
              </span>
            </span>
          </div>
          <div className="md:col-span-7">
            {formEnabled ? (
              <ContactForm email={email} />
            ) : (
              <div className="rounded-wobble-2 border-line bg-surface shadow-offset flex flex-col gap-4 border-2 p-8">
                <p className="font-hand text-h3 text-ink">Email me directly</p>
                <p className="text-body text-ink-muted">
                  The contact form is unavailable.
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-accent-strong inline-flex items-center gap-2 self-start font-semibold underline decoration-2 underline-offset-4 hover:decoration-wavy"
                >
                  <SketchIcon name="mail" size={18} />
                  {email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
