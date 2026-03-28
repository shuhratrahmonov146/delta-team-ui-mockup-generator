import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation | Silk Road Professionals",
  description:
    "Schedule a technical consultation with our software architects. Evaluate your business automation, API integration, or IT staff augmentation requirements.",
  alternates: {
    canonical: "/booking",
    languages: {
      en: "/booking",
      "x-default": "/booking",
    },
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
