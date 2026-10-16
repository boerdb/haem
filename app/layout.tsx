import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageNav } from "@/components/layout/PageNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Interactieve illustratie van hemoglobine, Bohr- en Haldane-effect, CO₂-transport en gasuitwisseling in de longen.";

export const metadata: Metadata = {
  title: {
    default: "Haemo — O₂/CO₂ gasuitwisseling & hemoglobine",
    template: "%s · Haemo",
  },
  description: DESCRIPTION,
  applicationName: "Haemo",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://haemo.clvs.nl",
  ),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Haemo",
    title: "Haemo — O₂/CO₂ gasuitwisseling & hemoglobine",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-slate-50 font-sans text-slate-900 antialiased`}
      >
        <SiteNav />
        <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6">
          {children}
          <PageNav />
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
