"use client";

import { motion } from "framer-motion";
import MaterialSymbol from "./MaterialSymbol";
import { ACCENT_HEX, type AccentColor } from "@/lib/sports";

const BEATS: { icon: string; text: string; accent: AccentColor }[] = [
  { icon: "tune", text: "הכל מפוזר.", accent: "ember" },
  { icon: "trending_down", text: "המרץ נגמר.", accent: "volt" },
  { icon: "person_off", text: "לבד? משעמם.", accent: "info" },
];

export default function ProblemSection() {
  return (
    <section className="relative px-4 py-16 md:py-20 border-y-2 border-border bg-surface-well">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-border">
          {BEATS.map((beat, i) => {
            const hex = ACCENT_HEX[beat.accent];
            return (
              <motion.div
                key={beat.text}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col items-center text-center px-4 py-8 overflow-hidden"
              >
                <span
                  className="ghost-numeral absolute -top-3 text-[88px] leading-none select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="relative w-11 h-11 border-2 flex items-center justify-center transition-colors duration-200"
                  style={{ borderColor: hex }}
                >
                  <MaterialSymbol name={beat.icon} style={{ color: hex }} />
                </div>
                <p className="relative mt-4 font-heading font-bold text-headline-sm text-text-primary">
                  {beat.text}
                </p>
                <span
                  className="relative mt-3 h-0.5 w-8 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: hex }}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
