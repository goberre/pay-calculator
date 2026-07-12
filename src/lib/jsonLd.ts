import { faqItems, seoConfig } from "@/config/seo";
import { brandUrls } from "@/config/brand";
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
      name: brandUrls.brandName,
      item: brandUrls.hub,
    },
    {
      "@type": "ListItem" as const,
      position: 2,
      name: "시급·연봉",
      item: url,
    },
  ];

  if (options.path && options.breadcrumbName) {
    breadcrumbItems.push({
      "@type": "ListItem" as const,
      position: 3,
      name: options.breadcrumbName,
      item: pageUrl,
    });
  }

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${brandUrls.hub}/#organization`,
      name: brandUrls.brandName,
      url: brandUrls.hub,
      logo: `${brandUrls.hub}/favicon.svg`,
      sameAs: [brandUrls.hub, brandUrls.tax, brandUrls.pay],
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url,
      name: seoConfig.siteName,
      description: seoConfig.description,
      inLanguage: "ko-KR",
      publisher: { "@id": `${brandUrls.hub}/#organization` },
      isPartOf: { "@id": `${brandUrls.hub}/#website` },
    },
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}#app`,
      name: pageName,
      url: pageUrl,
      description: pageDescription,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      provider: { "@id": `${brandUrls.hub}/#organization` },
      isPartOf: { "@id": `${url}/#website` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      inLanguage: "ko-KR",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
  ];

  if (!options.path) {
    graph.splice(3, 0, {
      "@type": "FAQPage",
      "@id": `${url}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
