"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInView } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Hydratie-veilig: op de server en tijdens hydratie altijd `false`. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/**
 * Afspeelstatus voor een animatie. Start gepauzeerd bij `prefers-reduced-motion`;
 * de gebruiker kan altijd zelf afspelen of pauzeren.
 */
export function usePlayback() {
  const reduceMotion = usePrefersReducedMotion();
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? reduceMotion;
  return {
    paused,
    reduceMotion,
    toggle: () => setUserPaused(!paused),
    pause: () => setUserPaused(true),
  };
}

/** Stapsgewijze animatie die automatisch doorloopt zolang hij in beeld is en niet gepauzeerd. */
export function useStepPlayer(stepCount: number, intervalMs = 3000) {
  const playback = usePlayback();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [tick, setTick] = useState(0);
  const step = tick % stepCount;
  // Telt volledige rondes; als key gebruikt om deeltjes naar de beginstand te resetten.
  const cycle = Math.floor(tick / stepCount);

  const running = inView && !playback.paused;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [running, intervalMs]);

  const goTo = (s: number) => {
    playback.pause();
    // Terug naar stap 1 start een nieuwe ronde, zodat de beginstand opnieuw speelt.
    setTick((t) => {
      const c = Math.floor(t / stepCount);
      return s === 0 ? (c + 1) * stepCount : c * stepCount + s;
    });
  };

  return { ref, step, cycle, goTo, ...playback };
}

export function PlayPauseButton({
  paused,
  onToggle,
  className,
}: {
  paused: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? "Animatie afspelen" : "Animatie pauzeren"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-red-300 hover:bg-red-50",
        className,
      )}
    >
      {paused ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
      {paused ? "Afspelen" : "Pauzeren"}
    </button>
  );
}

export function StepControls({
  steps,
  step,
  paused,
  onToggle,
  onStep,
}: {
  steps: { title: string; body: string }[];
  step: number;
  paused: boolean;
  onToggle: () => void;
  onStep: (s: number) => void;
}) {
  return (
    <div className="mt-4 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <PlayPauseButton paused={paused} onToggle={onToggle} />
        <div className="flex gap-1" role="tablist" aria-label="Stappen">
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === step}
              onClick={() => onStep(i)}
              className={cn(
                "h-7 w-7 rounded-full text-xs font-semibold transition",
                i === step
                  ? "bg-red-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div aria-live="polite" className="min-h-[3.5rem]">
        <p className="font-semibold text-slate-900">
          {step + 1}. {steps[step].title}
        </p>
        <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{steps[step].body}</p>
      </div>
    </div>
  );
}
