export interface Benefit {
  id: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
}

export interface Offer {
  id: string;
  brand: string;
  location: string;
  image: string;
}

export const member = {
  firstName: "Susan",
  lastName: "Mason",
  initials: "SM",
  email: "susan.mason@email.com",
  tier: "Platinum",
  program: "Encore",
  /** Year the member joined Encore — used for anniversary banners. */
  memberSinceYear: 2019,
};

export function timeBasedGreeting(date: Date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export type TimeBand = "morning" | "afternoon" | "evening" | "night";
export function timeBand(date: Date = new Date()): TimeBand {
  const h = date.getHours();
  if (h < 6) return "night";
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  if (h < 22) return "evening";
  return "night";
}

export const fuelOffer = {
  headline: "Save 5¢ per litre on fuel",
  detail: "Vortex premium fuels only",
};

export const benefits: Benefit[] = [
  {
    id: "on-demand",
    kicker: "On Demand",
    title: "On Demand",
    body: "Reserve a Lexus from the On Demand fleet for the weekend — delivered to your door, fully detailed and ready to drive.",
    image: "assets/benefit-on-demand.png",
  },
  {
    id: "valet",
    kicker: "Valet Parking",
    title: "Valet Parking",
    body: "Complimentary valet at partnered hotels, airports and events across the country. Arrive, hand over the keys, enjoy.",
    image: "assets/benefit-valet.png",
  },
  {
    id: "lounge",
    kicker: "Airport Lounge",
    title: "Airport Lounge",
    body: "Unwind before you fly with access to premium domestic and international lounges, included with your Encore membership.",
    image: "assets/benefit-lounge.png",
  },
];

/**
 * Richer benefit set for the limited (guest) dashboard, sourced from the public
 * Lexus Encore benefits page (lexus.com.au/owners/benefits) — its Lifestyle and
 * Vehicle benefit categories and copy — so the prospective-owner view isn't
 * sparse. Imagery is the real Encore lifestyle/vehicle photography.
 */
export const guestDashboardBenefits: Benefit[] = [
  {
    id: "travel",
    kicker: "Lifestyle Benefits",
    title: "Travel",
    body: "Travel with a select range of luxury partners — premium hotels, retreats and airport lounges, included with Encore.",
    image: "assets/benefit-lounge.png",
  },
  {
    id: "dining",
    kicker: "Lifestyle Benefits",
    title: "Dining",
    body: "Discover new culinary adventures with our premium dining partners across the country.",
    image: "assets/benefit-dining.jpg",
  },
  {
    id: "experiences",
    kicker: "Lifestyle Benefits",
    title: "Experiences",
    body: "Enjoy exclusive experiences in dining, golf and more — curated for Encore Members.",
    image: "assets/benefit-experiences.jpg",
  },
  {
    id: "on-demand",
    kicker: "Vehicle Benefits",
    title: "On Demand",
    body: "Reserve a Lexus from the On Demand fleet for the weekend — delivered to your door, fully detailed and ready to drive.",
    image: "assets/benefit-on-demand.png",
  },
  {
    id: "drivecare",
    kicker: "Vehicle Benefits",
    title: "Lexus DriveCare",
    body: "Our 24-hour roadside assistance service for Encore Members provides peace of mind, around the clock.",
    image: "assets/vehicle.png",
  },
  {
    id: "loan-car",
    kicker: "Vehicle Benefits",
    title: "Service Loan Car",
    body: "When you need your car serviced, we provide a complimentary Service Loan Car — pick it up or have it delivered.",
    image: "assets/vehicle-2.png",
  },
];

export const offers: Offer[] = [
  {
    id: "sofitel-gc",
    brand: "Sofitel",
    location: "Gold Coast Broadbeach",
    image: "assets/offer-sofitel-gc.png",
  },
  {
    id: "sofitel-adl",
    brand: "Sofitel",
    location: "Adelaide",
    image: "assets/offer-sofitel-adl.png",
  },
  {
    id: "crown-syd",
    brand: "Crown Towers",
    location: "Sydney",
    image: "assets/offer-crown-syd.png",
  },
  {
    id: "encore-escape",
    brand: "Encore Escapes",
    location: "Yarra Valley",
    image: "assets/offer-extra.png",
  },
];

export const sections = [
  "Dashboard",
  "My Lexus",
  "Encore",
  "Profile",
] as const;
export type Section = (typeof sections)[number];

// Tabs shown in the secondary nav (label + internal section value)
export const navTabs: { value: Section; label: string }[] = [
  { value: "Dashboard", label: "Dashboard" },
  { value: "Encore", label: "Encore Benefits" },
  { value: "My Lexus", label: "My Lexus" },
  { value: "Profile", label: "Profile" },
];
