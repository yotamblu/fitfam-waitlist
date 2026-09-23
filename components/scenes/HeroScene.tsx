"use client";

import { motion, type MotionValue } from "framer-motion";
import { useBeat } from "@/hooks/useBeat";
import SportIconStrip from "../SportIconStrip";

function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-diagonal-lines" />
      <div className="absolute inset-0 bg-grid-subtle opacity-60" />

      {/* corner reticle marks — precision/targeting motif, not decoration */}
      <div className="absolute top-8 left-8 w-7 h-7 border-t-2 border-l-2 border-border-emphasis" />
      <div className="absolute top-8 right-8 w-7 h-7 border-t-2 border-r-2 border-border-emphasis" />
      <div className="absolute bottom-8 left-8 w-7 h-7 border-b-2 border-l-2 border-border-emphasis" />
      <div className="absolute bottom-8 right-8 w-7 h-7 border-b-2 border-r-2 border-border-emphasis" />

      {/* concentric target rings — echoes PulseRing's language used on the discipline icons */}
      <div className="absolute top-1/4 -right-40 w-[440px] h-[440px] rounded-full border-2 border-ember/25">
        <div className="absolute inset-12 rounded-full border border-ember/20" />
        <div className="absolute inset-24 rounded-full border border-ember/15" />
      </div>
      <div className="absolute -bottom-28 -left-28 w-64 h-64 rounded-full border border-volt/15" />
    </div>
  );
}

interface HeroSceneProps {
  progress: MotionValue<number>;
  index: number;
  total: number;
  onCta: () => void;
}

export default function HeroScene({ progress, index, total, onCta }: HeroSceneProps) {
  const { opacity, y, pointerEvents } = useBeat(progress, index, total, 24);

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
    >
      <AmbientBackground />

      <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-border-emphasis bg-surface-raised mb-8">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
        </span>
        <span className="text-label-md text-text-secondary tracking-widest">בקרוב</span>
      </div>

      <h1 className="relative font-heading font-black text-display-hero tracking-[-0.03em] text-text-primary max-w-md">
        אימון שלא ירגיש{" "}
        <span className="relative inline-block text-ember">
          כמו אימון.
          <span className="absolute -bottom-1 right-0 left-0 h-2.5 bg-ember/20 -z-10" aria-hidden="true" />
        </span>
      </h1>

      <div className="relative mt-9">
        <SportIconStrip size="md" />
      </div>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(255,86,55,0.75)" }}
        whileTap={{ scale: 0.96 }}
        onClick={onCta}
        className="relative mt-10 px-10 py-4 rounded-full bg-ember text-canvas font-heading font-bold text-label-lg glow-ember cursor-pointer"
      >
        בפנים
      </motion.button>
    </motion.div>
  );
}
