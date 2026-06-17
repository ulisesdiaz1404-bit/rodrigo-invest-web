import type { LucideIcon } from "lucide-react";

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export type SocialNetwork = "instagram" | "tiktok" | "whatsapp";

export interface SocialLink {
  network: SocialNetwork;
  label: string;
  handle: string;
  url: string;
}
