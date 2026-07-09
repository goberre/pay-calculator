"use client";

import { useMemo, useState } from "react";
import AdSpace from "@/components/AdSpace";
import Header from "@/components/Header";
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

const MODES: { id: CalcMode; label: string }[] = [
  { id: "hourly", label: "시급을 월급으로" },
  { id: "annual", label: "연봉을 시급으로" },
];

export default function PayCalculatorClient() {
  const [mode, setMode] = useState<CalcMode>("hourly");
  const [hourlyInput, setHourlyInput] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [includeWeeklyHoliday, setIncludeWeeklyHoliday] = useState(true);
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-6">
        <AdSpace type="adsense" />

        <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-gray-600">변환 모드</p>
            <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-1.5 sm:flex-row">
              {MODES.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id)}
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    mode === tab.id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
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
                  placeholder="10,030"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-2xl font-semibold tracking-tight text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
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
              <p className="mt-2 text-xs text-gray-400">
                월 209시간(주 40h + 주휴 8h) 기준으로 시급을 역산합니다.
              </p>
            </div>
          )}
        </section>

        <AdSpace
          type="coupang"
          productKeyword="사무용 모니터 받침대"
        />

        {result && (
          <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-center text-sm font-medium text-gray-500">
              계산 결과
            </h2>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-blue-50 p-5 text-center">
                <p className="text-xs font-medium text-blue-600">환산 시급</p>
                <p className="mt-2 text-2xl font-bold text-blue-900 sm:text-3xl">
                  {formatWon(result.hourlyWage)}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-5 text-center">
                <p className="text-xs font-medium text-gray-500">예상 월급 (세전)</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                  {formatWon(result.monthlyGross)}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-5 text-center">
                <p className="text-xs font-medium text-gray-500">예상 연봉 (세전)</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                  {formatWon(result.annualGross)}
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-5 text-center">
                <p className="text-xs font-medium text-emerald-600">
                  예상 월 실수령 (간이)
                </p>
                <p className="mt-2 text-2xl font-bold text-emerald-900 sm:text-3xl">
                  {formatWon(result.monthlyNetEstimate)}
                </p>
              </div>
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
              <a href="https://tax.brand.com" className="text-blue-600 hover:underline">
                tax.brand.com
              </a>{" "}
              계산기를 이용하세요.
            </p>
          </section>
        )}
      </main>

      <footer className="mx-auto max-w-4xl px-4 py-10 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </footer>
    </div>
  );
}
