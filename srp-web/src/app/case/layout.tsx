import CasesJsonLd from "./JsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Silk Road Professionals",
  description:
    " Review our portfolio of custom B2B software engineering. See how Silk Road Professionals architects ERPs and automation platforms for enterprise scale.",
  alternates: {
    canonical: "/case",
    languages: {
      en: "/case",
      "x-default": "/case",
    },
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CasesJsonLd />
      {children}
    </>
  );
}
