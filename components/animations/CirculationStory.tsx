"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/animations/AnimationControls";
import { NORMAL_ARTERIAL, NORMAL_VENOUS } from "@/lib/physiology/co2Transport";
import { mmHgToKpa } from "@/lib/units";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Weefselcapillair — Bohr-effect",
    body: "Het weefsel produceert CO₂ en zuur. pCO₂ stijgt, pH daalt en hemoglobine schuift naar de T-stand. De O₂-affiniteit daalt, dus O₂ komt vrij precies waar het nodig is.",
    points: ["pO₂ daalt van 12,7 naar 5,3 kPa", "sO₂ daalt van ~97% naar ~75%", "Curve schuift naar rechts"],
    href: "/bohr-effect",
    cta: "Verdiep: Bohr-effect",
  },
  {
    title: "Veneuze terugkeer — CO₂ aan boord",
    body: "Het bloed vervoert de opgenomen CO₂ terug naar het hart en de longen: vooral als HCO₃⁻ in plasma, deels als carbamino-Hb en een klein deel opgelost.",
    points: ["~70% als bicarbonaat", "~23% als carbamino-Hb", "Chloride shift houdt de lading in balans"],
    href: "/co2-transport",
    cta: "Verdiep: CO₂-transport",
  },
  {
    title: "Longcapillair — Haldane-effect",
    body: "In de alveolus is pO₂ hoog en pCO₂ laag. Hemoglobine bindt O₂ en gaat naar de R-stand; daardoor laat het CO₂ en H⁺ juist makkelijker los.",
    points: ["Evenwicht al na ~0,25 s", "O₂ in, CO₂ uit", "Curve schuift terug naar links"],
    href: "/longen",
    cta: "Verdiep: gasuitwisseling",
  },
  {
    title: "Arterieel bloed — klaar voor de volgende ronde",
    body: "Vrijwel volledig verzadigd bloed verlaat de longen via het linkerhart naar het weefsel. De cyclus begint opnieuw, ongeveer één keer per minuut voor elke erytrocyt.",
    points: ["pO₂ ~12,7 kPa · sO₂ ~97%", "pCO₂ ~5,3 kPa · pH 7,40", "Reserve: veneus bloed is nog ~75% verzadigd"],
    href: "/dissociatiecurve",
    cta: "Verdiep: dissociatiecurve",
  },
];

// Kringloop: start rechtsonder, door het weefsel naar links, omhoog (venen),
// door de long naar rechts en omlaag (arteriën).
const LOOP =
  "M320,390 L80,390 Q50,390 50,360 L50,100 Q50,70 80,70 L320,70 Q350,70 350,100 L350,360 Q350,390 320,390";

// Fracties langs de kringloop: weefsel 0–0,2 · venen · long 0,5–0,7 · arteriën
const P = [0, 0.2, 0.5, 0.57, 1];
const ART = NORMAL_ARTERIAL;
const VEN = NORMAL_VENOUS;

const fmt = (v: number, d = 1) => v.toFixed(d).replace(".", ",");

