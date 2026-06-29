/**
 * Compact 12-month sparkline of Encore points earned. Inline SVG, scales
 * with the container; tints via currentColor so it adapts to theme.
 */
const POINTS_12MO = [
  820, 1100, 940, 1250, 1380, 1640, 1290, 1820, 2050, 1740, 2210, 2580,
];

const MONTHS_SHORT = [
  "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D",
];

export function PointsSparkline({
  data = POINTS_12MO,
  height = 72,
}: {
  data?: number[];
  height?: number;
}) {
  const width = 100;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = Math.max(max - min, 1);
  const dx = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * dx;
    const y = height - ((v - min) / span) * (height - 12) - 6;
    return { x, y, v };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  // Smooth area fill below the line.
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  const lastIdx = points.length - 1;
  const last = points[lastIdx];

  return (
    <figure
      className="sparkline"
      role="figure"
      aria-label={`Points earned over the last ${data.length} months`}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="sparkline__svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="currentColor"
              stopOpacity="0.32"
            />
            <stop
              offset="100%"
              stopColor="currentColor"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#spark-fill)" />
        <path
          d={linePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === lastIdx ? 2.4 : 1.2}
            fill="currentColor"
            opacity={i === lastIdx ? 1 : 0.5}
          />
        ))}
      </svg>
      <figcaption className="sparkline__caption">
        <span>
          {MONTHS_SHORT[(new Date().getMonth() + 1) % 12]} ·{" "}
          {last.v.toLocaleString()} pts earned
        </span>
        <span className="sparkline__delta">+{data[lastIdx] - data[0]}</span>
      </figcaption>
    </figure>
  );
}
