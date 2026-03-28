import { offices } from "@/data/offices";
import { areaServedData } from "@/lib/shared-json-ld-data";

export default function ContactJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": offices.map((office) => ({
      "@type": "LocalBusiness",
      name: `Silk Road Professionals — ${office.country}`,
      url: "https://srpsoftware.com",
      logo: "https://srpsoftware.com/logo/logo.svg",
      email: "communications@srpsoftware.com",
      telephone: office.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: office.address,
        addressLocality: office.city,
        addressCountry: office.country,
      },
      sameAs: [
        "https://www.linkedin.com/company/silkroadprofessionalsusa/",
        "https://www.youtube.com/@silkroadprofessionals",
      ],
    })),
    areaServed: areaServedData,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
