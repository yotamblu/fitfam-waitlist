"use client";

import { motion, type MotionValue } from "framer-motion";
import { useBeat } from "@/hooks/useBeat";
import SportIcon from "../SportIcon";
import PulseRing from "../PulseRing";
import { ACCENT_HEX, type Sport } from "@/lib/sports";

interface DisciplineSceneProps {
  sport: Sport;
  sportIndex: number;
  sportTotal: number;
  progress: MotionValue<number>;
  index: number;
  total: number;
}

export default function DisciplineScene({
  sport,
  sportIndex,
  sportTotal,
  progress,
  index,
  total,
}: DisciplineSceneProps) {
  const { opacity, y, pointerEvents } = useBeat(progress, index, total, 32);
  const hex = ACCENT_HEX[sport.accent];

  return (
    <motion.div
      style={{ opacity, pointerEvents }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      <span
        className="ghost-numeral absolute text-[42vw] leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        {String(sportIndex + 1).padStart(2, "0")}
      </span>

      <motion.div style={{ y }} className="relative">
        <span className="text-label-technical text-text-muted tracking-widest" dir="ltr">
          {String(sportIndex + 1).padStart(2, "0")} / {String(sportTotal).padStart(2, "0")}
        </span>

        <div className="relative mt-8 mb-6 w-24 h-24 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <PulseRing color={hex} size={110} />
          </div>
          <div className="absolute inset-0 border-2 bg-surface-well flex items-center justify-center" style={{ borderColor: hex }}>
            <SportIcon sport={sport} size={44} filled color={hex} />
          </div>
        </div>

        <h3 className="font-heading font-black text-headline-lg md:text-display-hero text-text-primary">
          {sport.name}
        </h3>
        <p className="mt-3 text-body-lg text-text-secondary">{sport.tagline}</p>
      </motion.div>
    </motion.div>
  );
}
