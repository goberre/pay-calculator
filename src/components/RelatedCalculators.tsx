import Link from "next/link";
import { allLandingPages } from "@/config/landingPages";

export default function RelatedCalculators() {
  return (
    <nav
      className="mx-auto max-w-4xl px-4 pb-12"
      aria-label="시급·연봉 계산기 모음"
    >
      <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          시급·연봉 계산기 모음
        </h2>
        <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {allLandingPages.map((page) => (
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
  );
}
