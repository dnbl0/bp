/**
 * Parses dates in the Lexus mock data format (e.g. "12 Aug 2026", or
 * "Due 12 Aug 2026") and returns a friendly relative-time string.
 * Returns null if the string isn't parseable.
 */
const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseLexusDate(input: string): Date | null {
  const cleaned = input.replace(/^(Due|Completed)\s+/i, "").trim();
  const m = /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/.exec(cleaned);
  if (!m) return null;
  const day = Number(m[1]);
  const month = MONTHS[m[2] as keyof typeof MONTHS];
  const year = Number(m[3]);
  if (month === undefined) return null;
  return new Date(year, month, day);
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function relativeFromNow(
  input: string,
  now: Date = new Date()
): string | null {
  const target = parseLexusDate(input);
  if (!target) return null;
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((target.getTime() - startOfToday.getTime()) / DAY_MS);

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "tomorrow";
  if (diffDays === -1) return "yesterday";

  const past = diffDays < 0;
  const days = Math.abs(diffDays);
  const fmt = (n: number, unit: string) =>
    past ? `${n} ${unit}${n === 1 ? "" : "s"} ago` : `in ${n} ${unit}${n === 1 ? "" : "s"}`;

  if (days < 14) return fmt(days, "day");
  if (days < 60) return fmt(Math.round(days / 7), "week");
  if (days < 730) return fmt(Math.round(days / 30), "month");
  return fmt(Math.round(days / 365), "year");
}
