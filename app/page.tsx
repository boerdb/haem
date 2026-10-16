import Link from "next/link";
import { HeroAnimation } from "@/components/animations/HeroAnimation";
import { InfoCard } from "@/components/InfoCard";
import { BloodGasPanel } from "@/components/BloodGasPanel";
import {
  NORMAL_ARTERIAL,
  NORMAL_VENOUS,
} from "@/lib/physiology/co2Transport";
import { ArrowRight, BookOpen } from "lucide-react";
import { MODULES } from "@/lib/modules";

const INTERACTIVE = MODULES.filter(
  (m) => m.href !== "/theorie" && m.href !== "/appendix",
);

export default function HomePage() {
  return (
    <>
      <section className="mb-12 grid items-center gap-8 pt-2 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            Interactieve fysiologie
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Gasuitwisseling &amp; hemoglobine
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            Zie hoe hemoglobine O₂ opneemt en afgeeft, hoe het Bohr- en Haldane-effect
            samenwerken en hoe CO₂ terug naar de longen reist — met interactieve grafieken
            en animaties, voor klinisch gebruik.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={MODULES[0].href}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              Start de leerroute <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/circulatie"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-red-300 hover:bg-red-50"
            >
              Volg een erytrocyt
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <HeroAnimation />
        </div>
      </section>

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
        {INTERACTIVE.map((m, i) => (
          <Link
            key={m.href}
            href={m.href}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-200 hover:shadow-md"
          >
            <span className="font-mono text-xs font-semibold text-slate-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-1 font-semibold text-slate-900 group-hover:text-red-700">
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
