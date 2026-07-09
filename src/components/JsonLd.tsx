import { buildJsonLdGraph } from "@/lib/jsonLd";

export default function JsonLd() {
  const graph = buildJsonLdGraph();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
