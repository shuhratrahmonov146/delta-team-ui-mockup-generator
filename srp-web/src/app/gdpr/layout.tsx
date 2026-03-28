import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR Compliance | Silk Road Professionals",
  alternates: {
    canonical: "/gdpr",
    languages: {
      en: "/gdpr",
      "x-default": "/gdpr",
    },
  },
};

export default function GdprLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
