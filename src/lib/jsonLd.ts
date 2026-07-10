import { faqItems, seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";

type JsonLdOptions = {
  path?: string;
  breadcrumbName?: string;
  pageTitle?: string;
  pageDescription?: string;
};

export function buildJsonLdGraph(options: JsonLdOptions = {}) {
  const url = siteConfig.url;
  const pageUrl = options.path ? `${url}${options.path}` : url;
  const pageName = options.pageTitle ?? seoConfig.siteName;
  const pageDescription = options.pageDescription ?? seoConfig.description;

  const breadcrumbItems = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "홈",
      item: url,
    },
  ];

  if (options.path && options.breadcrumbName) {
    breadcrumbItems.push({
      "@type": "ListItem" as const,
      position: 2,
      name: options.breadcrumbName,
      item: pageUrl,
    });
  }

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
        "@id": `${pageUrl}#app`,
        name: pageName,
        url: pageUrl,
        description: pageDescription,
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
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
    ],
  };
}
