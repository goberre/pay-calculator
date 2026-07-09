/** 고용노동부 기준 월 소정근로 + 주휴 8시간 포함 약 209시간 */
export const MONTHLY_STANDARD_HOURS = 209;

/** 1개월 평균 주 수 (365 ÷ 7 ÷ 12) */
export const WEEKS_PER_MONTH = 365 / 7 / 12;

export type CalcMode = "hourly" | "annual";

export type HourlyInput = {
  hourlyWage: number;
  hoursPerDay: number;
  daysPerWeek: number;
  includeWeeklyHoliday: boolean;
};

export type AnnualInput = {
  annualSalary: number;
};

export type PayResult = {
  mode: CalcMode;
  hourlyWage: number;
  weeklyHours: number;
  weeklyHolidayPay: number;
  weeklyHolidayEligible: boolean;
  monthlyGross: number;
  annualGross: number;
  monthlyNetEstimate: number;
  monthlyDeductionEstimate: number;
  monthlyStandardHours: number;
};

export function parseAmount(value: string): number {
  const n = Number(value.replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function formatInputValue(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("ko-KR");
}

export function formatWon(amount: number): string {
  return `${Math.round(amount).toLocaleString("ko-KR")}원`;
}

/** 주휴수당: 주 15시간 이상, (주근무/40)×8×시급 */
export function calcWeeklyHolidayPay(
  hourlyWage: number,
  weeklyHours: number,
): number {
  if (weeklyHours < 15) return 0;
  return (weeklyHours / 40) * 8 * hourlyWage;
}

/** 4대보험+소득세 간이 추정 (직장인, 참고용) */
export function estimateMonthlyNet(grossMonthly: number): {
  net: number;
  deduction: number;
} {
  const insurance = grossMonthly * (0.0475 + 0.03595 + 0.03595 * 0.1295 + 0.009);
  const tax = grossMonthly * 0.035;
  const deduction = insurance + tax;
  return {
    deduction,
    net: Math.max(0, grossMonthly - deduction),
  };
}

export function calcFromHourly(input: HourlyInput): PayResult {
  const { hourlyWage, hoursPerDay, daysPerWeek, includeWeeklyHoliday } = input;
  const weeklyHours = hoursPerDay * daysPerWeek;
  const weeklyBase = hourlyWage * weeklyHours;
  const weeklyHolidayEligible = weeklyHours >= 15;
  const weeklyHolidayPay =
    includeWeeklyHoliday && weeklyHolidayEligible
      ? calcWeeklyHolidayPay(hourlyWage, weeklyHours)
      : 0;

  const monthlyGross = (weeklyBase + weeklyHolidayPay) * WEEKS_PER_MONTH;
  const annualGross = monthlyGross * 12;
  const { net, deduction } = estimateMonthlyNet(monthlyGross);

  return {
    mode: "hourly",
    hourlyWage,
    weeklyHours,
    weeklyHolidayPay: weeklyHolidayPay * WEEKS_PER_MONTH,
    weeklyHolidayEligible,
    monthlyGross,
    annualGross,
    monthlyNetEstimate: net,
    monthlyDeductionEstimate: deduction,
    monthlyStandardHours: MONTHLY_STANDARD_HOURS,
  };
}

export function calcFromAnnual(input: AnnualInput): PayResult {
  const { annualSalary } = input;
  const monthlyGross = annualSalary / 12;
  const hourlyWage = annualSalary / (MONTHLY_STANDARD_HOURS * 12);
  const weeklyHours = 40;
  const weeklyHolidayPay = calcWeeklyHolidayPay(hourlyWage, weeklyHours) * WEEKS_PER_MONTH;
  const { net, deduction } = estimateMonthlyNet(monthlyGross);

  return {
    mode: "annual",
    hourlyWage,
    weeklyHours,
    weeklyHolidayPay,
    weeklyHolidayEligible: true,
    monthlyGross,
    annualGross: annualSalary,
    monthlyNetEstimate: net,
    monthlyDeductionEstimate: deduction,
    monthlyStandardHours: MONTHLY_STANDARD_HOURS,
  };
}

export function buildCopyText(result: PayResult): string {
  const lines = [
    "[2026 시급/연봉 변환 결과]",
    `환산 시급: ${formatWon(result.hourlyWage)}`,
    `예상 월급(세전): ${formatWon(result.monthlyGross)}`,
    `예상 연봉(세전): ${formatWon(result.annualGross)}`,
    result.weeklyHolidayEligible
      ? `월 주휴수당(추정): ${formatWon(result.weeklyHolidayPay)}`
      : "주휴수당: 해당 없음 (주 15시간 미만)",
    `예상 월 실수령(간이): ${formatWon(result.monthlyNetEstimate)}`,
    "",
    "※ 간편 추정치이며 실제 급여·세금과 차이가 있을 수 있습니다.",
  ];
  return lines.join("\n");
}
