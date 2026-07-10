import type { Metadata } from "next";
import type { CalcMode } from "@/lib/payCalculator";
import { MIN_HOURLY_WAGE_2026 } from "@/config/seo";
import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";

export type LandingIntroSection = { title: string; body: string };

export type LandingPageConfig = {
  path: string;
  calcMode: CalcMode;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  tagline: string;
  badge?: string;
  breadcrumbName: string;
  introSections: LandingIntroSection[];
  initialHourly?: number;
  initialDaysPerWeek?: string;
  initialHoursPerDay?: string;
  initialIncludeWeeklyHoliday?: boolean;
};

const siteUrl = siteConfig.url;

export function buildLandingMetadata(page: LandingPageConfig): Metadata {
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: page.path,
      languages: { "ko-KR": page.path },
    },
    openGraph: {
      type: "website",
      locale: seoConfig.locale,
      url: `${siteUrl}${page.path}`,
      siteName: seoConfig.siteName,
      title: page.title,
      description: page.description,
      images: [
        {
          url: seoConfig.ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [seoConfig.ogImage],
    },
  };
}

export const hourlyLanding: LandingPageConfig = {
  path: "/hourly",
  calcMode: "hourly",
  title: "시급 계산기 | 월급·연봉·실수령 환산 (2026)",
  description:
    "시급을 입력하면 월급, 연봉, 실수령액을 즉시 계산합니다. 주휴수당 포함 여부 선택, 2026 최저시급 10,320원 프리셋. 알바·파트타임·정규직 모두 사용 가능.",
  keywords: [
    "시급 계산기",
    "시급 월급 변환",
    "시급 연봉 계산",
    "알바 시급 계산",
    "2026 시급 계산",
    "시급 실수령액",
    "시급 월급 환산",
    "최저시급 월급",
  ],
  h1: "시급 계산기",
  tagline: "시급 입력 → 월급 · 연봉 · 실수령액을 3초 만에 확인하세요.",
  badge: "주휴수당 · 209시간 기준",
  breadcrumbName: "시급 계산기",
  introSections: [
    {
      title: "시급 계산기는 누가 쓰나요?",
      body: "알바·아르바이트·파트타임·정규직 모두 시급 기준으로 월급과 연봉을 역산할 수 있습니다. 근무 시간과 주당 근무일수를 입력하면 주휴수당 포함 여부에 따른 예상 월급을 계산합니다.",
    },
    {
      title: "주휴수당 포함 여부",
      body: "주 15시간 이상 근무 시 주휴수당이 발생합니다. 공식: (주 근무시간 ÷ 40) × 8 × 시급. 체크박스를 켜면 월급에 주휴수당이 반영됩니다.",
    },
    {
      title: "실수령액은 참고용입니다",
      body: "4대보험·소득세는 간이 추정치입니다. 정확한 세후 실수령액은 tax.ehfrhfo.com 세금 계산기에서 확인하세요.",
    },
  ],
};

export const annualLanding: LandingPageConfig = {
  path: "/annual",
  calcMode: "annual",
  title: "연봉 계산기 | 시급·월급·실수령 환산 (2026)",
  description:
    "연봉을 입력하면 시급, 월급, 실수령액을 역산합니다. 월 209시간(주 40h + 주휴 8h) 기준. 2026년 최신 환산 공식.",
  keywords: [
    "연봉 계산기",
    "연봉 시급 변환",
    "연봉 월급 계산",
    "연봉 실수령액",
    "2026 연봉 계산",
    "연봉 역산",
    "연봉 시급 환산",
    "연봉 4000 시급",
  ],
  h1: "연봉 계산기",
  tagline: "연봉 입력 → 시급 · 월급 · 실수령액을 역산합니다.",
  badge: "월 209시간 기준 역산",
  breadcrumbName: "연봉 계산기",
  introSections: [
    {
      title: "연봉에서 시급은 어떻게 나오나요?",
      body: "연봉 ÷ 12 = 월급(세전). 시급은 월 209시간(주 40시간 + 주휴 8시간 × 4.345주)으로 나눠 역산합니다. 회사마다 상여·수당 구조가 다르므로 참고용으로 활용하세요.",
    },
    {
      title: "연봉 협상·이직 비교에 활용",
      body: "같은 연봉이라도 주휴수당·수당 구조에 따라 실질 시급이 달라질 수 있습니다. 본 계산기로 연봉 제안서의 시급 환산값을 빠르게 확인할 수 있습니다.",
    },
    {
      title: "세후 실수령액",
      body: "4대보험·소득세 공제 후 실수령액은 간이 추정입니다. 자녀·배우자 공제까지 반영한 정밀 계산은 세금 계산기를 이용하세요.",
    },
  ],
};

