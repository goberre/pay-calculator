import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import BlogSection from "@/components/BlogSection";
import PayCalculatorClient from "@/components/PayCalculatorClient";
import SeoContent from "@/components/SeoContent";
import {
  allLandingPages,
  type LandingPageConfig,
} from "@/config/landingPages";

type LandingPageProps = {
  config: LandingPageConfig;
};

export default function LandingPage({ config }: LandingPageProps) {
  const relatedPages = allLandingPages.filter(
    (page) => page.path !== config.path,
  );

  return (
    <>
      <JsonLd
        path={config.path}
        breadcrumbName={config.breadcrumbName}
        pageTitle={config.title}
        pageDescription={config.description}
      />
      <PayCalculatorClient
        defaultMode={config.calcMode}
        headline={config.h1}
        tagline={config.tagline}
        badge={config.badge}
        initialHourly={config.initialHourly}
        initialDaysPerWeek={config.initialDaysPerWeek}
        initialHoursPerDay={config.initialHoursPerDay}
        initialIncludeWeeklyHoliday={config.initialIncludeWeeklyHoliday}
      />
      <SeoContent
        introSections={[...config.introSections]}
        showHowTo={false}
        showMinimumWage={config.path === "/minimum-wage"}
        showFaq={false}
      />
      <BlogSection limit={3} />
      <nav
        className="mx-auto max-w-4xl px-4 pb-12"
        aria-label="관련 계산기"
      >
        <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-gray-900">
            다른 계산기
          </h2>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <li>
              <Link
                href="/"
                className="inline-flex rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              >
                전체 계산기
              </Link>
            </li>
            {relatedPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className="inline-flex rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                >
                  {page.breadcrumbName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
