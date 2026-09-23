interface CalisthenicsIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function CalisthenicsIcon({ size = 24, color = "currentColor", className = "" }: CalisthenicsIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* outdoor pull-up bar */}
      <path d="M3 6h18" />
      <path d="M5 6v4M19 6v4" />
      {/* figure mid pull-up */}
      <circle cx="12" cy="9.3" r="1.5" />
      <path d="M9.5 6.5 11 10.6M14.5 6.5 13 10.6" />
      <path d="M12 10.6v4" />
      <path d="M12 14.6 9.8 18M12 14.6l2.2 3.4" />
    </svg>
  );
}
