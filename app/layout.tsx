import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteNav } from "@/components/layout/SiteNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haemo — O₂/CO₂ gasuitwisseling & hemoglobine",
  description:
    "Interactieve illustratie van hemoglobine, Bohr- en Haldane-effect, CO₂-transport en gasuitwisseling in de longen.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://haemo.clvs.nl",
  ),
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
        </main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
          Haemo · Gasuitwisseling & hemoglobine ·{" "}
          <a href="/appendix" className="underline hover:text-slate-700">
            Appendix
          </a>
        </footer>
      </body>
    </html>
  );
}
