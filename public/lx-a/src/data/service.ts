export interface Dealer {
  id: string;
  name: string;
  address: string;
  distance: string;
  servicePrice: string;
}

export const dealers: Dealer[] = [
  {
    id: "chatswood",
    name: "Lexus of Chatswood",
    address: "932 Pacific Highway, Chatswood NSW 2067",
    distance: "4.2 km",
    servicePrice: "$85.00*",
  },
  {
    id: "melbourne-city",
    name: "Lexus City Melbourne",
    address: "501 Swanston St, Melbourne VIC 3000",
    distance: "2.1 km",
    servicePrice: "$85.00*",
  },
  {
    id: "brighton",
    name: "Lexus of Brighton",
    address: "99 Nepean Hwy, Elsternwick VIC 3185",
    distance: "8.6 km",
    servicePrice: "$85.00*",
  },
  {
    id: "blackburn",
    name: "Lexus of Blackburn",
    address: "146 Whitehorse Rd, Blackburn VIC 3130",
    distance: "15.3 km",
    servicePrice: "$85.00*",
  },
  {
    id: "parramatta",
    name: "Lexus of Parramatta",
    address: "10 Grand Avenue, Camellia NSW 2142",
    distance: "18.9 km",
    servicePrice: "$85.00*",
  },
  {
    id: "chadstone",
    name: "Lexus of Chadstone",
    address: "1376 Dandenong Road, Chadstone VIC 3148",
    distance: "21.0 km",
    servicePrice: "$85.00*",
  },
];

export const defaultDealerId = "chatswood";

/**
 * Parse a "4.2 km" distance label into a sortable number.
 * Returns Infinity for unparseable values so they sort last.
 */
export function parseDistanceKm(value: string): number {
  const m = /([0-9]+(?:\.[0-9]+)?)/.exec(value);
  return m ? parseFloat(m[1]) : Number.POSITIVE_INFINITY;
}

export const dealersByProximity = [...dealers].sort(
  (a, b) => parseDistanceKm(a.distance) - parseDistanceKm(b.distance)
);

export interface ServiceType {
  id: string;
  label: string;
  description: string;
  priceFrom: string;
  duration: string;
}

export const serviceTypes: ServiceType[] = [
  {
    id: "logbook",
    label: "Logbook service",
    description:
      "Scheduled manufacturer-recommended service to keep your Encore warranty intact.",
    priceFrom: "$85.00*",
    duration: "Same-day pickup",
  },
  {
    id: "minor",
    label: "Minor service",
    description:
      "Oil, filters and a 60-point inspection — recommended every 6 months between logbooks.",
    priceFrom: "$295.00*",
    duration: "3–4 hours",
  },
  {
    id: "major",
    label: "Major service",
    description:
      "Full vehicle inspection with brake fluid, coolant and cabin filter replacement.",
    priceFrom: "$595.00*",
    duration: "Overnight",
  },
];

export const defaultServiceTypeId = "logbook";

export interface TransportOption {
  id: string;
  label: string;
  description: string;
}

export const transportOptions: TransportOption[] = [
  {
    id: "loan",
    label: "Loan car",
    description: "Drive away in a Lexus loan vehicle for the day.",
  },
  {
    id: "pickup",
    label: "Courtesy pickup",
    description: "Your dealer collects and returns your Lexus to a chosen address.",
  },
  {
    id: "self",
    label: "I'll wait or arrange my own",
    description: "Drop off, walk away — no transport needed.",
  },
];

export const defaultTransportId = "loan";

export const serviceTimes = [
  "7:30am",
  "7:45am",
  "8:00am",
  "8:15am",
  "8:30am",
  "8:45am",
  "9:00am",
  "9:15am",
  "9:30am",
];

export interface ServiceRecordDetail {
  odometer: string;
  advisor: string;
  cost: string;
  workPerformed: string[];
  partsReplaced?: string[];
}

export interface ServiceRecord {
  id: string;
  title: string;
  interval: string;
  date: string;
  status: "completed" | "upcoming";
  dealer: string;
  detail?: ServiceRecordDetail;
}

export const serviceHistory: ServiceRecord[] = [
  {
    id: "s4",
    title: "Scheduled service",
    interval: "48 months or 60,000 km",
    date: "Due 12 Aug 2026",
    status: "upcoming",
    dealer: "Lexus of Chatswood",
  },
  {
    id: "s3",
    title: "Scheduled service",
    interval: "36 months or 45,000 km",
    date: "Completed 2 Jul 2025",
    status: "completed",
    dealer: "Lexus of Brighton",
    detail: {
      odometer: "44,820 km",
      advisor: "Jonathan Park",
      cost: "$520.40",
      workPerformed: [
        "Multi-point inspection",
        "Engine oil and filter replacement",
        "Brake fluid flush",
        "Software updates",
      ],
      partsReplaced: [
        "Oil filter (0892-30060)",
        "Cabin air filter (87139-50100)",
      ],
    },
  },
  {
    id: "s2",
    title: "Scheduled service",
    interval: "24 months or 30,000 km",
    date: "Completed 28 Jun 2024",
    status: "completed",
    dealer: "Lexus of Brighton",
    detail: {
      odometer: "29,610 km",
      advisor: "Priya Singh",
      cost: "$395.00",
      workPerformed: [
        "Multi-point inspection",
        "Engine oil and filter replacement",
        "Tyre rotation",
      ],
      partsReplaced: ["Oil filter (0892-30060)"],
    },
  },
  {
    id: "s1",
    title: "Scheduled service",
    interval: "12 months or 15,000 km",
    date: "Completed 19 Jun 2023",
    status: "completed",
    dealer: "Lexus of Chatswood",
    detail: {
      odometer: "14,890 km",
      advisor: "Michael Tran",
      cost: "$295.00",
      workPerformed: ["Multi-point inspection", "Engine oil top-up"],
    },
  },
];
