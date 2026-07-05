import type { BloodGasValues } from "@/lib/physiology/co2Transport";
import { formatKpaFromMmHg } from "@/lib/units";
import { cn } from "@/lib/utils";

type BloodGasPanelProps = {
  values: BloodGasValues;
  variant?: "arterial" | "venous" | "alveolar";
};

const variantStyles = {
  arterial: "border-blue-200 bg-blue-50/50",
  venous: "border-purple-200 bg-purple-50/50",
  alveolar: "border-emerald-200 bg-emerald-50/50",
};

export function BloodGasPanel({ values, variant = "arterial" }: BloodGasPanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 font-mono text-sm",
        variantStyles[variant],
      )}
    >
      <p className="mb-3 font-sans text-base font-semibold text-slate-800">
        {values.label}
      </p>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <dt className="text-slate-500">pO₂</dt>
          <dd className="font-semibold text-blue-700">
            {formatKpaFromMmHg(values.pO2)}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">pCO₂</dt>
          <dd className="font-semibold text-orange-700">
            {formatKpaFromMmHg(values.pCO2)}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">pH</dt>
          <dd className="font-semibold">{values.pH.toFixed(2)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">sO₂</dt>
          <dd className="font-semibold text-red-700">{values.sO2}%</dd>
        </div>
      </dl>
    </div>
  );
}
