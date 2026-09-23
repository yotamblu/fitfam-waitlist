"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ACCENT_HEX, type AccentColor } from "@/lib/sports";

const IDLE_HEX = "#3f3f46";

interface TrailNodeProps {
  progress: MotionValue<number>;
  index: number;
  total: number;
  color: string;
  onSelect?: (index: number) => void;
}

function TrailNode({ progress, index, total, color, onSelect }: TrailNodeProps) {
  const step = 1 / total;
  const center = index * step + step / 2;
  const from = Math.max(0, center - step * 0.5);
  const to = Math.min(1, center + step * 0.5);

  const scale = useTransform(progress, [from, center, to], [1, 1.8, 1]);
  const background = useTransform(progress, [from, center, to], [IDLE_HEX, color, IDLE_HEX]);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(index)}
      style={{ scale, backgroundColor: background }}
      className="block w-2 h-2 rounded-full cursor-pointer"
      aria-label={`עבור לשלב ${index + 1} מתוך ${total}`}
    />
  );
}

interface BeatTrailProps {
  progress: MotionValue<number>;
  total: number;
  accents: AccentColor[];
  onSelect?: (index: number) => void;
}

export default function BeatTrail({ progress, total, accents, onSelect }: BeatTrailProps) {
  return (
    <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <TrailNode progress={progress} index={i} total={total} color={ACCENT_HEX[accents[i]]} onSelect={onSelect} />
          {i < total - 1 && (
            <div className="w-0 h-6 my-1 border-l-2 border-dashed border-border-emphasis" />
          )}
        </div>
      ))}
    </div>
  );
}
