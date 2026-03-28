import { caseStudiesData } from "@/data/case";
import { areaServedData } from "@/lib/shared-json-ld-data";

export default function CasesJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": caseStudiesData.map((item) => ({
      "@type": "Article",
      headline: item.title,
      description: item.description[0],
      author: {
        "@type": "Organization",
        name: "Silk Road Professionals",
        url: "https://srpsoftware.com",
      },
      url: `https://srpsoftware.com/cases/${item.id}`,
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
