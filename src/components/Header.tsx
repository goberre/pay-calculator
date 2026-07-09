import { siteConfig } from "@/config/site";

export default function Header() {
  return (
    <header className="border-b border-gray-200/80 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-xl text-white shadow-sm">
          ₩
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          2026 시급/연봉 상호 변환기
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
          {siteConfig.tagline}
        </p>
        <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
          주휴수당 · 209시간 기준 · 실시간 계산
        </span>
      </div>
    </header>
  );
}
