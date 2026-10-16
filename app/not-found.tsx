import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MODULES } from "@/lib/modules";

export const metadata: Metadata = { title: "Pagina niet gevonden" };

export default function NotFound() {
  return (
    <div className="py-12">
      <p className="text-sm font-semibold text-red-600">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Pagina niet gevonden
      </h1>
      <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-600">
        Deze pagina bestaat niet (meer). Kies hieronder een module of ga terug naar het
        overzicht.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {MODULES.slice(0, 4).map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-red-200 hover:shadow-md"
          >
            <span className="font-semibold text-slate-900 group-hover:text-red-700">
              {m.title}
            </span>
            <span className="mt-1 block text-sm text-slate-600">{m.desc}</span>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1 font-semibold text-red-700 hover:text-red-800"
      >
        Naar het overzicht <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
