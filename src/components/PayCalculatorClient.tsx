"use client";

import { useMemo, useState } from "react";
import AdSpace from "@/components/AdSpace";
import Header from "@/components/Header";
import PayBreakdownChart from "@/components/PayBreakdownChart";
import {
  ANNUAL_PRESETS,
  HOURLY_PRESETS,
  MIN_HOURLY_WAGE_2026,
} from "@/config/seo";
import { siteConfig } from "@/config/site";
import {
  buildCopyText,
  calcFromAnnual,
  calcFromHourly,
  formatInputValue,
  formatWon,
  parseAmount,
  WEEKS_PER_MONTH,
  type CalcMode,
  type PayResult,
} from "@/lib/payCalculator";

const MODES: {
  id: CalcMode;
  label: string;
  hint: string;
}[] = [
  {
    id: "hourly",
    label: "시급 계산기",
    hint: "시급 → 월급 · 연봉 · 실수령",
  },
  {
    id: "annual",
    label: "연봉 계산기",
    hint: "연봉 → 시급 · 월급 · 실수령",
  },
];

const ANNUAL_EXAMPLE = 40_000_000;

type PayCalculatorClientProps = {
  defaultMode?: CalcMode;
  headline?: string;
  tagline?: string;
  badge?: string;
  initialHourly?: number;
  initialDaysPerWeek?: string;
  initialHoursPerDay?: string;
  initialIncludeWeeklyHoliday?: boolean;
};

