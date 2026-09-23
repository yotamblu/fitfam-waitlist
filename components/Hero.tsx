"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SportIconStrip from "./SportIconStrip";

function AmbientBackground({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const stripeY = useTransform(progress, [0, 1], [0, 120]);
  const fade = useTransform(progress, [0, 0.8], [1, 0]);

  return (
    <motion.div
      style={{ opacity: fade }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-diagonal-lines" />
      <div className="absolute inset-0 bg-grid-subtle opacity-60" />
      <motion.div
        style={{ y: stripeY, transform: "skewX(-12deg)" }}
        className="absolute -top-1/4 -right-1/4 w-[70%] h-[160%] bg-ember/10 border-r-2 border-ember/30"
      />
      <div
        className="absolute -bottom-1/3 -left-1/4 w-[55%] h-[90%] bg-volt/5 border-l-2 border-volt/20"
        style={{ transform: "skewX(-12deg)" }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <AmbientBackground progress={scrollYProgress} />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-border-emphasis bg-surface-raised mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
          </span>
          <span className="text-label-md text-text-secondary tracking-widest">בקרוב</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative font-heading font-black text-[40px] leading-[42px] md:text-display-hero tracking-[-0.03em] text-text-primary text-balance max-w-md"
        >
          אימון שלא ירגיש{" "}
          <span className="relative inline-block text-ember">
            כמו אימון.
            <span className="absolute -bottom-1 right-0 left-0 h-2.5 bg-ember/20 -z-10" aria-hidden="true" />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
          className="mt-9"
        >
          <SportIconStrip size="md" />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.42 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(255,86,55,0.75)" }}
          whileTap={{ scale: 0.96 }}
          onClick={scrollToWaitlist}
          className="mt-10 px-10 py-4 rounded-full bg-ember text-canvas font-heading font-bold text-label-lg glow-ember cursor-pointer"
        >
          בפנים
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { duration: 0.4, delay: 0.9 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-9 rounded-full border border-border-emphasis flex items-start justify-center p-1.5"
      >
        <motion.span
          className="w-1 h-1.5 rounded-full bg-text-muted"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
