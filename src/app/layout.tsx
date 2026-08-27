import { ValProvider } from "@valbuild/next";
import { config } from "../../val.config";
import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Schibsted_Grotesk,
  Shantell_Sans,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-schibsted",
});

const shantell = Shantell_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-shantell",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Zaim Imran",
    template: "%s · Zaim Imran",
  },
  description: "Selected websites, apps, games and experiments by Zaim Imran.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${schibsted.variable} ${shantell.variable} ${jetbrains.variable} antialiased`}
      >
        <ValProvider config={config}>
          <Providers>{children}</Providers>
        </ValProvider>
        <Analytics />
      </body>
    </html>
  );
}
