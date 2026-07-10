import type { BlogPostMeta } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export function buildArticleJsonLd(post: BlogPostMeta) {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${siteConfig.url}${post.image}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "ko-KR",
        image: [imageUrl],
        author: {
          "@type": "Organization",
          name: siteConfig.name,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        keywords: post.keywords.join(", "),
        articleSection: post.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "홈",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "시급·연봉 가이드",
            item: `${siteConfig.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: url,
          },
        ],
      },
    ],
  };
}

export function buildBlogListJsonLd(posts: BlogPostMeta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "시급·연봉 가이드",
    description:
      "2026년 시급, 연봉, 주휴수당, 최저임금, 알바 월급 관련 정보",
    url: `${siteConfig.url}/blog`,
    inLanguage: "ko-KR",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      image: post.image.startsWith("http")
        ? post.image
        : `${siteConfig.url}${post.image}`,
      url: `${siteConfig.url}/blog/${post.slug}`,
    })),
  };
}
