import type { Metadata } from "next";
import { ContactSection } from "@/components/site/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Zaim Imran about projects, work or anything else.",
};

export default function ContactPage() {
  return (
    <div className="pt-10 md:pt-16">
      <ContactSection />
    </div>
  );
}
