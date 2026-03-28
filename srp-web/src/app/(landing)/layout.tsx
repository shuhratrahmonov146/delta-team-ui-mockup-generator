import { areaServedData } from "@/lib/shared-json-ld-data";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Silk Road Professionals",
  url: "https://srpsoftware.com",
  logo: "https://srpsoftware.com/logo/logo.svg",
  email: "communications@srpsoftware.com",
  sameAs: [
    "https://www.linkedin.com/company/silkroadprofessionalsusa/",
    "https://www.youtube.com/@silkroadprofessionals",
  ],
  areaServed: areaServedData,
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <div>{children}</div>
    </>
  );
}
