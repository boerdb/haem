"use client";

import { motion } from "framer-motion";
import { StepControls, useStepPlayer } from "@/components/animations/AnimationControls";

const STEPS = [
  {
    title: "CO₂ diffundeert de erytrocyt in",
    body: "In het weefselcapillair is pCO₂ hoog. CO₂ is goed oplosbaar in membranen en diffundeert vrij de rode bloedcel in.",
  },
  {
    title: "Carbonic anhydrase zet CO₂ om",
    body: "CA-II katalyseert CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻, ongeveer 10.000× sneller dan zonder enzym.",
  },
  {
    title: "Hemoglobine buffert H⁺",
    body: "Deoxy-Hb bindt H⁺ (histidineresiduen). Zo blijft de pH stabiel en wordt de T-stand gestabiliseerd: het Bohr-effect.",
  },
  {
    title: "Band-3 wisselt HCO₃⁻ tegen Cl⁻",
    body: "HCO₃⁻ verlaat de cel via de anionwisselaar band-3; Cl⁻ gaat naar binnen voor elektroneutraliteit. Dit is de chloride- of Hamburger-shift.",
  },
];

type Pos = { x: number; y: number; o: number };
type Particle = { id: string; label: string; color: string; r: number; states: Pos[] };

const CA = { x: 300, y: 205 };
const HB = { x: 405, y: 140 };
const BAND3 = { x: 112, y: 170 };

// states[0] = beginstand, states[i + 1] = eindstand na stap i
const PARTICLES: Particle[] = [0, 1, 2].flatMap((i) => {
  const hidden = { ...CA, o: 0 };
  return [
    {
      id: `co2-${i}`,
      label: "CO₂",
      color: "#64748b",
      r: 15,
      states: [
        { x: 250 + i * 50, y: 24, o: 1 },
        { x: 255 + i * 45, y: 120 + (i % 2) * 18, o: 1 },
        hidden,
        hidden,
        hidden,
      ],
    },
    {
      id: `h-${i}`,
      label: "H⁺",
      color: "#dc2626",
      r: 11,
      states: [
        hidden,
        hidden,
        { x: 330 + i * 26, y: 248, o: 1 },
        { x: HB.x - 28 + i * 28, y: HB.y + 38, o: 1 },
        { x: HB.x - 28 + i * 28, y: HB.y + 38, o: 1 },
      ],
    },
    {
      id: `hco3-${i}`,
      label: "HCO₃⁻",
      color: "#ea580c",
      r: 19,
      states: [
        hidden,
        hidden,
        { x: 235, y: 170 + i * 30, o: 1 },
        { x: 170, y: 150 + i * 30, o: 1 },
        { x: 50, y: 92 + i * 34, o: 1 },
      ],
    },
    {
      id: `cl-${i}`,
      label: "Cl⁻",
      color: "#059669",
      r: 13,
      states: [
        { x: 40, y: 220 + i * 30, o: 1 },
        { x: 40, y: 220 + i * 30, o: 1 },
        { x: 40, y: 220 + i * 30, o: 1 },
        { x: 40, y: 220 + i * 30, o: 1 },
        { x: 198, y: 205 + i * 26, o: 1 },
      ],
    },
  ];
});

export function ChlorideShiftAnimation() {
  const { ref, step, cycle, goTo, paused, toggle, reduceMotion } = useStepPlayer(
    STEPS.length,
    3200,
  );

  return (
    <div ref={ref}>
      <svg
        viewBox="0 0 560 320"
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label={`Chloride shift, stap ${step + 1}: ${STEPS[step].title}`}
      >
        <rect width="560" height="320" rx="10" fill="#eff6ff" />
        <text x="16" y="24" fontSize="12" fontWeight="600" fill="#1e40af">Plasma</text>

        {/* Erytrocyt */}
        <ellipse cx="300" cy="175" rx="188" ry="118" fill="#fee2e2" stroke="#b91c1c" strokeWidth="3" />
        <text x="470" y="290" textAnchor="end" fontSize="12" fontWeight="600" fill="#7f1d1d">Erytrocyt</text>

        {/* Band-3 transporter in het membraan */}
        <g transform={`translate(${BAND3.x} ${BAND3.y})`}>
          <rect x="-12" y="-34" width="24" height="68" rx="8" fill="#0d9488" />
          <rect x="-4" y="-34" width="8" height="68" fill="#ccfbf1" />
          <text x="0" y="52" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f766e">band-3</text>
        </g>

        {/* Carbonic anhydrase */}
        <motion.g
          animate={{ scale: step === 1 ? 1.15 : 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
        >
          <rect x={CA.x - 30} y={CA.y - 15} width="60" height="30" rx="7" fill="#059669" />
          <text x={CA.x} y={CA.y + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill="white">CA</text>
        </motion.g>

        {/* Hemoglobine */}
        <motion.g
          animate={{ scale: step === 2 ? 1.1 : 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
        >
          <circle cx={HB.x} cy={HB.y} r="30" fill="#1e3a8a" opacity="0.85" />
          <text x={HB.x} y={HB.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="white">deoxy-Hb</text>
        </motion.g>

        {/* Deeltjes */}
        <g key={cycle}>
          {PARTICLES.map((p, i) => {
            const from = p.states[0];
            const to = p.states[step + 1];
            return (
              <motion.g
                key={p.id}
                initial={{ x: from.x, y: from.y, opacity: from.o }}
                animate={{ x: to.x, y: to.y, opacity: to.o }}
                transition={{
                  duration: reduceMotion ? 0 : 1.4,
                  delay: reduceMotion ? 0 : (i % 4 === 0 ? 0 : 0.1) + Math.floor(i / 4) * 0.15,
                  ease: "easeInOut",
                }}
              >
                <circle r={p.r} fill={p.color} />
                <text y="4" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">
                  {p.label}
                </text>
              </motion.g>
            );
          })}
        </g>
      </svg>

      <StepControls
        steps={STEPS}
        step={step}
        paused={paused}
        onToggle={toggle}
        onStep={goTo}
      />
    </div>
  );
}
