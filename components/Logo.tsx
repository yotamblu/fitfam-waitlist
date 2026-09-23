interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  showTag?: boolean;
}

export default function Logo({ size = 32, showWordmark = true, showTag = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="bg-surface-raised border-2 border-text-primary flex items-center justify-center shrink-0"
        style={{ width: size, height: size, padding: size * 0.2 }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M5 4H19V7H9V11H17V14H9V20H5V4Z" fill="#fafafa" />
          <polygon points="15,4 20,4 16,13 21,13 12,22 14,14 10,14" fill="#ff5637" />
        </svg>
      </div>
      {showWordmark && (
        <div className="flex items-baseline gap-1.5">
          <span className="font-heading font-black tracking-tight text-text-primary text-headline-sm">
            FITFAM
          </span>
          {showTag && (
            <span className="text-label-technical font-bold text-canvas bg-ember px-1.5 py-0.5">
              פרוטוקול
            </span>
          )}
        </div>
      )}
    </div>
  );
}
