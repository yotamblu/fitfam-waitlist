"use client";

import { motion, AnimatePresence } from "framer-motion";
import MaterialSymbol from "./MaterialSymbol";
import { SPORTS } from "@/lib/sports";
import { useWaitlistSubmit } from "@/hooks/useWaitlistSubmit";

export default function WaitlistForm() {
  const {
    email,
    setEmail,
    favoriteSport,
    setFavoriteSport,
    honeypot,
    setHoneypot,
    consent,
    setConsent,
    error,
    setError,
    status,
    handleSubmit,
  } = useWaitlistSubmit();

  return (
    <section id="waitlist" className="relative px-4 py-24 md:py-32 scroll-mt-8 overflow-hidden">
      <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-lg mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.2 }}
          className="text-label-technical text-ember tracking-widest"
        >
          לפני כולם
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="font-heading font-black text-headline-lg mt-3 text-text-primary"
        >
          תוכיחו שאתם ראשונים.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.3, delay: 0.12 }}
          className="mt-4 text-body-lg text-text-secondary"
        >
          מי שמגיע ראשון, משחק ראשון.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 border-2 border-border-emphasis bg-surface p-6 hard-shadow-sm-ember"
        >
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                noValidate
              >
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 text-right">
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      dir="ltr"
                      className={`w-full px-4 py-3 bg-surface-well border-2 text-text-primary placeholder:text-text-muted text-body-md outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(255,86,55,0.15)] ${
                        error ? "border-ember" : "border-border focus:border-ember"
                      }`}
                      aria-invalid={!!error}
                      aria-describedby={error ? "email-error" : undefined}
                    />
                    {error && (
                      <p id="email-error" className="mt-2 text-body-sm text-ember text-right">
                        {error}
                      </p>
                    )}
                  </div>
                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(255,86,55,0.7)" }}
                    whileTap={{ scale: 0.96 }}
                    className="px-7 py-3 rounded-full bg-ember text-canvas font-heading font-bold text-label-lg glow-ember cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
                  >
                    {status === "submitting" ? "נכנס..." : "אני בפנים"}
                  </motion.button>
                </div>

                <div className="mt-5 text-right">
                  <p className="text-label-md text-text-muted mb-2">הענף שלך?</p>
                  <div className="grid grid-cols-4 gap-2">
                    {SPORTS.map((sport) => (
                      <button
                        key={sport.id}
                        type="button"
                        onClick={() =>
                          setFavoriteSport((prev) => (prev === sport.id ? null : sport.id))
                        }
                        className={`py-1.5 px-1 rounded-full border-2 text-label-md font-semibold transition-colors ${
                          favoriteSport === sport.id
                            ? "border-ember bg-ember/10 text-ember"
                            : "border-border bg-surface-well text-text-secondary hover:border-border-emphasis"
                        }`}
                      >
                        {sport.name}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-3 text-right text-body-sm text-text-secondary">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (error) setError(null);
                    }}
                    className="mt-1 size-4 shrink-0 accent-[#ff5637]"
                  />
                  <span>
                    אני מסכים/ה לקבל מ-FitFam הודעה בדוא״ל על ההשקה ועדכונים, ומאשר/ת את{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-ember underline">
                      מדיניות הפרטיות
                    </a>
                    . אפשר להסיר את עצמי בכל עת.
                  </span>
                </label>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative border-2 border-volt bg-surface-raised p-5 flex items-center gap-3 hard-shadow-volt overflow-hidden"
              >
                <div className="relative w-9 h-9 border-2 border-volt bg-volt/15 flex items-center justify-center shrink-0">
                  <MaterialSymbol name="check" filled className="text-volt" style={{ fontSize: 20 }} />
                </div>
                <div className="relative text-right">
                  <p className="font-heading text-headline-sm text-text-primary">אתם בפנים!</p>
                  <p className="text-body-sm text-text-secondary mt-0.5">תתכוננו.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
