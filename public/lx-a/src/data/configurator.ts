/**
 * Build & Price configurator data. Models, grades, enhancements and colour /
 * trim options are modelled on the Lexus Australia range (lexus.com.au build &
 * price). Prices are indicative MSRP "from" figures for the prototype.
 */

export interface ConfigColour {
  id: string;
  name: string;
  hex: string;
  /** second swatch tone for bi-tone / pearl finishes */
  hex2?: string;
  finish: string; // "Solid" | "Metallic" | "Premium"
  price: number;
}

export interface ConfigTrim {
  id: string;
  name: string;
  hex: string;
  material: string; // "NuLuxe" | "Leather accented"
}

export interface ConfigEnhancement {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface ConfigGrade {
  id: string;
  name: string;
  price: number;
  drivetrain: string;
  power: string;
  economy: string;
  highlights: string[];
  fSport?: boolean;
}

export interface ConfigModel {
  id: string;
  name: string;
  fullName: string;
  bodyType: string;
  tagline: string;
  image: string;
  /** matches a file in /assets/eBrochures/<brochure>_ebrochure.pdf, or null */
  brochure: string | null;
  priceFrom: number;
  grades: ConfigGrade[];
  enhancements: ConfigEnhancement[];
  exterior: ConfigColour[];
  interior: ConfigTrim[];
}

/* ---- shared palettes (each model picks from these) ---- */
const EXT = {
  quartz: { id: "quartz", name: "Sonic Quartz", hex: "#ECEDEB", finish: "Premium", price: 1500 },
  chrome: { id: "chrome", name: "Sonic Chrome", hex: "#C7CCD1", finish: "Metallic", price: 0 },
  titanium: { id: "titanium", name: "Titanium", hex: "#8B8E92", finish: "Metallic", price: 0 },
  graphite: { id: "graphite", name: "Graphite Black", hex: "#1C1D1F", finish: "Metallic", price: 0 },
  copper: { id: "copper", name: "Sonic Copper", hex: "#7C5746", finish: "Premium", price: 1500 },
  celestial: { id: "celestial", name: "Celestial Blue", hex: "#2E3C57", finish: "Premium", price: 1500 },
  khaki: { id: "khaki", name: "Khaki Metal", hex: "#6E6856", finish: "Metallic", price: 0 },
  vermilion: { id: "vermilion", name: "Vermilion", hex: "#A8372C", finish: "Premium", price: 1500 },
  iridium: { id: "iridium", name: "Sonic Iridium", hex: "#4A4E54", finish: "Metallic", price: 0 },
} satisfies Record<string, ConfigColour>;

const INT = {
  black: { id: "black", name: "Black", hex: "#1C1C1E", material: "NuLuxe" },
  birch: { id: "birch", name: "Birch", hex: "#D9CFBE", material: "NuLuxe" },
  cream: { id: "cream", name: "Rich Cream", hex: "#E8DFCB", material: "Leather accented" },
  hazel: { id: "hazel", name: "Hazel", hex: "#8A6A47", material: "Leather accented" },
  flare: { id: "flare", name: "Flare Red", hex: "#6E2024", material: "NuLuxe" },
  rose: { id: "rose", name: "Dark Rose", hex: "#5A3A40", material: "Leather accented" },
  cobalt: { id: "cobalt", name: "Cobalt", hex: "#2A3A5A", material: "NuLuxe" },
  earth: { id: "earth", name: "Earth", hex: "#7A5B3E", material: "NuLuxe" },
} satisfies Record<string, ConfigTrim>;

const ML: ConfigEnhancement = {
  id: "ml",
  name: "Mark Levinson® Premium Audio",
  description: "17-speaker Mark Levinson surround-sound system with digital signal processing.",
  price: 2800,
};
const PANO: ConfigEnhancement = {
  id: "pano",
  name: "Panoramic glass roof",
  description: "Full-length tilt-and-slide moonroof with power sunshade.",
  price: 2000,
};

export const models: ConfigModel[] = [
  {
    id: "nx",
    name: "NX",
    fullName: "Lexus NX",
    bodyType: "Mid-size SUV",
    tagline: "The mid-size SUV that moves you.",
    image: "assets/models/nx.png",
    brochure: "nx",
    priceFrom: 66500,
    grades: [
      {
        id: "nx250-lux",
        name: "NX 250 Luxury",
        price: 66500,
        drivetrain: "Petrol · FWD",
        power: "152 kW",
        economy: "8.1 L/100km",
        highlights: ["14\" touchscreen", "10-speaker audio", "Tri-zone climate"],
      },
      {
        id: "nx350h-lux",
        name: "NX 350h Luxury",
        price: 71000,
        drivetrain: "Hybrid · AWD",
        power: "179 kW",
        economy: "5.0 L/100km",
        highlights: ["Hybrid AWD", "Wireless charging", "Power tailgate"],
      },
      {
        id: "nx350h-sl",
        name: "NX 350h Sports Luxury",
        price: 84500,
        drivetrain: "Hybrid · AWD",
        power: "179 kW",
        economy: "5.1 L/100km",
        highlights: ["Semi-aniline leather", "Head-up display", "Panoramic view monitor"],
      },
      {
        id: "nx450h-fsport",
        name: "NX 450h+ F Sport",
        price: 93000,
        drivetrain: "Plug-in Hybrid · AWD",
        power: "227 kW",
        economy: "1.3 L/100km",
        highlights: ["87 km EV range", "Adaptive suspension", "F Sport styling"],
        fSport: true,
      },
    ],
    enhancements: [
      { id: "ep1", name: "Enhancement Pack 1", description: "Panoramic view monitor, head-up display and digital rear-view mirror.", price: 3500 },
      ML,
      PANO,
    ],
    exterior: [EXT.quartz, EXT.chrome, EXT.titanium, EXT.graphite, EXT.copper, EXT.celestial, EXT.khaki, EXT.vermilion],
    interior: [INT.black, INT.birch, INT.cream, INT.flare],
  },
  {
    id: "ux",
    name: "UX",
    fullName: "Lexus UX",
    bodyType: "Compact SUV",
    tagline: "Made for the city, ready for more.",
    image: "assets/models/ux.png",
    brochure: "ux",
    priceFrom: 61000,
    grades: [
      {
        id: "ux300h-lux",
        name: "UX 300h Luxury",
        price: 61000,
        drivetrain: "Hybrid · FWD",
        power: "146 kW",
        economy: "4.5 L/100km",
        highlights: ["12.3\" touchscreen", "Wireless CarPlay", "8-speaker audio"],
      },
      {
        id: "ux300h-fsport",
        name: "UX 300h F Sport",
        price: 66500,
        drivetrain: "Hybrid · AWD",
        power: "146 kW",
        economy: "4.7 L/100km",
        highlights: ["F Sport styling", "Sports seats", "Adaptive variable suspension"],
        fSport: true,
      },
      {
        id: "ux300h-sl",
        name: "UX 300h Sports Luxury",
        price: 70500,
        drivetrain: "Hybrid · AWD",
        power: "146 kW",
        economy: "4.7 L/100km",
        highlights: ["Semi-aniline leather", "Head-up display", "Power front seats"],
      },
    ],
    enhancements: [
      { id: "ep", name: "Enhancement Pack", description: "Power tailgate, panoramic view monitor and premium triple-LED headlamps.", price: 2500 },
      ML,
    ],
    exterior: [EXT.quartz, EXT.chrome, EXT.titanium, EXT.graphite, EXT.celestial, EXT.copper],
    interior: [INT.black, INT.birch, INT.cobalt],
  },
  {
    id: "rx",
    name: "RX",
    fullName: "Lexus RX",
    bodyType: "Large SUV",
    tagline: "The pinnacle of the Lexus SUV range.",
    image: "assets/models/rx.png",
    brochure: null,
    priceFrom: 87500,
    grades: [
      {
        id: "rx350-lux",
        name: "RX 350 Luxury",
        price: 87500,
        drivetrain: "Petrol · AWD",
        power: "205 kW",
        economy: "8.3 L/100km",
        highlights: ["14\" touchscreen", "Power tailgate", "Tri-zone climate"],
      },
      {
        id: "rx350h-lux",
        name: "RX 350h Luxury",
        price: 92000,
        drivetrain: "Hybrid · AWD",
        power: "184 kW",
        economy: "6.0 L/100km",
        highlights: ["Hybrid AWD", "Wireless charging", "Panoramic view monitor"],
      },
      {
        id: "rx500h-fsport",
        name: "RX 500h F Sport Performance",
        price: 129000,
        drivetrain: "Hybrid · AWD",
        power: "273 kW",
        economy: "8.2 L/100km",
        highlights: ["Direct4 AWD", "Dynamic rear steering", "Mark Levinson audio"],
        fSport: true,
      },
    ],
    enhancements: [
      { id: "ep", name: "Enhancement Pack", description: "Panoramic roof, 21\" alloys and a digital rear-view mirror.", price: 4000 },
      ML,
      PANO,
    ],
    exterior: [EXT.quartz, EXT.chrome, EXT.titanium, EXT.graphite, EXT.copper, EXT.celestial],
    interior: [INT.black, INT.birch, INT.rose, INT.flare],
  },
  {
    id: "es",
    name: "ES",
    fullName: "Lexus ES",
    bodyType: "Sedan",
    tagline: "Effortless luxury, beautifully composed.",
    image: "assets/models/es.png",
    brochure: "es",
    priceFrom: 63000,
    grades: [
      {
        id: "es300h-lux",
        name: "ES 300h Luxury",
        price: 63000,
        drivetrain: "Hybrid · FWD",
        power: "160 kW",
        economy: "4.8 L/100km",
        highlights: ["12.3\" touchscreen", "10-speaker audio", "Power front seats"],
      },
      {
        id: "es300h-fsport",
        name: "ES 300h F Sport",
        price: 70000,
        drivetrain: "Hybrid · FWD",
        power: "160 kW",
        economy: "4.8 L/100km",
        highlights: ["F Sport styling", "Adaptive variable suspension", "Sports seats"],
        fSport: true,
      },
      {
        id: "es300h-sl",
        name: "ES 300h Sports Luxury",
        price: 78000,
        drivetrain: "Hybrid · FWD",
        power: "160 kW",
        economy: "4.8 L/100km",
        highlights: ["Semi-aniline leather", "Mark Levinson audio", "Head-up display"],
      },
    ],
    enhancements: [
      { id: "ep", name: "Enhancement Pack", description: "Panoramic view monitor, head-up display and heated rear seats.", price: 3000 },
      ML,
    ],
    exterior: [EXT.quartz, EXT.chrome, EXT.titanium, EXT.graphite, EXT.celestial, EXT.copper],
    interior: [INT.black, INT.cream, INT.hazel, INT.flare],
  },
  {
    id: "rz",
    name: "RZ",
    fullName: "Lexus RZ",
    bodyType: "Electric SUV",
    tagline: "All-electric. Unmistakably Lexus.",
    image: "assets/models/rz.png",
    brochure: null,
    priceFrom: 123000,
    grades: [
      {
        id: "rz450e-lux",
        name: "RZ 450e Luxury",
        price: 123000,
        drivetrain: "Electric · AWD",
        power: "230 kW",
        economy: "18.1 kWh/100km",
        highlights: ["440 km range", "Direct4 AWD", "DC fast charging"],
      },
      {
        id: "rz450e-fsport",
        name: "RZ 450e F Sport",
        price: 128000,
        drivetrain: "Electric · AWD",
        power: "230 kW",
        economy: "18.4 kWh/100km",
        highlights: ["F Sport styling", "Steer-by-wire ready", "Sports seats"],
        fSport: true,
      },
      {
        id: "rz450e-sl",
        name: "RZ 450e Sports Luxury",
        price: 135000,
        drivetrain: "Electric · AWD",
        power: "230 kW",
        economy: "18.1 kWh/100km",
        highlights: ["Panoramic roof", "Mark Levinson audio", "Semi-aniline leather"],
      },
    ],
    enhancements: [
      { id: "bitone", name: "Bi-tone roof", description: "Contrast black roof and pillars for a sculpted, two-tone profile.", price: 1500 },
      ML,
    ],
    exterior: [EXT.quartz, EXT.chrome, EXT.titanium, EXT.iridium, EXT.celestial, EXT.copper],
    interior: [INT.black, INT.birch, INT.cobalt],
  },
  {
    id: "lbx",
    name: "LBX",
    fullName: "Lexus LBX",
    bodyType: "Compact SUV",
    tagline: "Small in size. Big on presence.",
    image: "assets/models/lbx.png",
    brochure: "lbx",
    priceFrom: 47550,
    grades: [
      {
        id: "lbx-lux",
        name: "LBX Luxury",
        price: 47550,
        drivetrain: "Hybrid · FWD",
        power: "100 kW",
        economy: "3.8 L/100km",
        highlights: ["9.8\" touchscreen", "Wireless CarPlay", "Lexus Safety System+"],
      },
      {
        id: "lbx-sl",
        name: "LBX Sports Luxury",
        price: 56990,
        drivetrain: "Hybrid · AWD",
        power: "100 kW",
        economy: "4.0 L/100km",
        highlights: ["Mark Levinson audio", "Head-up display", "Panoramic view monitor"],
      },
    ],
    enhancements: [
      { id: "ep", name: "Enhancement Pack", description: "Power tailgate, premium headlamps and a wireless charger.", price: 2000 },
      ML,
    ],
    exterior: [EXT.quartz, EXT.chrome, EXT.titanium, EXT.graphite, EXT.copper, EXT.celestial, EXT.khaki],
    interior: [INT.black, INT.earth, INT.cobalt],
  },
];

export function modelById(id: string): ConfigModel | undefined {
  return models.find((m) => m.id === id);
}

export function formatPrice(n: number): string {
  return `$${n.toLocaleString("en-AU")}`;
}

/* ---- Wishlist (saved configurations) ---- */
export interface WishlistVehicle {
  id: string;
  modelId: string;
  modelName: string; // "NX"
  name: string; // "NX 350h Sports Luxury"
  bodyType: string;
  image: string;
  brochure: string | null;
  gradeId: string;
  exteriorName: string;
  exteriorHex: string;
  interiorName: string;
  interiorHex: string;
  enhancements: string[];
  price: number;
  savedAt: number;
}

export interface Selection {
  model: ConfigModel;
  grade: ConfigGrade;
  enhancements: ConfigEnhancement[];
  exterior: ConfigColour;
  interior: ConfigTrim;
}

export function selectionTotal(s: Selection): number {
  return (
    s.grade.price +
    s.exterior.price +
    s.enhancements.reduce((sum, e) => sum + e.price, 0)
  );
}

export function buildWishlistVehicle(s: Selection, savedAt: number): WishlistVehicle {
  return {
    id: `wish-${s.grade.id}-${savedAt}`,
    modelId: s.model.id,
    modelName: s.model.name,
    name: s.grade.name,
    bodyType: s.model.bodyType,
    image: s.model.image,
    brochure: s.model.brochure,
    gradeId: s.grade.id,
    exteriorName: s.exterior.name,
    exteriorHex: s.exterior.hex,
    interiorName: s.interior.name,
    interiorHex: s.interior.hex,
    enhancements: s.enhancements.map((e) => e.name),
    price: selectionTotal(s),
    savedAt,
  };
}

/**
 * Demo wishlist for the limited (guest) account, so the dashboard Wishlist
 * panel and the Wishlist page show saved Build & Price configurations out of
 * the box. `savedAt` values are fixed (the UI never renders them as relative
 * time — only the count, model, colours and price are shown).
 */
export const seedWishlist: WishlistVehicle[] = [
  {
    id: "wish-seed-nx350h-sl",
    modelId: "nx",
    modelName: "NX",
    name: "NX 350h Sports Luxury",
    bodyType: "Mid-size SUV",
    image: "assets/models/nx.png",
    brochure: "nx",
    gradeId: "nx350h-sl",
    exteriorName: "Celestial Blue",
    exteriorHex: "#2E3C57",
    interiorName: "Rich Cream",
    interiorHex: "#E8DFCB",
    enhancements: ["Enhancement Pack 1"],
    price: 89500,
    savedAt: 1782345600000,
  },
  {
    id: "wish-seed-ux300h-fsport",
    modelId: "ux",
    modelName: "UX",
    name: "UX 300h F Sport",
    bodyType: "Compact SUV",
    image: "assets/models/ux.png",
    brochure: "ux",
    gradeId: "ux300h-fsport",
    exteriorName: "Sonic Quartz",
    exteriorHex: "#ECEDEB",
    interiorName: "Flare Red",
    interiorHex: "#6E2024",
    enhancements: [],
    price: 68000,
    savedAt: 1781568000000,
  },
];
