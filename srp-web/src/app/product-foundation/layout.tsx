import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Foundation | Silk Road Professionals",
  description:
    "Launch your custom application on a scalable, secure architecture. Our agency builds enterprise-grade software product foundations for long-term growth.",
  alternates: {
    canonical: "/product-foundation",
    languages: {
      en: "/product-foundation",
      "x-default": "/product-foundation",
    },
  },
};

export default function ProductFoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
