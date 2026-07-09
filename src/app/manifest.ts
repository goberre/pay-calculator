import type { MetadataRoute } from "next";
import { seoConfig } from "@/config/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.siteName,
    short_name: "시급·연봉 계산기",
    description: seoConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#3182F6",
    lang: "ko",
    categories: ["finance", "utilities"],
  };
}
