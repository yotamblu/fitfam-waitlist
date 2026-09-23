export type AccentColor = "ember" | "volt" | "info";

export interface Sport {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  accent: AccentColor;
  tagline: string;
}

export const ACCENT_HEX: Record<AccentColor, string> = {
  ember: "#ff5637",
  volt: "#a4d64c",
  info: "#7bd0ff",
};

export const ACCENT_TEXT_CLASS: Record<AccentColor, string> = {
  ember: "text-ember",
  volt: "text-volt",
  info: "text-info",
};

export const SPORTS: Sport[] = [
  {
    id: "swimming",
    name: "שחייה",
    nameEn: "SWIMMING",
    icon: "pool",
    accent: "ember",
    tagline: "עקביות במים.",
  },
  {
    id: "running",
    name: "ריצה",
    nameEn: "RUNNING",
    icon: "directions_run",
    accent: "volt",
    tagline: "לא עוצרים.",
  },
  {
    id: "calisthenics",
    name: "קליסטניקס",
    nameEn: "CALISTHENICS",
    icon: "sports_gymnastics",
    accent: "info",
    tagline: "שליטה בגוף.",
  },
  {
    id: "strength",
    name: "אימוני כוח",
    nameEn: "STRENGTH",
    icon: "fitness_center",
    accent: "ember",
    tagline: "כוח אמיתי.",
  },
];
