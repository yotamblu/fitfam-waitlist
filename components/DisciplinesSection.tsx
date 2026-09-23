"use client";

import { motion } from "framer-motion";
import DisciplineCard from "./DisciplineCard";
import { SPORTS } from "@/lib/sports";

export default function DisciplinesSection() {
  return (
    <section className="relative px-4 py-20 bg-surface-well">
      <div className="text-center max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.3 }}
          className="font-heading font-black text-headline-lg text-text-primary"
        >
          היברידי. זאת הזהות.
        </motion.h2>
      </div>
      <div className="mt-10 max-w-xl mx-auto border-2 border-border divide-y-2 divide-border">
        {SPORTS.map((sport, i) => (
          <DisciplineCard key={sport.id} sport={sport} index={i} />
        ))}
      </div>
    </section>
  );
}
