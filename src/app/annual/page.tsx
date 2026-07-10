import LandingPage from "@/components/LandingPage";
import {
  annualLanding,
  buildLandingMetadata,
} from "@/config/landingPages";

export const metadata = buildLandingMetadata(annualLanding);

export default function AnnualPage() {
  return <LandingPage config={annualLanding} />;
}
