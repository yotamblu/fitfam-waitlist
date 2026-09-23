import MaterialSymbol from "./MaterialSymbol";
import CalisthenicsIcon from "./CalisthenicsIcon";
import type { Sport } from "@/lib/sports";

interface SportIconProps {
  sport: Sport;
  size?: number;
  filled?: boolean;
  color?: string;
  className?: string;
}

export default function SportIcon({ sport, size = 24, filled = false, color, className = "" }: SportIconProps) {
  if (sport.id === "calisthenics") {
    return <CalisthenicsIcon size={size} color={color ?? "currentColor"} className={className} />;
  }

  return (
    <MaterialSymbol
      name={sport.icon}
      filled={filled}
      className={className}
      style={{ fontSize: size, color }}
    />
  );
}
