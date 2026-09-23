interface MaterialSymbolProps {
  name: string;
  filled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function MaterialSymbol({
  name,
  filled = false,
  className = "",
  style,
}: MaterialSymbolProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? "icon-fill" : ""} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
