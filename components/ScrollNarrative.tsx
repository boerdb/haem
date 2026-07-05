"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BloodGasPanel } from "@/components/BloodGasPanel";
import {
  ALVEOLAR,
  NORMAL_ARTERIAL,
  NORMAL_VENOUS,
} from "@/lib/physiology/co2Transport";
import { ClShiftDiagram } from "@/components/illustrations/ClShiftDiagram";
import { LungAlveolusDiagram } from "@/components/illustrations/LungAlveolusDiagram";

const STEPS = [
  {
    id: "weefsel",
    title: "1. Weefselcapilair — Bohr-effect",
    body: "In het weefsel stijgt pCO₂ en daalt pH. Hemoglobine verschuift naar de T-stand: lagere O₂-affiniteit → efficiëntere O₂-afgifte aan het weefsel.",
  },
  {
    id: "transport",
    title: "2. Venous transport — CO₂ laden",
    body: "CO₂ wordt opgenomen als HCO₃⁻ (~70%), carbamino-Hb (~23%) en opgelost (~7%). De chloride shift handhaaft electroneutraliteit.",
  },
  {
    id: "long",
    title: "3. Longcapilair — Haldane-effect",
    body: "In de longen daalt pCO₂ en stijgt pO₂. Oxy-Hb geeft CO₂ en H⁺ gemakkelijker af dan deoxy-Hb — complementair aan het Bohr-effect.",
  },
  {
    id: "arterieel",
    title: "4. Arteriëel bloed — klaar voor weefsel",
    body: "Volledig gesatureerd arterieel bloed verlaat de longen. De dissociatiecurve is verschoven naar links (hogere O₂-affiniteit).",
  },
];

export function ScrollNarrative() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative space-y-24 py-8">
      <div className="sticky top-28 z-10 h-1 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="h-full bg-red-600"
          style={{ width: progressWidth }}
        />
      </div>

      {STEPS.map((step, i) => (
        <motion.section
          key={step.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-xl font-bold text-slate-900">{step.title}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">{step.body}</p>

          {step.id === "weefsel" && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <BloodGasPanel values={NORMAL_ARTERIAL} variant="arterial" />
              <BloodGasPanel values={NORMAL_VENOUS} variant="venous" />
            </div>
          )}
          {step.id === "transport" && (
            <div className="mt-6">
              <ClShiftDiagram />
            </div>
          )}
          {step.id === "long" && (
            <div className="mt-6 space-y-4">
              <LungAlveolusDiagram />
              <BloodGasPanel values={ALVEOLAR} variant="alveolar" />
            </div>
          )}
          {step.id === "arterieel" && (
            <div className="mt-6">
              <BloodGasPanel values={NORMAL_ARTERIAL} variant="arterial" />
            </div>
          )}
        </motion.section>
      ))}
    </div>
  );
}
