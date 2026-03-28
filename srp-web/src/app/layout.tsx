import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import HeaderWithConditional from "@/components/layout/HeaderWithConditional";
import { Footer } from "@/components/layout/Footer";
import ScrollHeaderWithConditional from "@/components/layout/ScrollHeaderWithConditional";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://srpsoftware.com"),
  title: "Silk Road Professionals",
  description:
    "Silk Road Professionals is a custom software agency delivering expert IT outsourcing, system integrations, and tailored business automation services.",
  icons: {
    icon: "favicon/favicon.ico",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <GoogleTagManager gtmId="GTM-WCNX2FTG" />
        <ScrollHeaderWithConditional />
        <HeaderWithConditional />
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-73WNDKCWCN" />
      </body>
    </html>
  );
}
