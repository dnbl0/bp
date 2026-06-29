// Profile screen data — the authenticated member's account details.
// Identity aligns with the dashboard hero (member.firstName = "Susan").

export const profile = {
  firstName: "Susan",
  lastName: "Mason",
  initials: "SM",
};

export interface DetailRow {
  label: string;
  value: string;
}

export const personalDetails: DetailRow[] = [
  { label: "Full name", value: "Susan Mason" },
  { label: "Date of birth", value: "14 March 1985" },
  { label: "Email", value: "susan.mason@email.com" },
  { label: "Mobile", value: "0412 345 678" },
  { label: "Home address", value: "27 Hawthorn Avenue, Mosman NSW 2088" },
  { label: "Driver licence", value: "NSW · •••• 4821" },
];

export const encoreMembership = {
  program: "Encore",
  tier: "Platinum",
  memberId: "ENC-0042-8817",
  memberSince: "March 2019",
  renews: "12 March 2027",
  points: "24,580",
};

export const interests: string[] = [
  "Driving experiences",
  "Motorsport",
  "Fine dining",
  "Travel & escapes",
  "Golf",
  "Art & design",
  "Wellness",
  "Technology",
];

// Full pool the member can choose from when editing their interests.
export const allInterests: string[] = [
  "Driving experiences",
  "Motorsport",
  "Fine dining",
  "Travel & escapes",
  "Golf",
  "Art & design",
  "Wellness",
  "Technology",
  "Music & events",
  "Fashion",
  "Sustainability",
  "Family",
  "Photography",
  "Cycling",
  "Boating",
  "Wine & spirits",
];

export interface CommPref {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const commsPreferences: CommPref[] = [
  {
    id: "email",
    label: "Email",
    description: "Offers, events and Encore updates",
    enabled: true,
  },
  {
    id: "sms",
    label: "SMS",
    description: "Service reminders and time-sensitive offers",
    enabled: true,
  },
  {
    id: "push",
    label: "Push notifications",
    description: "My Lexus app alerts on your devices",
    enabled: false,
  },
  {
    id: "post",
    label: "Post",
    description: "Printed magazine and seasonal mailers",
    enabled: false,
  },
];

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  primary: boolean;
}

export const paymentMethods: PaymentMethod[] = [
  { id: "visa", brand: "Visa", last4: "4821", expiry: "08/27", primary: true },
  { id: "amex", brand: "Amex", last4: "1009", expiry: "11/26", primary: false },
];
