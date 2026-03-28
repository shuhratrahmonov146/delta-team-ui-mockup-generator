import ContactJsonLd from "./JsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Silk Road Professionals",
  description:
    "Connect with Silk Road Professionals to scope your custom software needs. Speak with our engineering leads about IT outsourcing and system integrations.",
  alternates: {
    canonical: "/contact",
    languages: {
      en: "/contact",
      "x-default": "/contact",
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ContactJsonLd />
      {children}
    </>
  );
}
