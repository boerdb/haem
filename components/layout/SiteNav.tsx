"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Droplets } from "lucide-react";

const LINKS = [
  { href: "/", label: "Overzicht" },
  { href: "/heem-ijzer", label: "Heem & ijzer" },
  { href: "/erytrocyt", label: "Erytrocyt" },
  { href: "/dissociatiecurve", label: "Dissociatiecurve" },
  { href: "/bohr-effect", label: "Bohr" },
  { href: "/haldane-effect", label: "Haldane" },
  { href: "/co2-transport", label: "CO₂-transport" },
  { href: "/longen", label: "Longen" },
  { href: "/circulatie", label: "Circulatie" },
  { href: "/theorie", label: "Theorie" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-red-600" aria-hidden />
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Haemo
          </Link>
          <span className="hidden text-sm text-slate-500 sm:inline">
            O₂ · CO₂ · Hemoglobine
          </span>
        </div>
        <nav
          className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-sm"
          aria-label="Hoofdnavigatie"
        >
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 transition-colors",
                pathname === href
                  ? "bg-red-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
