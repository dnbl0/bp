export interface ConciergeTeamMember {
  name: string;
  role: string;
  initials: string;
  languages: string[];
  responseSlaMinutes: number;
}

export const conciergeTeam: ConciergeTeamMember = {
  name: "Priya Singh",
  role: "Senior Encore Concierge",
  initials: "PS",
  languages: ["English", "Hindi", "Mandarin"],
  responseSlaMinutes: 5,
};

export interface ConciergeTopic {
  id: string;
  label: string;
  example: string;
}

export const conciergeTopics: ConciergeTopic[] = [
  {
    id: "dining",
    label: "Restaurant booking",
    example: "Table for two at a quiet restaurant in Sydney CBD next Friday.",
  },
  {
    id: "travel",
    label: "Travel & escapes",
    example: "Weekend in the Yarra Valley — vineyard recommendations welcome.",
  },
  {
    id: "lounge",
    label: "Lounge access",
    example: "Help me redeem a lounge pass at Sydney T1 on Saturday.",
  },
  {
    id: "service",
    label: "Service or vehicle",
    example: "Question about my next service booking and loan-car eligibility.",
  },
  {
    id: "lifestyle",
    label: "Lifestyle experience",
    example: "Looking for a private golf lesson on the Mornington Peninsula.",
  },
  {
    id: "other",
    label: "Something else",
    example: "",
  },
];

export type ConciergeAuthor = "you" | "concierge";

export interface ConciergeMessage {
  id: string;
  from: ConciergeAuthor;
  body: string;
  at: number;
  topic?: string;
}

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const now = Date.now();

export const seedConciergeThread: ConciergeMessage[] = [
  {
    id: "seed-welcome",
    from: "concierge",
    body: `Welcome, Susan. I'm here whenever you need a hand — whether it's a restaurant booking, a weekend getaway or anything to do with your Lexus.`,
    at: now - 4 * DAY,
  },
  {
    id: "seed-suggest",
    from: "concierge",
    body: `A quick note — your lounge e-certificate expires in two weeks. Happy to help arrange a stopover if you're travelling soon.`,
    at: now - 4 * DAY + 30 * 60 * 1000,
  },
];

/**
 * Time-aware short autoreply — used to simulate the concierge typing back.
 */
export function autoReplyFor(message: string, topic?: string): string {
  const body = message.trim();
  if (topic === "dining") {
    return `Lovely. I'll look into a few quiet restaurants and come back to you within the hour with two or three options that match the night you're after.`;
  }
  if (topic === "travel") {
    return `Wonderful — escapes are my favourite. Let me put together a short list with vineyard recommendations and somewhere lovely to stay. Back to you shortly.`;
  }
  if (topic === "lounge") {
    return `Of course. I'll check availability and the e-certificate balance on your account and confirm the lounges I can secure for you.`;
  }
  if (topic === "service") {
    return `Happy to help. I'll pull up your service booking and loan-car eligibility now and get back to you with the detail.`;
  }
  if (topic === "lifestyle") {
    return `Beautiful. I'll reach out to our partners and come back with a couple of curated options for you.`;
  }
  return body.length > 0
    ? `Thanks Susan — I've got this. I'll be back to you within ${conciergeTeam.responseSlaMinutes} minutes with options.`
    : `I'm here whenever you'd like to chat.`;
}
