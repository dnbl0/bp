import {
  benefits,
  guestDashboardBenefits,
  member,
  type Benefit,
} from "./dashboard";
import { vehicles } from "./vehicles";
import {
  profile,
  personalDetails,
  interests,
  paymentMethods,
  encoreMembership,
  type DetailRow,
  type PaymentMethod,
} from "./profile";
import type { Vehicle } from "./vehicles";

export type AccountId = "owner" | "guest";

export interface AccountMember {
  firstName: string;
  lastName: string;
  initials: string;
  email: string;
  tier: string;
  program: string;
  memberSinceYear: number;
}

export interface AccountProfile {
  firstName: string;
  lastName: string;
  initials: string;
  personal: DetailRow[];
  interests: string[];
  payments: PaymentMethod[];
}

export interface AccountMembershipSummary {
  program: string;
  tier: string;
  memberId: string;
  memberSince: string;
  renews: string;
  points: string;
}

export interface AccountConfig {
  id: AccountId;
  switchLabel: string;
  member: AccountMember;
  profile: AccountProfile;
  membership: AccountMembershipSummary;
  vehicles: Vehicle[];
  dashboardBenefits: Benefit[];
  encoreBenefits: Benefit[];
  canBookService: boolean;
  canRedeemEncore: boolean;
  canUseConcierge: boolean;
  canEditProfile: boolean;
  canAddVehicle: boolean;
  hasLexusVehicle: boolean;
  theme: "light" | "dark";
  heroImage: string;
  heroMarketing?: {
    eyebrow: string;
    title: string;
    lead: string;
    ctas: { label: string; target: "models" | "encore" | "link" }[];
  };
  restrictionsCopy: string;
}

export const accounts: Record<AccountId, AccountConfig> = {
  owner: {
    id: "owner",
    switchLabel: "Switch to Limited account",
    member,
    profile: {
      ...profile,
      personal: personalDetails,
      interests,
      payments: paymentMethods,
    },
    membership: encoreMembership,
    vehicles,
    dashboardBenefits: benefits,
    encoreBenefits: benefits,
    canBookService: true,
    canRedeemEncore: true,
    canUseConcierge: true,
    canEditProfile: true,
    canAddVehicle: true,
    hasLexusVehicle: true,
    theme: "dark",
    heroImage: "assets/hero.png",
    restrictionsCopy: "",
  },
  guest: {
    id: "guest",
    switchLabel: "Switch to Lexus owner account",
    member: {
      firstName: "Alex",
      lastName: "Taylor",
      initials: "AT",
      email: "alex.taylor@email.com",
      tier: "Base",
      program: "Lexus Account",
      memberSinceYear: 2026,
    },
    profile: {
      firstName: "Alex",
      lastName: "Taylor",
      initials: "AT",
      personal: [
        { label: "Full name", value: "Alex Taylor" },
        { label: "Email", value: "alex.taylor@email.com" },
        { label: "Mobile", value: "0432 654 987" },
        { label: "Status", value: "No Lexus linked" },
      ],
      interests: ["Travel", "Lifestyle offers", "Tech"],
      payments: [],
    },
    membership: {
      program: "Encore",
      tier: "Not subscribed",
      memberId: "—",
      memberSince: "—",
      renews: "—",
      points: "0",
    },
    vehicles: [],
    dashboardBenefits: guestDashboardBenefits,
    encoreBenefits: benefits,
    canBookService: false,
    canRedeemEncore: false,
    canUseConcierge: false,
    canEditProfile: false,
    canAddVehicle: true,
    hasLexusVehicle: false,
    theme: "light",
    heroImage: "assets/lc_encore_track_retouchedwheels_desktop.webp",
    heroMarketing: {
      eyebrow: "Experience Amazing",
      title: "Find the Lexus made for you",
      lead: "Explore the range, discover the privileges of Encore membership, and bring your pre-owned Lexus into your account.",
      ctas: [
        { label: "Explore the range", target: "models" },
        { label: "Discover Encore", target: "encore" },
        { label: "Link a pre-owned Lexus", target: "link" },
      ],
    },
    restrictionsCopy:
      "Link a Lexus and upgrade to a paid Encore membership to unlock service booking, concierge and redemptions.",
  },
};
