import ServicesJsonLd from "./JsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Automation Services | Silk Road Professionals",
  description:
    "Silk Road Professionals provides enterprise system integration, legacy modernization, and custom business automation services for global IT leaders.",
  alternates: {
    canonical: "/services",
    languages: {
      en: "/services",
      "x-default": "/services",
    },
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServicesJsonLd />
      {children}
    </>
  );
}
