"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MODULES } from "@/lib/modules";

/** Vorige/volgende-module onderaan elke modulepagina. */
export function PageNav() {
  const pathname = usePathname();
  const index = MODULES.findIndex((m) => m.href === pathname);
  if (index === -1) return null;

  const prev = MODULES[index - 1];
  const next = MODULES[index + 1];

  return (
    <nav
      aria-label="Leerroute"
      className="mt-16 border-t border-slate-200 pt-8"
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
        Module {index + 1} van {MODULES.length}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-red-200 hover:shadow-md"
          >
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Vorige
            </span>
            <span className="mt-1 font-semibold text-slate-900 group-hover:text-red-700">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={next.href}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 text-right shadow-sm transition hover:border-red-200 hover:shadow-md"
          >
            <span className="inline-flex items-center justify-end gap-1 text-xs text-slate-500">
              Volgende <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="mt-1 font-semibold text-slate-900 group-hover:text-red-700">
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
