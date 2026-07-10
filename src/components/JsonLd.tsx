import { buildJsonLdGraph } from "@/lib/jsonLd";

type JsonLdProps = {
  path?: string;
  breadcrumbName?: string;
  pageTitle?: string;
  pageDescription?: string;
};

export default function JsonLd({
  path,
  breadcrumbName,
  pageTitle,
  pageDescription,
}: JsonLdProps = {}) {
  const graph = buildJsonLdGraph({
    path,
    breadcrumbName,
    pageTitle,
    pageDescription,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
