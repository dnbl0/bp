import type { ReactNode } from "react";

export interface TableRow {
  label: ReactNode;
  value: ReactNode;
  /** Optional right-aligned action (e.g. Edit / Learn more). */
  action?: ReactNode;
}

/**
 * Two-column key/value table — matches Figma `Row Table` / `Row Table Cell`
 * (component 59:73555): two equal columns (label cell + value cell) with a
 * divider line between rows. An optional action sits next to the label.
 */
export function DataTable({
  rows,
  className = "",
}: {
  rows: TableRow[];
  className?: string;
}) {
  return (
    <dl className={`dtable ${className}`.trim()}>
      {rows.map((r, i) => (
        <div className="dtable__row" key={i}>
          <dt className="dtable__label">
            <span>{r.label}</span>
            {r.action && <span className="dtable__action">{r.action}</span>}
          </dt>
          <dd className="dtable__value">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
