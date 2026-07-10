import LandingPage from "@/components/LandingPage";
import {
  buildLandingMetadata,
  partTimeLanding,
} from "@/config/landingPages";

export const metadata = buildLandingMetadata(partTimeLanding);

export default function PartTimePage() {
  return <LandingPage config={partTimeLanding} />;
}
