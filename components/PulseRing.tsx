"use client";

import { motion } from "framer-motion";

interface PulseRingProps {
  color?: string;
  size?: number;
}

export default function PulseRing({ color = "#ff5637", size = 64 }: PulseRingProps) {
  return (
    <div
      className="relative flex items-center justify-center pointer-events-none"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <motion.span
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
        }}
        initial={{ scale: 0.95, opacity: 0.8 }}
        animate={{ scale: [0.95, 1.2, 0.95], opacity: [0.8, 0.3, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className="relative rounded-full"
        style={{ width: size * 0.35, height: size * 0.35, backgroundColor: color }}
      />
    </div>
  );
}
