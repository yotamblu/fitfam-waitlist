"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import HeroScene from "./scenes/HeroScene";
import ProblemScene from "./scenes/ProblemScene";
import DisciplineScene from "./scenes/DisciplineScene";
import SocialProofScene from "./scenes/SocialProofScene";
import WaitlistScene from "./scenes/WaitlistScene";
import BeatTrail from "./BeatTrail";
import { SPORTS, type AccentColor } from "@/lib/sports";

// beat order: hero, problem, 4x discipline, social proof, waitlist
const TOTAL_BEATS = 2 + SPORTS.length + 2;
const WAITLIST_BEAT = TOTAL_BEATS - 1;
const BEAT_ACCENTS: AccentColor[] = ["ember", "volt", ...SPORTS.map((s) => s.accent), "info", "ember"];

export default function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollToBeat = (beatIndex: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const targetY = containerTop + (beatIndex / TOTAL_BEATS) * el.offsetHeight;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative" style={{ height: `${TOTAL_BEATS * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-50 h-[3px] bg-surface-well">
          <motion.div
            className="h-full"
            style={{
              scaleX: scrollYProgress,
              transformOrigin: "right",
              background: "linear-gradient(90deg, #ff5637 0%, #a4d64c 100%)",
            }}
          />
        </div>

        <HeroScene progress={scrollYProgress} index={0} total={TOTAL_BEATS} onCta={() => scrollToBeat(WAITLIST_BEAT)} />
        <ProblemScene progress={scrollYProgress} index={1} total={TOTAL_BEATS} />

        {SPORTS.map((sport, i) => (
          <DisciplineScene
            key={sport.id}
            sport={sport}
            sportIndex={i}
            sportTotal={SPORTS.length}
            progress={scrollYProgress}
            index={2 + i}
            total={TOTAL_BEATS}
          />
        ))}

        <SocialProofScene progress={scrollYProgress} index={2 + SPORTS.length} total={TOTAL_BEATS} />
        <WaitlistScene progress={scrollYProgress} index={WAITLIST_BEAT} total={TOTAL_BEATS} />

        <BeatTrail progress={scrollYProgress} total={TOTAL_BEATS} accents={BEAT_ACCENTS} onSelect={scrollToBeat} />
      </div>
    </div>
  );
}
