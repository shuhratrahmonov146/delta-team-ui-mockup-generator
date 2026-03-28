import { servicesData } from "@/data/servicesData";
import { areaServedData } from "@/lib/shared-json-ld-data";

export default function ServicesJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": servicesData.map((service) => ({
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: "Silk Road Professionals",
        url: "https://srpsoftware.com",
      },
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
