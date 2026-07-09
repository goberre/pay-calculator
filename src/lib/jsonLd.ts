import { faqItems, seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";

export function buildJsonLdGraph() {
  const url = siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: seoConfig.siteName,
        description: seoConfig.description,
        inLanguage: "ko-KR",
      },
      {
        "@type": "WebApplication",
        "@id": `${url}/#app`,
        name: seoConfig.siteName,
        url,
        description: seoConfig.description,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
        inLanguage: "ko-KR",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