export function CirculationStory() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.65", "end 0.65"],
  });

  const x = useMotionValue(320);
  const y = useMotionValue(390);
  const rotate = useMotionValue(0);

  const place = (p: number) => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const at = Math.min(Math.max(p, 0), 0.999) * len;
    const pt = path.getPointAtLength(at);
    const ahead = path.getPointAtLength(Math.min(at + 2, len));
    x.set(pt.x);
    y.set(pt.y);
    rotate.set((Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI);
  };

  useLayoutEffect(() => place(scrollYProgress.get()));
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    place(p);
    setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length))));
  });

  const fill = useTransform(scrollYProgress, P, ["#ef4444", "#7f1d1d", "#7f1d1d", "#ef4444", "#ef4444"]);
  const pO2 = useTransform(scrollYProgress, P, [ART.pO2, VEN.pO2, VEN.pO2, ART.pO2, ART.pO2]);
  const sO2 = useTransform(scrollYProgress, P, [ART.sO2, VEN.sO2, VEN.sO2, ART.sO2, ART.sO2]);
  const pCO2 = useTransform(scrollYProgress, P, [ART.pCO2, VEN.pCO2, VEN.pCO2, ART.pCO2, ART.pCO2]);
  const pH = useTransform(scrollYProgress, P, [ART.pH, VEN.pH, VEN.pH, ART.pH, ART.pH]);

  return (
    <div className="relative lg:grid lg:grid-cols-2 lg:gap-12">
      {/* Vaste visual */}
      <div className="sticky top-[6.5rem] z-10 -mx-4 border-b border-slate-200 bg-slate-50/95 px-4 pb-3 pt-2 backdrop-blur sm:-mx-6 sm:px-6 lg:top-28 lg:mx-0 lg:flex lg:h-[calc(100dvh-8rem)] lg:flex-col lg:justify-center lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <div className="haemo-anim-root" data-paused={reduceMotion}>
          <svg
            viewBox="0 0 400 460"
            className="mx-auto max-h-[38dvh] w-full lg:max-h-[62dvh]"
            role="img"
            aria-label={`Bloedsomloop, stap ${active + 1}: ${STEPS[active].title}`}
          >
            {/* Zones */}
            <Zone x={85} y={22} w={230} h={96} fill="#dbeafe" on={active === 2} />
            <text x="200" y="16" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1d4ed8">Longen</text>
            <Zone x={85} y={342} w={230} h={96} fill="#ffedd5" on={active === 0} />
            <text x="200" y="456" textAnchor="middle" fontSize="15" fontWeight="600" fill="#c2410c">Weefsel</text>

            {/* Diffusie in long en weefsel */}
            {[110, 160, 210, 260].map((cx, i) => (
              <g key={cx}>
                <circle className="haemo-anim haemo-o2-drop" cx={cx} cy="28" r="5" fill="#2563eb" style={{ animationDelay: `${-i * 0.45}s` }} />
                <circle className="haemo-anim haemo-co2-rise" cx={cx + 25} cy="84" r="5" fill="#ea580c" style={{ animationDelay: `${-i * 0.45 - 0.9}s` }} />
                <circle className="haemo-anim haemo-o2-drop" cx={cx + 25} cy="396" r="5" fill="#2563eb" style={{ animationDelay: `${-i * 0.45 - 0.3}s` }} />
                <circle className="haemo-anim haemo-co2-rise" cx={cx} cy="446" r="5" fill="#ea580c" style={{ animationDelay: `${-i * 0.45 - 1.2}s` }} />
              </g>
            ))}

            {/* Vaten */}
            <path d={LOOP} fill="none" stroke="#fecaca" strokeWidth="26" strokeLinejoin="round" />
            <path ref={pathRef} d={LOOP} fill="none" stroke="#fca5a5" strokeWidth="2" strokeDasharray="2 8" />
            <text transform="translate(26 230) rotate(-90)" textAnchor="middle" fontSize="13" fontWeight="600" fill={active === 1 ? "#6d28d9" : "#94a3b8"}>
              venen → rechterhart
            </text>
            <text transform="translate(380 230) rotate(90)" textAnchor="middle" fontSize="13" fontWeight="600" fill={active === 3 ? "#b91c1c" : "#94a3b8"}>
              linkerhart → arteriën
            </text>

            {/* De erytrocyt */}
            <motion.g style={{ x, y, rotate }}>
              <motion.ellipse rx="19" ry="12" style={{ fill }} stroke="#450a0a" strokeOpacity="0.35" />
              <ellipse rx="8" ry="4.5" fill="#000" opacity="0.15" />
            </motion.g>

            {/* Live waarden */}
            <g transform="translate(200 230)">
              <rect x="-112" y="-62" width="224" height="124" rx="14" fill="white" stroke="#e2e8f0" />
              <Readout label="pO₂" value={pO2} format={(v) => `${fmt(mmHgToKpa(v))} kPa`} x={-56} y={-22} color="#1d4ed8" />
              <Readout label="sO₂" value={sO2} format={(v) => `${fmt(v, 0)}%`} x={56} y={-22} color="#b91c1c" />
              <Readout label="pCO₂" value={pCO2} format={(v) => `${fmt(mmHgToKpa(v))} kPa`} x={-56} y={34} color="#c2410c" />
              <Readout label="pH" value={pH} format={(v) => fmt(v, 2)} x={56} y={34} color="#334155" />
            </g>
          </svg>
        </div>
        <ol className="mt-2 flex justify-center gap-1.5" aria-hidden>
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className={cn("h-1.5 rounded-full transition-all", i === active ? "w-8 bg-red-600" : "w-3 bg-slate-300")}
            />
          ))}
        </ol>
      </div>

      {/* Tekst per stap */}
      <div ref={stepsRef} className="relative">
        {STEPS.map((step, i) => (
          <section
            key={step.title}
            className="flex min-h-[70dvh] items-center py-10 lg:min-h-[85dvh]"
          >
            <div
              className={cn(
                "rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 sm:p-8",
                i === active ? "border-red-200 opacity-100 shadow-md" : "border-slate-200 opacity-50",
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
                Stap {i + 1} van {STEPS.length}
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">{step.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{step.body}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                {step.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                href={step.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-red-700 hover:text-red-800"
              >
                {step.cta} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Zone({ x, y, w, h, fill, on }: { x: number; y: number; w: number; h: number; fill: string; on: boolean }) {
  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="18"
      fill={fill}
      animate={{ opacity: on ? 1 : 0.45 }}
      transition={{ duration: 0.4 }}
    />
  );
}

function Readout({
  label,
  value,
  format,
  x,
  y,
  color,
}: {
  label: string;
  value: MotionValue<number>;
  format: (v: number) => string;
  x: number;
  y: number;
  color: string;
}) {
  const text = useTransform(value, format);
  return (
    <g transform={`translate(${x} ${y})`}>
      <text y="-14" textAnchor="middle" fontSize="12" fill="#64748b">{label}</text>
      <motion.text y="8" textAnchor="middle" fontSize="19" fontWeight="700" fill={color} fontFamily="var(--font-geist-mono), monospace">
        {text}
      </motion.text>
    </g>
  );
}
