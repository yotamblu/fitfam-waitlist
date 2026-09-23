"use client";

import { motion } from "framer-motion";
import SportIcon from "./SportIcon";
import { SPORTS, ACCENT_HEX } from "@/lib/sports";

interface SportIconStripProps {
  size?: "sm" | "md";
}

export default function SportIconStrip({ size = "md" }: SportIconStripProps) {
  const iconSize = size === "sm" ? 18 : 24;
  const boxSize = size === "sm" ? "w-8 h-8" : "w-11 h-11";

  return (
    <div className="flex items-center" dir="ltr">
      {SPORTS.map((sport, i) => (
        <motion.div
          key={sport.id}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.2, delay: i * 0.06, ease: "easeOut" }}
          whileHover={{ y: -2 }}
          className={`${boxSize} border-2 border-border-emphasis bg-surface flex items-center justify-center ${i !== 0 ? "-mr-px" : ""}`}
          style={{ zIndex: SPORTS.length - i }}
          title={sport.name}
        >
          <SportIcon sport={sport} size={iconSize} color={ACCENT_HEX[sport.accent]} />
        </motion.div>
      ))}
    </div>
  );
}
