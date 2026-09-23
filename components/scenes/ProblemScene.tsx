"use client";

import { motion, type MotionValue } from "framer-motion";
import { useBeat } from "@/hooks/useBeat";
import MaterialSymbol from "../MaterialSymbol";
import { ACCENT_HEX, type AccentColor } from "@/lib/sports";

interface ProblemSceneProps {
  progress: MotionValue<number>;
  index: number;
  total: number;
}

const BEATS: { icon: string; text: string; accent: AccentColor }[] = [
  { icon: "tune", text: "הכל מפוזר.", accent: "ember" },
  { icon: "trending_down", text: "המרץ נגמר.", accent: "volt" },
  { icon: "person_off", text: "לבד? משעמם.", accent: "info" },
];

export default function ProblemScene({ progress, index, total }: ProblemSceneProps) {
  const { opacity, y, pointerEvents } = useBeat(progress, index, total, 24);

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 flex items-center justify-center px-4"
    >
      <div className="grid grid-cols-3 divide-x-2 divide-border border-2 border-border max-w-2xl w-full">
        {BEATS.map((beat, i) => {
          const hex = ACCENT_HEX[beat.accent];
          return (
            <motion.div
              key={beat.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center px-4 py-10 overflow-hidden"
            >
              <span
                className="ghost-numeral absolute -top-3 text-[100px] leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative w-11 h-11 border-2 flex items-center justify-center" style={{ borderColor: hex }}>
                <MaterialSymbol name={beat.icon} style={{ color: hex }} />
              </div>
              <p className="relative mt-4 font-heading font-bold text-headline-sm text-text-primary">
                {beat.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
