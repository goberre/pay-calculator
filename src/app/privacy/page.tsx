import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${siteConfig.name} 개인정보처리방침. 수집 항목, 쿠키, 광고, 문의 방법을 안내합니다.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200/80 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← 계산기로 돌아가기
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            개인정보처리방침
          </h1>
          <p className="mt-2 text-sm text-gray-500">{siteConfig.name}</p>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-6 text-sm leading-7 text-gray-600">
            본 방침은 {siteConfig.url} (이하 「서비스」) 이용과 관련하여
            개인정보를 어떻게 처리하는지 설명합니다. 최종 업데이트: 2026년
            7월 10일
          </p>
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              1. 수집하는 정보
            </h2>
            <p className="text-sm leading-7 text-gray-600">
              본 서비스는 회원가입 없이 이용할 수 있으며, 계산기에 입력한
              금액·조건은 브라우저에서만 처리되고 서버에 저장하지 않습니다.
              접속 로그, IP, 쿠키, 기기 정보는 호스팅(Cloudflare) 및 분석·광고
              서비스 제공 시 자동 수집될 수 있습니다.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              2. 쿠키 및 광고
            </h2>
            <p className="text-sm leading-7 text-gray-600">
              Google AdSense 등 제3자 광고는 쿠키를 사용해 맞춤 광고를 제공할
              수 있습니다. Google 광고 설정에서 맞춤 광고를 끌 수 있습니다.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              3. 이용 목적
            </h2>
            <p className="text-sm leading-7 text-gray-600">
              서비스 제공, 보안·오류 분석, 트래픽 통계, 광고 게재.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              4. 문의
            </h2>
            <p className="text-sm leading-7 text-gray-600">
              개인정보 관련 문의는 사이트 운영자에게 {siteConfig.url} 도메인
              WHOIS 등록 정보로 연락해 주세요.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
