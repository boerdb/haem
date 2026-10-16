import Link from "next/link";
import { AlertTriangle, ArrowRight, Info, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export { TheoryToc, TheoryTocMobile } from "@/components/theory/TheoryToc";

type TheorySectionProps = {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
  /** Link naar de bijbehorende interactieve module of animatie */
  related?: { href: string; label: string };
  className?: string;
};

export function TheorySection({ id, number, title, children, related, className }: TheorySectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-t border-slate-200 pt-10 first:border-0 first:pt-0 print:break-inside-avoid-page",
        className,
      )}
    >
      <h2 className="mb-4 flex items-baseline gap-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        <span className="font-mono text-base font-semibold text-red-600">{String(number).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="prose-theory space-y-4 text-slate-700">{children}</div>
      {related && (
        <Link
          href={related.href}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-red-300 hover:text-red-700 print:hidden"
        >
          {related.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      )}
    </section>
  );
}

export function TheorySubheading({ children }: { children: ReactNode }) {
  return <h3 className="!mt-6 text-base font-semibold text-slate-900">{children}</h3>;
}

export function TheoryCallout({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
      {children}
    </aside>
  );
}

const BOX = {
  pearl: {
    label: "Klinische parel",
    Icon: Stethoscope,
    cls: "border-emerald-200 bg-emerald-50/70 [&_h4]:text-emerald-800",
    icon: "text-emerald-600",
  },
  pitfall: {
    label: "Valkuil",
    Icon: AlertTriangle,
    cls: "border-rose-200 bg-rose-50/70 [&_h4]:text-rose-800",
    icon: "text-rose-600",
  },
  note: {
    label: "Toelichting",
    Icon: Info,
    cls: "border-sky-200 bg-sky-50/70 [&_h4]:text-sky-800",
    icon: "text-sky-600",
  },
} as const;

/** Kader voor klinische parels, valkuilen en toelichting. */
export function TheoryBox({
  kind,
  title,
  children,
}: {
  kind: keyof typeof BOX;
  title?: string;
  children: ReactNode;
}) {
  const { label, Icon, cls, icon } = BOX[kind];
  return (
    <aside className={cn("rounded-xl border px-4 py-3.5 text-[0.95rem] print:break-inside-avoid", cls)}>
      <h4 className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
        <Icon className={cn("h-4 w-4", icon)} aria-hidden />
        {title ? `${label} — ${title}` : label}
      </h4>
      <div className="space-y-2 text-slate-700">{children}</div>
    </aside>
  );
}

/** Formule met uitleg per variabele. */
export function Formula({
  children,
  vars,
  caption,
}: {
  children: ReactNode;
  vars?: [ReactNode, ReactNode][];
  caption?: ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white print:break-inside-avoid">
      <div className="overflow-x-auto bg-slate-50 px-4 py-3 font-mono text-[0.95rem] text-slate-900">
        {children}
      </div>
      {vars && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-4 py-3 text-sm">
          {vars.map(([sym, desc], i) => (
            <div key={i} className="contents">
              <dt className="font-mono font-semibold text-slate-900">{sym}</dt>
              <dd className="text-slate-600">{desc}</dd>
            </div>
          ))}
        </dl>
      )}
      {caption && <figcaption className="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

/** Inklapbare verdieping; wordt bij afdrukken automatisch geopend (zie TheoryToc). */
export function Deepening({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-800 hover:text-red-700 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="mr-2 text-xs font-bold uppercase tracking-wider text-slate-400">Verdieping</span>
          {title}
        </span>
        <span className="text-slate-400 transition group-open:rotate-90" aria-hidden>
          ›
        </span>
      </summary>
      <div className="space-y-3 border-t border-slate-100 px-4 py-4 text-[0.95rem] text-slate-700">{children}</div>
    </details>
  );
}

/** Tabel met referentie- of vergelijkingswaarden. */
export function RefTable({
  head,
  rows,
  caption,
}: {
  head: ReactNode[];
  rows: ReactNode[][];
  caption?: ReactNode;
}) {
  return (
    <figure className="overflow-x-auto rounded-xl border border-slate-200 bg-white print:break-inside-avoid">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-50 text-left text-slate-700">
          <tr>
            {head.map((h, i) => (
              <th key={i} className="whitespace-nowrap px-3 py-2 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-100 align-top">
              {r.map((c, j) => (
                <td key={j} className={cn("px-3 py-2", j === 0 ? "font-medium text-slate-900" : "text-slate-700")}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <figcaption className="border-t border-slate-100 px-3 py-2 text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

/** Genummerde bronverwijzing; nummers volgen de volgorde in `order`. */
export function Cite({ k, order }: { k: string | string[]; order: string[] }) {
  const keys = (Array.isArray(k) ? k : [k])
    .map((key) => ({ key, n: order.indexOf(key) + 1 }))
    .sort((a, b) => a.n - b.n);
  return (
    <sup className="ml-0.5 whitespace-nowrap text-[0.7em] font-semibold">
      [
      {keys.map(({ key, n }, i) => (
        <span key={key}>
          {i > 0 && ","}
          <a href={`#ref-${key}`} className="text-red-700 no-underline hover:underline">
            {n || "?"}
          </a>
        </span>
      ))}
      ]
    </sup>
  );
}

export function TheoryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-medium text-red-700 underline hover:text-red-800">
      {children}
    </Link>
  );
}
