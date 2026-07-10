import LandingPage from "@/components/LandingPage";
import {
  buildLandingMetadata,
  hourlyLanding,
} from "@/config/landingPages";

export const metadata = buildLandingMetadata(hourlyLanding);

export default function HourlyPage() {
  return <LandingPage config={hourlyLanding} />;
}