export default function PayCalculatorClient({
  defaultMode = "hourly",
  headline,
  tagline,
  badge,
  initialHourly,
  initialDaysPerWeek,
  initialHoursPerDay,
  initialIncludeWeeklyHoliday,
}: PayCalculatorClientProps = {}) {
  const [mode, setMode] = useState<CalcMode>(defaultMode);
  const [hourlyInput, setHourlyInput] = useState(
    initialHourly ? formatInputValue(String(initialHourly)) : "",
  );
  const [hoursPerDay, setHoursPerDay] = useState(initialHoursPerDay ?? "8");
  const [daysPerWeek, setDaysPerWeek] = useState(initialDaysPerWeek ?? "5");
  const [includeWeeklyHoliday, setIncludeWeeklyHoliday] = useState(
    initialIncludeWeeklyHoliday ?? true,
  );
  const [annualInput, setAnnualInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result: PayResult | null = useMemo(() => {
    if (mode === "hourly") {
      const hourlyWage = parseAmount(hourlyInput);
      if (hourlyWage <= 0) return null;
      const hpd = Number(hoursPerDay) || 8;
      const dpw = Number(daysPerWeek) || 5;
      return calcFromHourly({
        hourlyWage,
        hoursPerDay: hpd,
        daysPerWeek: dpw,
        includeWeeklyHoliday,
      });
    }

    const annualSalary = parseAmount(annualInput);
    if (annualSalary <= 0) return null;
    return calcFromAnnual({ annualSalary });
  }, [
    mode,
    hourlyInput,
    hoursPerDay,
    daysPerWeek,
    includeWeeklyHoliday,
    annualInput,
  ]);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(buildCopyText(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleResult = useMemo(
    () =>
      calcFromHourly({
        hourlyWage: MIN_HOURLY_WAGE_2026,
        hoursPerDay: 8,
        daysPerWeek: 5,
        includeWeeklyHoliday: true,
      }),
    [],
  );

  const annualExampleResult = useMemo(
    () => calcFromAnnual({ annualSalary: ANNUAL_EXAMPLE }),
    [],
  );

  const activeMode = MODES.find((tab) => tab.id === mode)!;

  const applyHourlyPreset = (value: number) => {
    setHourlyInput(formatInputValue(String(value)));
  };

  const applyAnnualPreset = (value: number) => {
    setAnnualInput(formatInputValue(String(value)));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <Header headline={headline} tagline={tagline} badge={badge} />

      <main className="mx-auto max-w-4xl px-4 py-6">
        <AdSpace type="adsense" />

        <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-1.5 sm:flex-row">
              {MODES.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id)}
                  className={`flex-1 rounded-xl px-4 py-3 text-left transition-all ${
                    mode === tab.id
                      ? "bg-white text-gray-900 shadow-sm ring-1 ring-blue-100"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="block text-sm font-semibold">{tab.label}</span>
                  <span
                    className={`mt-0.5 block text-xs ${
                      mode === tab.id ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {tab.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-900">
              {activeMode.label}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{activeMode.hint}</p>
          </div>

          {mode === "hourly" ? (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-600">
                  시급 (원)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={hourlyInput}
                  onChange={(e) => setHourlyInput(formatInputValue(e.target.value))}
                  placeholder="10,320"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-2xl font-semibold tracking-tight text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {HOURLY_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyHourlyPreset(preset.value)}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-600">
                    하루 근무 시간
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={24}
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-medium outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-600">
                    주당 근무 일수
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-medium outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={includeWeeklyHoliday}
                  onChange={(e) => setIncludeWeeklyHoliday(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  주휴수당 포함 (주 15시간 이상 근무 시)
                </span>
              </label>
            </div>
          ) : (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                연봉 (원)
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={annualInput}
                onChange={(e) => setAnnualInput(formatInputValue(e.target.value))}
                placeholder="50,000,000"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-2xl font-semibold tracking-tight text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {ANNUAL_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyAnnualPreset(preset.value)}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-400">
                월 209시간(주 40h + 주휴 8h) 기준으로 시급을 역산합니다.
              </p>
            </div>
          )}
        </section>

        <AdSpace type="adsense" />

        <AdSpace
          type="coupang"
          productKeyword="사무용 모니터 받침대"
        />

        {!result && mode === "hourly" && (
          <section className="rounded-3xl border border-dashed border-gray-200 bg-white/80 p-6 sm:p-8">
            <p className="mb-1 text-center text-sm font-medium text-gray-500">
              시급 계산기 예시 · 2026 최저시급
            </p>
            <p className="mb-6 text-center text-xs text-gray-400">
              시급 {formatWon(MIN_HOURLY_WAGE_2026)} · 주 40시간 · 주휴수당 포함
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-500">예상 월급 (세전)</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {formatWon(exampleResult.monthlyGross)}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-500">예상 연봉 (세전)</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {formatWon(exampleResult.annualGross)}
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                <p className="text-xs text-emerald-600">예상 실수령 (간이)</p>
                <p className="mt-1 text-lg font-bold text-emerald-900">
                  {formatWon(exampleResult.monthlyNetEstimate)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => applyHourlyPreset(MIN_HOURLY_WAGE_2026)}
              className="mt-5 w-full rounded-2xl border border-blue-200 bg-blue-50 py-3 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
            >
              이 조건으로 계산하기
            </button>
          </section>
        )}

        {!result && mode === "annual" && (
          <section className="rounded-3xl border border-dashed border-gray-200 bg-white/80 p-6 sm:p-8">
            <p className="mb-1 text-center text-sm font-medium text-gray-500">
              연봉 계산기 예시 · 연봉 4,000만원
            </p>
            <p className="mb-6 text-center text-xs text-gray-400">
              월 209시간 기준 역산
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-blue-50 p-4 text-center">
                <p className="text-xs text-blue-600">환산 시급</p>
                <p className="mt-1 text-lg font-bold text-blue-900">
                  {formatWon(annualExampleResult.hourlyWage)}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-500">예상 월급 (세전)</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {formatWon(annualExampleResult.monthlyGross)}
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                <p className="text-xs text-emerald-600">예상 실수령 (간이)</p>
                <p className="mt-1 text-lg font-bold text-emerald-900">
                  {formatWon(annualExampleResult.monthlyNetEstimate)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => applyAnnualPreset(ANNUAL_EXAMPLE)}
              className="mt-5 w-full rounded-2xl border border-blue-200 bg-blue-50 py-3 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
            >
              연봉 4,000만원으로 계산하기
            </button>
          </section>
        )}

        {result && (
          <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-center text-sm font-medium text-gray-500">
              {activeMode.label} 결과
            </h2>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {mode === "annual" ? (
                <>
                  <div className="rounded-2xl bg-blue-50 p-5 text-center ring-2 ring-blue-200">
                    <p className="text-xs font-medium text-blue-600">환산 시급</p>
                    <p className="mt-2 text-2xl font-bold text-blue-900 sm:text-3xl">
                      {formatWon(result.hourlyWage)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-5 text-center ring-2 ring-gray-200">
                    <p className="text-xs font-medium text-gray-500">예상 월급 (세전)</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {formatWon(result.monthlyGross)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-5 text-center">
                    <p className="text-xs font-medium text-gray-500">입력 연봉 (세전)</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {formatWon(result.annualGross)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-5 text-center ring-2 ring-emerald-200">
                    <p className="text-xs font-medium text-emerald-600">
                      예상 월 실수령 (간이)
                    </p>
                    <p className="mt-2 text-2xl font-bold text-emerald-900 sm:text-3xl">
                      {formatWon(result.monthlyNetEstimate)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-2xl bg-gray-50 p-5 text-center">
                    <p className="text-xs font-medium text-gray-500">입력 시급</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {formatWon(result.hourlyWage)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-blue-50 p-5 text-center ring-2 ring-blue-200">
                    <p className="text-xs font-medium text-blue-600">예상 월급 (세전)</p>
                    <p className="mt-2 text-2xl font-bold text-blue-900 sm:text-3xl">
                      {formatWon(result.monthlyGross)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-blue-50 p-5 text-center ring-2 ring-blue-200">
                    <p className="text-xs font-medium text-blue-600">예상 연봉 (세전)</p>
                    <p className="mt-2 text-2xl font-bold text-blue-900 sm:text-3xl">
                      {formatWon(result.annualGross)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-5 text-center ring-2 ring-emerald-200">
                    <p className="text-xs font-medium text-emerald-600">
                      예상 월 실수령 (간이)
                    </p>
                    <p className="mt-2 text-2xl font-bold text-emerald-900 sm:text-3xl">
                      {formatWon(result.monthlyNetEstimate)}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-600">주당 근무시간</td>
                    <td className="px-4 py-3 text-right text-gray-900">
                      {result.weeklyHours}시간
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-600">월 주휴수당 (추정)</td>
                    <td className="px-4 py-3 text-right text-gray-900">
                      {result.weeklyHolidayEligible
                        ? formatWon(result.weeklyHolidayPay)
                        : "해당 없음"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-600">월 기준 시간</td>
                    <td className="px-4 py-3 text-right text-gray-900">
                      {result.monthlyStandardHours}시간
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-600">4대보험·세금 (간이)</td>
                    <td className="px-4 py-3 text-right text-gray-900">
                      {formatWon(result.monthlyDeductionEstimate)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <PayBreakdownChart result={result} />

            <button
              type="button"
              onClick={handleCopy}
              className="mt-6 w-full rounded-2xl bg-gray-900 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              {copied ? "복사 완료!" : "결과 텍스트 전체 복사"}
            </button>

            <p className="mt-4 text-xs leading-relaxed text-gray-400">
              주휴수당: (주 근무시간 ÷ 40) × 8 × 시급 · 월 환산 시 주
              {WEEKS_PER_MONTH.toFixed(2)}배 적용. 4대보험·세금은 간이 추정치입니다.
              정확한 세후 금액은{" "}
              <a href="https://tax.ehfrhfo.com" className="text-blue-600 hover:underline">
                tax.ehfrhfo.com
              </a>{" "}
              계산기를 이용하세요.
            </p>
          </section>
        )}
      </main>

      <footer className="mx-auto max-w-4xl px-4 py-10 text-center">
        <nav className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
          <a href="/" className="text-gray-500 hover:text-gray-700">
            홈
          </a>
          <a href="/hourly" className="text-gray-500 hover:text-gray-700">
            시급 계산기
          </a>
          <a href="/annual" className="text-gray-500 hover:text-gray-700">
            연봉 계산기
          </a>
          <a href="/minimum-wage" className="text-gray-500 hover:text-gray-700">
            최저시급
          </a>
          <a href="/part-time" className="text-gray-500 hover:text-gray-700">
            알바 계산기
          </a>
          <a href="/blog" className="text-gray-500 hover:text-gray-700">
            시급·연봉 가이드
          </a>
        </nav>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
