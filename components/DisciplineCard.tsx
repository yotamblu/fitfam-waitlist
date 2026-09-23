"use client";

import { motion } from "framer-motion";
import SportIcon from "./SportIcon";
import PulseRing from "./PulseRing";
import { ACCENT_HEX, type Sport } from "@/lib/sports";

interface DisciplineCardProps {
  sport: Sport;
  index: number;
}

export default function DisciplineCard({ sport, index }: DisciplineCardProps) {
  const hex = ACCENT_HEX[sport.accent];

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex items-center gap-5 bg-surface px-5 py-5 sm:px-7 sm:py-6 overflow-hidden"
    >
      <span
        className="absolute inset-y-0 right-0 w-1 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"
        style={{ backgroundColor: hex }}
        aria-hidden="true"
      />

      <span
        className="ghost-numeral absolute -left-3 -bottom-4 text-[96px] leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative shrink-0 w-14 h-14">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <PulseRing color={hex} size={56} />
        </div>
        <div className="absolute inset-0 border-2 bg-surface-well flex items-center justify-center" style={{ borderColor: hex }}>
          <SportIcon sport={sport} size={28} color={hex} className="icon-hover-fill transition-all" />
        </div>
      </div>

      <div className="relative min-w-0">
        <span className="text-label-technical text-text-muted tracking-widest" dir="ltr">
          {String(index + 1).padStart(2, "0")} {"//"} {sport.nameEn}
        </span>
        <h3 className="font-heading font-bold text-headline-sm text-text-primary mt-0.5">{sport.name}</h3>
        <p className="mt-1 text-body-md text-text-secondary">{sport.tagline}</p>
      </div>
    </motion.div>
  );
}