export const minimumWageLanding: LandingPageConfig = {
  path: "/minimum-wage",
  calcMode: "hourly",
  title: "2026 최저시급 계산기 | 10,320원 월급·연봉",
  description:
    "2026년 최저시급 10,320원 기준 월급·연봉·실수령액을 계산합니다. 주 40시간·주휴수당 포함. 2010~2026 최저임금 변화도 확인.",
  keywords: [
    "2026 최저시급",
    "최저임금 계산기",
    "최저시급 월급",
    "최저시급 연봉",
    "10320원 월급",
    "2026 최저임금",
    "최저시급 실수령",
    "알바 최저시급",
  ],
  h1: "2026 최저시급 계산기",
  tagline: "2026년 최저시급 10,320원 · 주 40시간 · 주휴수당 포함 월급·연봉",
  badge: "2026 최저시급 10,320원",
  breadcrumbName: "최저시급 계산기",
  initialHourly: MIN_HOURLY_WAGE_2026,
  initialDaysPerWeek: "5",
  initialHoursPerDay: "8",
  initialIncludeWeeklyHoliday: true,
  introSections: [
    {
      title: "2026년 최저시급은 얼마인가요?",
      body: "2026년 최저시급은 시간당 10,320원입니다. 주 40시간, 주휴수당 포함 시 월 약 215만원, 연 약 2,580만원(세전) 수준입니다.",
    },
    {
      title: "최저임금 위반 확인",
      body: "시급이 10,320원 미만이면 최저임금 위반입니다. 주휴수당·각종 수당을 제외한 순수 시급 기준으로 확인하세요.",
    },
    {
      title: "최저시급 인상 이력",
      body: "홈페이지 하단에서 2010년부터 2026년까지 최저임금 변화 인포그래픽을 확인할 수 있습니다.",
    },
  ],
};

export const partTimeLanding: LandingPageConfig = {
  path: "/part-time",
  calcMode: "hourly",
  title: "알바·파트타임 시급 계산기 | 주휴수당·월급",
  description:
    "알바·파트타임 시급으로 월급·연봉을 계산합니다. 주 15~20시간 근무, 주휴수당 포함 여부 선택. 2026 최저시급 반영.",
  keywords: [
    "알바 시급 계산",
    "파트타임 월급",
    "알바 월급 계산",
    "주휴수당 계산",
    "단기 알바 시급",
    "주 20시간 알바",
    "아르바이트 월급",
    "알바 연봉 환산",
  ],
  h1: "알바·파트타임 시급 계산기",
  tagline: "알바 시급과 근무 시간만 입력하면 주휴수당 포함 월급을 계산합니다.",
  badge: "주 15시간+ 주휴수당",
  breadcrumbName: "알바 계산기",
  initialDaysPerWeek: "3",
  initialHoursPerDay: "5",
  initialIncludeWeeklyHoliday: true,
  introSections: [
    {
      title: "알바 주휴수당 조건",
      body: "주 15시간 이상, 개근 시 주휴수당이 발생합니다. 주 20시간 알바라면 주휴수당이 월급에 상당한 비중을 차지합니다.",
    },
    {
      title: "파트타임 vs 단기 알바",
      body: "장기 파트타임은 주휴수당·4대보험 대상이 될 수 있습니다. 단기·일용은 계약 형태에 따라 다르므로 고용주와 계약서를 확인하세요.",
    },
    {
      title: "세후 실수령액",
      body: "3.3% 원천징수 vs 4대보험+소득세는 계약 유형에 따라 다릅니다. 정확한 세후 금액은 tax.ehfrhfo.com에서 확인하세요.",
    },
  ],
};

export const allLandingPages = [
  hourlyLanding,
  annualLanding,
  minimumWageLanding,
  partTimeLanding,
] as const;
