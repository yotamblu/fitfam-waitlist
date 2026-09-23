import { ACCENT_HEX, type AccentColor } from "@/lib/sports";

interface SectionConnectorProps {
  accent?: AccentColor;
}

export default function SectionConnector({ accent = "ember" }: SectionConnectorProps) {
  const hex = ACCENT_HEX[accent];

  return (
    <div className="relative h-12 flex items-center justify-center overflow-hidden" aria-hidden="true">
      <div
        className="absolute top-0 bottom-0 w-0 border-l-2 border-dashed"
        style={{ borderColor: "var(--color-border-emphasis)" }}
      />
      <span
        className="relative w-2.5 h-2.5 rounded-full border-2 bg-canvas"
        style={{ borderColor: hex }}
      />
    </div>
  );
}
