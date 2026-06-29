export type BookingKind = "service" | "valet" | "lounge";

export interface Booking {
  id: string;
  kind: BookingKind;
  title: string;
  detail: string;
  /** ISO-ish display label, e.g. "12 Aug 2026" or "Today" */
  when: string;
  /** Sortable JS timestamp for ordering. */
  at: number;
}

const dayMs = 86_400_000;
const inDays = (n: number) => Date.now() + n * dayMs;
const fmt = (ts: number) =>
  new Date(ts).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/** Mock seed — these survive in localStorage via the bookings provider. */
export const seedBookings: Booking[] = [
  {
    id: "valet-bondi",
    kind: "valet",
    title: "Valet parking · Bondi Junction",
    detail: "Westfield · 500 Oxford St",
    when: fmt(inDays(2)),
    at: inDays(2),
  },
  {
    id: "lounge-may",
    kind: "lounge",
    title: "Airport Lounge e-certificate",
    detail: "Expires in 14 days",
    when: fmt(inDays(14)),
    at: inDays(14),
  },
];

export const bookingKindLabel: Record<BookingKind, string> = {
  service: "Service",
  valet: "Valet",
  lounge: "Lounge",
};
