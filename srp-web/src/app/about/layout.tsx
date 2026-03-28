import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Silk Road Professionals",
  description:
    "Silk Road Professionals is a global custom software development agency. Discover our engineering culture, agile methodologies, and flexible team models.",
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      "x-default": "/about",
    },
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
