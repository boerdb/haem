import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TheorySectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function TheorySection({ id, title, children, className }: TheorySectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 border-t border-slate-200 pt-10 first:border-0 first:pt-0", className)}>
      <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">{title}</h2>
      <div className="prose-theory space-y-4 text-slate-700">{children}</div>
    </section>
  );
}

export function TheoryToc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav
      className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 lg:block"
      aria-label="Inhoudsopgave"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Inhoud
      </p>
      <ol className="space-y-1.5 text-sm">
        {items.map(({ id, label }, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="text-slate-600 hover:text-red-700 hover:underline"
            >
              {i + 1}. {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function TheoryCallout({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
      {children}
    </aside>
  );
}

export function TheoryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-medium text-red-700 underline hover:text-red-800">
      {children}
    </Link>
  );
}
