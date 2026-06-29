export interface LifestyleOffer {
  id: string;
  brand: string;
  location: string;
  redemptions: number;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  body: string;
}

export const lifestyleOffers: LifestyleOffer[] = [
  {
    id: "jackalope",
    brand: "Jackalope Hotel",
    location: "Mornington Peninsula",
    redemptions: 2,
    image: "assets/offer-sofitel-gc.png",
  },
  {
    id: "raes",
    brand: "Raes on Wategos",
    location: "Byron Bay",
    redemptions: 4,
    image: "assets/offer-sofitel-adl.png",
  },
  {
    id: "emirates",
    brand: "Emirates One&Only Wolgan Valley",
    location: "Greater Blue Mountains",
    redemptions: 1,
    image: "assets/offer-crown-syd.png",
  },
];

export const serviceExperience: ServiceItem[] = [
  {
    id: "drivecare",
    title: "DriveCare",
    body: "Our 24-hour roadside assistance service for Encore Members, wherever the road takes you.",
  },
  {
    id: "loan-car",
    title: "Service Loan Car",
    body: "Pick up a service loan car from your dealer, or have one delivered to you while yours is serviced.",
  },
  {
    id: "connected",
    title: "Connected Services",
    body: "A suite of in-car technology focused on safety, security and everyday convenience.",
  },
];

export const discoverEncore = {
  kicker: "Refer a friend",
  title: "Share the Encore experience",
  body: "Invite a friend to test drive a Lexus and you'll both receive an exclusive concierge dining experience on us.",
  cta: "Send an invitation",
  image: "assets/encore-discover.png",
};
