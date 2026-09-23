"use client";

import { motion, type MotionValue } from "framer-motion";
import { useBeat } from "@/hooks/useBeat";
import SportIcon from "../SportIcon";
import { SPORTS, ACCENT_HEX } from "@/lib/sports";

interface SocialProofSceneProps {
  progress: MotionValue<number>;
  index: number;
  total: number;
}

const TILE_COUNT = 24;
const TILES = Array.from({ length: TILE_COUNT }, (_, i) => ({
  sport: SPORTS[i % SPORTS.length],
  duration: 2.8 + (i % 5) * 0.4,
  delay: (i % 7) * 0.18,
  drift: i % 2 === 0 ? -6 : 6,
}));

export default function SocialProofScene({ progress, index, total }: SocialProofSceneProps) {
  const { opacity, y, pointerEvents } = useBeat(progress, index, total, 24);

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto text-center">
        <span className="text-label-technical text-ember tracking-widest">הקהילה</span>
        <h2 className="font-heading font-black text-headline-lg mt-3 text-text-primary">לא לבד</h2>

        <div className="grid grid-cols-6 sm:grid-cols-8 gap-px bg-border mt-10 max-w-xl mx-auto border-2 border-border">
          {TILES.map((tile, i) => (
            <div
              key={i}
              className="aspect-square bg-surface flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, tile.drift, 0], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: tile.duration,
                  delay: tile.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <SportIcon sport={tile.sport} size={16} color={ACCENT_HEX[tile.sport.accent]} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
