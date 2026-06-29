/**
 * Skeleton shimmer block. Use to placehold content while it loads.
 * Width/height accept any CSS length; defaults to 100% width / 1em tall.
 */
export function Skeleton({
  width = "100%",
  height = "1em",
  radius = 4,
  className = "",
  style,
}: {
  width?: number | string;
  height?: number | string;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={`skeleton ${className}`.trim()}
      style={{
        width,
        height,
        borderRadius: radius,
        ...style,
      }}
    />
  );
}
