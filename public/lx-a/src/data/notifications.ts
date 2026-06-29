export interface Notification {
  id: string;
  kind: "service" | "lounge" | "offer" | "system";
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export const notifications: Notification[] = [
  {
    id: "service-due",
    kind: "service",
    title: "Service due in 6 weeks",
    body: "Your NX 450h+ is due for its 60,000 km scheduled service at Lexus of Brighton on 12 Aug.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "lounge-expiry",
    kind: "lounge",
    title: "Lounge e-certificate expires soon",
    body: "Your DragonPass certificate issued in May expires in 14 days.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "offer-jackalope",
    kind: "offer",
    title: "New Encore offer — Jackalope Hotel",
    body: "Mornington Peninsula stays now available with a complimentary tasting menu.",
    time: "3 days ago",
    unread: false,
  },
];
