import Logo from "./Logo";
import SportIconStrip from "./SportIconStrip";
import MaterialSymbol from "./MaterialSymbol";

const SOCIALS = [
  { icon: "photo_camera", label: "Instagram" },
  { icon: "music_note", label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="relative px-4 py-12 border-t-2 border-border bg-surface-well">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Logo size={28} />

        <SportIconStrip size="sm" />

        <div className="flex items-center gap-2">
          {SOCIALS.map((s) => (
            <span
              key={s.label}
              className="w-9 h-9 border border-border bg-surface flex items-center justify-center text-text-muted"
              title={s.label}
            >
              <MaterialSymbol name={s.icon} style={{ fontSize: 18 }} />
            </span>
          ))}
        </div>
      </div>

      <p className="text-center text-body-sm text-text-muted mt-8">
        © {new Date().getFullYear()} FitFam ·{" "}
        <a href="/privacy" className="underline hover:text-text-secondary">
          מדיניות פרטיות
        </a>
      </p>
    </footer>
  );
}
