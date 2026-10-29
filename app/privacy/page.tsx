import type { Metadata } from "next";
import Link from "next/link";
import { WAITLIST_CONSENT_VERSION } from "@/lib/waitlist/consent";

export const metadata: Metadata = { title: "מדיניות פרטיות | FitFam" };

// The contact email is public by design; the operator's name and number can be added with the env vars below.
const EMAIL = process.env.LEGAL_CONTACT_EMAIL?.trim() || "fitfamhybridapp@gmail.com";
const OPERATOR = process.env.LEGAL_OPERATOR_NAME?.trim() || "FitFam";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading text-headline-sm text-text-primary">{title}</h2>
      <div className="flex flex-col gap-3 text-body-lg leading-7 text-text-secondary">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-16">
      <Link href="/" className="text-body-md text-text-secondary hover:text-text-primary">
        ← חזרה
      </Link>
      <h1 className="mt-6 font-heading text-headline-lg text-text-primary">מדיניות פרטיות: רשימת ההמתנה</h1>
      <p className="mt-1 text-label-md text-text-muted">
        גרסה <span dir="ltr">{WAITLIST_CONSENT_VERSION}</span>
      </p>
      <div className="mt-10 flex flex-col gap-8">
        <Section title="מי אנחנו">
          <p>
            רשימת ההמתנה מופעלת על ידי {OPERATOR}. ליצירת קשר ולכל בקשה בנושא המידע שלך: {EMAIL}.
          </p>
        </Section>
        <Section title="איזה מידע אנחנו שומרים">
          <ul className="list-disc space-y-2 ps-6">
            <li>כתובת האימייל שהזנת, והענף האהוב עליך אם בחרת.</li>
            <li>מועד ההרשמה, ותיעוד שאישרת את מדיניות זו ואת קבלת ההודעות (מועד וגרסה).</li>
            <li>לצורך מניעת שימוש לרעה: גיבוב (hash) חד-כיווני של כתובת ה-IP, ופרטי הדפדפן. איננו שומרים כתובת IP גלויה.</li>
          </ul>
        </Section>
        <Section title="למה">
          <p>
            כדי לעדכן אותך בדוא״ל כש-FitFam מושקת, ובעדכונים קשורים. איננו שולחים הודעות פרסומיות בלי הסכמתך, ואפשר להסיר את עצמך בכל עת.
          </p>
        </Section>
        <Section title="עם מי אנחנו משתפים">
          <p>איננו מוכרים או מעבירים את המידע לצדדים שלישיים לצורכי שיווק. המידע נשמר אצל ספק מסד נתונים (Supabase), בשרתים בגרמניה, ומוצג בשירות באמצעות Vercel.</p>
        </Section>
        <Section title="כמה זמן">
          <p>עד שתבקש/י להסיר את עצמך, או עד שרשימת ההמתנה תיסגר ותיעשה בה הפעולה שלשמה נאספה. כשנרשמים לשירות עצמו, הרישום ברשימה נמחק.</p>
        </Section>
        <Section title="הזכויות שלך">
          <p>
            את/ה רשאי/ת לבקש לעיין במידע, לתקן אותו או למחוק אותו, ולחזור בך מההסכמה, בכל עת, בפנייה אל {EMAIL}. זכותך גם לפנות לרשות להגנת הפרטיות.
          </p>
        </Section>
      </div>
    </main>
  );
}
