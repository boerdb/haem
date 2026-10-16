"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

/** Het actieve hoofdstuk is het laatste waarvan de kop onder de vaste navigatie door is. */
function useActiveSection(ids: string[]) {
  const key = ids.join(",");
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const list = key.split(",");
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [key]);
  return active;
}

/** Bij afdrukken alle verdiepingen openklappen. */
function useOpenDetailsOnPrint() {
  useEffect(() => {
    const open = () => document.querySelectorAll("details").forEach((d) => d.setAttribute("open", ""));
    window.addEventListener("beforeprint", open);
    return () => window.removeEventListener("beforeprint", open);
  }, []);
}

/** Inhoudsopgave in de zijkolom (desktop). */
export function TheoryToc({ items }: { items: Item[] }) {
  const active = useActiveSection(items.map((i) => i.id));
  useOpenDetailsOnPrint();

  return (
    <nav
      className="sticky top-28 hidden max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 lg:block print:hidden"
      aria-label="Inhoudsopgave"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Inhoud</p>
      <ol className="space-y-0.5 text-sm">
        {items.map(({ id, label }, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={id === active ? "true" : undefined}
              className={cn(
                "block rounded-md border-l-2 px-2 py-1 transition",
                id === active
                  ? "border-red-600 bg-red-50 font-medium text-red-800"
                  : "border-transparent text-slate-600 hover:text-red-700",
              )}
            >
              <span className="mr-1.5 font-mono text-xs text-slate-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Uitklapbare inhoudsopgave die onder de navigatie blijft staan (mobiel en tablet). */
export function TheoryTocMobile({ items }: { items: Item[] }) {
  const active = useActiveSection(items.map((i) => i.id));
  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.id === active),
  );

  return (
    <details className="group sticky top-[6.25rem] z-20 -mx-4 mt-6 border-y border-slate-200 bg-white/95 backdrop-blur sm:-mx-6 lg:hidden print:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-2.5 text-sm sm:px-6 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 truncate">
          <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Inhoud</span>
          <span className="font-medium text-slate-900">
            {String(activeIndex + 1).padStart(2, "0")} · {items[activeIndex]?.label}
          </span>
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-slate-500 transition group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <ol className="max-h-[60dvh] overflow-y-auto border-t border-slate-100 px-2 py-2 text-sm">
        {items.map(({ id, label }, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")}
              className={cn(
                "block rounded-md px-3 py-2",
                id === active ? "bg-red-50 font-medium text-red-800" : "text-slate-700",
              )}
            >
              <span className="mr-2 font-mono text-xs text-slate-400">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
