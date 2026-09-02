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
import {
  ogImage,
  searchKeywords,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/site";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName}, developer in Oslo`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  keywords: searchKeywords,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    locale: "en",
    url: "/",
    title: `${siteName}, developer in Oslo`,
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName}, developer in Oslo`,
    description: siteDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  other: {
    "geo.region": "NO-03",
    "geo.placename": "Oslo",
  },
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
