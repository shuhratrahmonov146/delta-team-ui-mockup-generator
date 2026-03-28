import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type LinkItem = {
  href: string;
  label: string;
  logo?: string | StaticImport;
};

// List of FooterMenuItems
export const footerMenuItems: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Product Foundation", href: "/product-foundation" },
  { label: "Integration Sprint", href: "/integration-sprint" },
  { label: "Case Studies", href: "/case" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "GDPR Policy", href: "/gdpr" },
  { href: "http://careers.srpsoftware.com", label: "Careers" },
];

// List of SocialMediaLinks
export const socialMediaLinks: LinkItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/silkroadprofessionalsusa",
    logo: "/footer/linkedin.svg",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@silkroadprofessionals",
    logo: "/footer/youtube.svg",
  },
];
