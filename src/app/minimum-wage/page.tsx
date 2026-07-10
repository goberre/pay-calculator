import LandingPage from "@/components/LandingPage";
import {
  buildLandingMetadata,
  minimumWageLanding,
} from "@/config/landingPages";

export const metadata = buildLandingMetadata(minimumWageLanding);

export default function MinimumWagePage() {
  return <LandingPage config={minimumWageLanding} />;
}
