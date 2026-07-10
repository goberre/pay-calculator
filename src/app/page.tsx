import JsonLd from "@/components/JsonLd";
import BlogSection from "@/components/BlogSection";
import PayCalculatorClient from "@/components/PayCalculatorClient";
import RelatedCalculators from "@/components/RelatedCalculators";
import RelatedTools from "@/components/RelatedTools";
import ScrollDownHint from "@/components/ScrollDownHint";
import SeoContent from "@/components/SeoContent";

export default function Home() {
  return (
    <>
      <JsonLd />
      <PayCalculatorClient />
      <ScrollDownHint />
      <div id="below-content">
        <RelatedCalculators />
        <RelatedTools />
        <SeoContent />
        <BlogSection />
      </div>
    </>
  );
}
