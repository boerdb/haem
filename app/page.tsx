import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { InfoCard } from "@/components/InfoCard";
import { BloodGasPanel } from "@/components/BloodGasPanel";
import {
  NORMAL_ARTERIAL,
  NORMAL_VENOUS,
} from "@/lib/physiology/co2Transport";
import { ArrowRight, BookOpen } from "lucide-react";

const MODULES = [
  {
    href: "/erytrocyt",
    title: "Hemoglobine in de erytrocyt",
    desc: "T/R-stand, 2,3-BPG, carbonic anhydrase",
    accent: "o2" as const,
  },
  {
    href: "/dissociatiecurve",
    title: "Dissociatiecurve",
    desc: "Interactieve Hill-curve met Bohr-shift",
    accent: "o2" as const,
  },
  {
    href: "/bohr-effect",
    title: "Bohr-effect",
    desc: "CO₂/H⁺ verlagen O₂-affiniteit in weefsel",
    accent: "co2" as const,
  },
  {
    href: "/haldane-effect",
    title: "Haldane-effect",
    desc: "O₂-binden bevordert CO₂-afgifte in longen",
    accent: "co2" as const,
  },
  {
    href: "/co2-transport",
    title: "CO₂-transport",
    desc: "Bicarbonaat, carbamino-Hb, chloride shift",
    accent: "co2" as const,
  },
  {
    href: "/longen",
    title: "Gasuitwisseling longen",
    desc: "Alveolaire diffusie en capillaire perfusie",
    accent: "o2" as const,
  },
  {
    href: "/circulatie",
    title: "Circulatie — scroll-verhaal",
    desc: "Weefsel → transport → long → arterieel",
    accent: "neutral" as const,
  },
];

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="Gasuitwisseling & hemoglobine"
        subtitle="Interactieve illustratie van O₂-opname en -afgifte, het Bohr- en Haldane-effect, CO₂-transport en de rol van hemoglobine in de erytrocyt — voor klinisch gebruik."
      />

      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        <BloodGasPanel values={NORMAL_ARTERIAL} variant="arterial" />
        <BloodGasPanel values={NORMAL_VENOUS} variant="venous" />
      </div>

      <InfoCard title="Bohr ↔ Haldane — complementair paar" accent="neutral">
        <p>
          Het <strong>Bohr-effect</strong> beschrijft hoe stijgende pCO₂ en dalende pH
          de O₂-affiniteit van hemoglobine verlagen — gunstig voor O₂-afgifte in het
          weefsel. Het <strong>Haldane-effect</strong> is het spiegelbeeld: oxyhemoglobine
          bindt CO₂ en H⁺ minder sterk, waardoor CO₂ gemakkelijker diffundeert in de
          longen.
        </p>
      </InfoCard>

      <Link
        href="/theorie"
        className="mt-8 flex items-start gap-4 rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-sm transition hover:border-red-300 hover:shadow-md"
      >
        <BookOpen className="mt-0.5 h-8 w-8 shrink-0 text-red-600" aria-hidden />
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-slate-900">
            Theoretische achtergrond
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Uitgebreide fysiologie en moleculaire mechanismen — allosterie, Hill-vergelijking,
            chloride shift, 2,3-BPG en klinische correlaties. Voor professionals die het
            naadje van de kous willen weten.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red-700">
            Naar de theorie <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      <h2 className="mb-4 mt-10 text-lg font-semibold text-slate-800">
        Interactieve modules
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {MODULES.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-200 hover:shadow-md"
          >
            <h2 className="font-semibold text-slate-900 group-hover:text-red-700">
              {m.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-slate-600">{m.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-600">
              Bekijken <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
