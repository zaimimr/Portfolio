import { val } from "../../../val.config";
import pagesVal from "@/content/pages.val";
import settingsVal from "@/content/settings.val";
import { fetchVal } from "@/val/val.rsc";
import { envOptional } from "@/lib/env";
import { ContactForm } from "@/components/site/contact-form";
import { Highlight } from "@/components/site/highlight";
import { SketchIcon } from "@/components/ui/sketch-icon";

export async function ContactSection() {
  const settings = await fetchVal(settingsVal);
  const copy = await fetchVal(pagesVal);
  const email = val.raw(settings.email);
  const availableForFreelance = val.raw(settings.availableForFreelance);
  const formEnabled = Boolean(
    envOptional("RESEND_API_KEY") && envOptional("CONTACT_TO_EMAIL"),
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-gutter pb-section"
    >
      <div className="grid gap-10 md:grid-cols-12">
        <div className="flex flex-col gap-4 md:col-span-5">
          <h2
            id="contact-heading"
            className="font-display text-h1 font-bold text-ink"
          >
            Say <Highlight>hei</Highlight>
          </h2>
          <p className="max-w-md text-body-lg text-ink-muted">
            {copy.contactBlurb}
          </p>
          {availableForFreelance ? (
            <p className="mt-2 -rotate-1 self-start rounded-wobble-sm border-2 border-line bg-surface px-4 py-2 font-hand text-hand text-ink shadow-offset-sm">
              {copy.freelanceBadge}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-7">
          {formEnabled ? (
            <ContactForm email={email} />
          ) : (
            <div className="flex flex-col gap-4 rounded-wobble-2 border-2 border-line bg-surface p-8 shadow-offset">
              <p className="font-hand text-h3 text-ink">
                The form is taking a nap.
              </p>
              <p className="text-body text-ink-muted">
                Email me directly instead, I read everything:
              </p>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 self-start font-semibold text-accent-strong underline decoration-2 underline-offset-4 hover:decoration-wavy"
              >
                <SketchIcon name="mail" size={18} />
                {email}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
