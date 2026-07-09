import JsonLd from "@/components/JsonLd";
import PayCalculatorClient from "@/components/PayCalculatorClient";
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
        <RelatedTools />
        <SeoContent />
      </div>
    </>
  );
}
