"use client";

import { motion } from "framer-motion";
import SportIcon from "./SportIcon";
import { SPORTS, ACCENT_HEX } from "@/lib/sports";

const TILE_COUNT = 24;
const TILES = Array.from({ length: TILE_COUNT }, (_, i) => ({
  sport: SPORTS[i % SPORTS.length],
  duration: 2.8 + (i % 5) * 0.4,
  delay: (i % 7) * 0.18,
  drift: i % 2 === 0 ? -6 : 6,
}));

export default function SocialProofSection() {
  return (
    <section className="relative px-4 py-24 md:py-36 bg-surface-well overflow-hidden">
      <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.2 }}
          className="text-label-technical text-ember tracking-widest"
        >
          הקהילה
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="font-heading font-black text-headline-lg mt-3 text-text-primary"
        >
          לא לבד
        </motion.h2>

        <div className="grid grid-cols-6 sm:grid-cols-8 gap-px bg-border mt-14 max-w-xl mx-auto border-2 border-border">
          {TILES.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: (i % 12) * 0.03, ease: "easeOut" }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
