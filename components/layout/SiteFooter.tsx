import Link from "next/link";
import { Droplets } from "lucide-react";
import { MODULES } from "@/lib/modules";

const BACKGROUND = ["/theorie", "/appendix"];

export function SiteFooter() {
  const interactive = MODULES.filter((m) => !BACKGROUND.includes(m.href));
  const background = MODULES.filter((m) => BACKGROUND.includes(m.href));

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 text-sm sm:grid-cols-[1.4fr_1fr_1fr] sm:px-6">
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <Droplets className="h-5 w-5 text-red-600" aria-hidden />
            Haemo
          </Link>
          <p className="mt-3 max-w-xs leading-relaxed text-slate-600">
            Interactieve uitleg van O₂- en CO₂-transport, hemoglobine en het Bohr- en
            Haldane-effect.
          </p>
        </div>

        <nav aria-label="Modules">
          <h2 className="font-semibold text-slate-900">Modules</h2>
          <ul className="mt-3 space-y-2">
            {interactive.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="text-slate-600 hover:text-red-700">
                  {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Achtergrond">
          <h2 className="font-semibold text-slate-900">Achtergrond</h2>
          <ul className="mt-3 space-y-2">
            {background.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="text-slate-600 hover:text-red-700">
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Haemo</p>
          <p className="max-w-xl sm:text-right">
            Educatief hulpmiddel met vereenvoudigde modellen — geen vervanging voor
            klinisch oordeel of bloedgasanalyse.
          </p>
        </div>
      </div>
    </footer>
  );
}
