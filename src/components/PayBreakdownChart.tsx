import { formatWon, type PayResult } from "@/lib/payCalculator";

type PayBreakdownChartProps = {
  result: PayResult;
};

export default function PayBreakdownChart({ result }: PayBreakdownChartProps) {
  const gross = result.monthlyGross;
  const net = result.monthlyNetEstimate;
  const deduction = result.monthlyDeductionEstimate;
  const holiday = result.weeklyHolidayPay;
  const base = Math.max(gross - holiday, 0);

  const items = [
    { label: "기본급 (추정)", amount: base, color: "bg-blue-500" },
    ...(holiday > 0
      ? [{ label: "주휴수당", amount: holiday, color: "bg-violet-500" }]
      : []),
    { label: "4대보험·세금", amount: deduction, color: "bg-gray-300" },
    { label: "실수령", amount: net, color: "bg-emerald-500" },
  ].filter((i) => i.amount > 0);

  const max = gross || 1;

  return (
    <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
      <p className="mb-4 text-sm font-medium text-gray-700">월급 구성 (세전·세후)</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex justify-between text-xs text-gray-500">
              <span>{item.label}</span>
              <span>{formatWon(item.amount)}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full ${item.color} transition-all duration-500`}
                style={{ width: `${Math.min(100, (item.amount / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
