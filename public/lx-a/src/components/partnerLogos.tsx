/**
 * Stylised partner wordmarks rendered as inline SVG so they ship with the
 * bundle and tint via currentColor.
 */

export function WestfieldMark({
  width = 170,
  className,
}: {
  width?: number;
  className?: string;
}) {
  const height = (width / 170) * 28;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 170 28"
      fill="currentColor"
      role="img"
      aria-label="Westfield"
      className={className}
    >
      <text
        x="0"
        y="22"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize="26"
        letterSpacing="0.6"
        fontWeight="400"
      >
        Westfield
      </text>
    </svg>
  );
}

export function ChadstoneMark({
  width = 168,
  className,
}: {
  width?: number;
  className?: string;
}) {
  const height = (width / 168) * 42;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 168 42"
      fill="currentColor"
      role="img"
      aria-label="Chadstone — The Fashion Capital"
      className={className}
    >
      <text
        x="84"
        y="20"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="18"
        letterSpacing="6"
        fontWeight="500"
      >
        CHADSTONE
      </text>
      <line x1="20" y1="26" x2="148" y2="26" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      <text
        x="84"
        y="37"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="8"
        letterSpacing="3.6"
        fontWeight="500"
        opacity="0.7"
      >
        THE FASHION CAPITAL
      </text>
    </svg>
  );
}

export function DragonPassMark({
  width = 156,
  className,
}: {
  width?: number;
  className?: string;
}) {
  const height = (width / 156) * 32;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 156 32"
      fill="currentColor"
      role="img"
      aria-label="DragonPass"
      className={className}
    >
      <g>
        <path
          d="M6 16 q4 -10 14 -10 c9 0 14 7 14 16 c0 -8 -5 -13 -13 -13 q-9 0 -15 7 z"
          opacity="0.85"
        />
        <circle cx="20" cy="14" r="1.4" fill="var(--canvas, #fff)" />
      </g>
      <text
        x="42"
        y="22"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="18"
        letterSpacing="1.4"
        fontWeight="600"
      >
        DragonPass
      </text>
    </svg>
  );
}
