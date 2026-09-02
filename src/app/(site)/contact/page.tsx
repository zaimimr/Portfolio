import type { Metadata } from "next";
import { ogImage } from "@/lib/site";
import { ContactSection } from "@/components/site/contact-section";

const contactDescription =
  "Get in touch with Zaim Imran about a project, freelance or contract work, a talk or a workshop. Based in Oslo, Norway, and works remotely.";

export const metadata: Metadata = {
  title: "Contact Zaim Imran",
  description: contactDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: "Contact Zaim Imran",
    description: contactDescription,
    images: [ogImage],
  },
};

export default function ContactPage() {
  return (
    <div className="pt-10 md:pt-16">
      <ContactSection headingLevel="h1" />
    </div>
  );
}
