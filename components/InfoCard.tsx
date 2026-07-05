import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  accent?: "o2" | "co2" | "neutral";
};

const accentBorder = {
  o2: "border-l-blue-500",
  co2: "border-l-orange-500",
  neutral: "border-l-slate-400",
};

export function InfoCard({
  title,
  children,
  className,
  accent = "neutral",
}: InfoCardProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-slate-200 border-l-4 bg-white p-5 shadow-sm",
        accentBorder[accent],
        className,
      )}
    >
      <h2 className="mb-2 text-base font-semibold text-slate-900">{title}</h2>
      <div className="prose-haemo text-sm">{children}</div>
    </section>
  );
}
