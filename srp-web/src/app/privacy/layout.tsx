import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Silk Road Professionals",
  alternates: {
    canonical: "/privacy",
    languages: {
      en: "/privacy",
      "x-default": "/privacy",
    },
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
