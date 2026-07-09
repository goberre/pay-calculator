import {
  formatMinimumWage,
  MIN_WAGE_FIRST,
  MIN_WAGE_LATEST,
  MINIMUM_WAGE_HISTORY,
} from "@/data/minimumWageHistory";

const HIGHLIGHT_YEARS = new Set([2018, 2019, 2026]);

function barTone(year: number, increaseRate: number | null) {
  if (year === MIN_WAGE_LATEST.year) return "from-blue-600 to-blue-500";
  if (increaseRate !== null && increaseRate >= 10) return "from-violet-500 to-violet-400";
  if (year >= 2020) return "from-blue-400 to-blue-300";
  return "from-gray-400 to-gray-300";
}

export default function MinimumWageInfographic() {
  const maxHourly = MIN_WAGE_LATEST.hourly;
  const growthMultiple = (MIN_WAGE_LATEST.hourly / MIN_WAGE_FIRST.hourly).toFixed(1);
  const totalGrowth = (
    ((MIN_WAGE_LATEST.hourly - MIN_WAGE_FIRST.hourly) / MIN_WAGE_FIRST.hourly) *
    100
  ).toFixed(0);

  return (
    <section
      className="mb-10 overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm"
      aria-label="2010년부터 2026년까지 최저시급 변화 인포그래픽"
    >
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
          Infographic
        </p>
        <h2 className="mt-1 text-lg font-semibold text-gray-900 sm:text-xl">
          2010~2026 최저시급 변화
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          최저임금위원회·고용노동부 공식 시급 · 월급은 209시간 기준
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 border-b border-gray-100 bg-gray-50/80 px-6 py-4 sm:grid-cols-3 sm:px-8">
        <div className="text-center sm:text-left">
          <p className="text-xs text-gray-500">2010년</p>
          <p className="mt-0.5 text-sm font-bold text-gray-800 sm:text-base">
            {formatMinimumWage(MIN_WAGE_FIRST.hourly)}원
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">16년간 상승</p>
          <p className="mt-0.5 text-sm font-bold text-blue-600 sm:text-base">
            {growthMultiple}배 · +{totalGrowth}%
          </p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-xs text-gray-500">2026년</p>
          <p className="mt-0.5 text-sm font-bold text-blue-700 sm:text-base">
            {formatMinimumWage(MIN_WAGE_LATEST.hourly)}원
          </p>
        </div>
      </div>

      <div className="overflow-x-auto px-4 py-6 sm:px-6">
        <div className="mx-auto min-w-[720px] max-w-4xl">
          <div className="flex h-56 items-end gap-1.5 sm:gap-2">
            {MINIMUM_WAGE_HISTORY.map((record) => {
              const heightPct = (record.hourly / maxHourly) * 100;
              const isHighlight = HIGHLIGHT_YEARS.has(record.year);
              const bigJump =
                record.increaseRate !== null && record.increaseRate >= 10;

              return (
                <div
                  key={record.year}
                  className="group relative flex flex-1 flex-col items-center"
                >
                  {bigJump && (
                    <span className="mb-1 rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700">
                      +{record.increaseRate}%
                    </span>
                  )}
                  {!bigJump && isHighlight && record.year === 2026 && (
                    <span className="mb-1 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                      현재
                    </span>
                  )}
                  {!bigJump && !isHighlight && (
                    <span className="mb-1 h-[18px]" aria-hidden />
                  )}

                  <div
                    className={`relative w-full rounded-t-lg bg-gradient-to-t ${barTone(record.year, record.increaseRate)} transition-all group-hover:opacity-90`}
                    style={{ height: `${Math.max(heightPct, 8)}%` }}
                    title={`${record.year}년 ${formatMinimumWage(record.hourly)}원`}
                  >
                    <span className="absolute -top-5 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-gray-600 group-hover:block sm:text-xs">
                      {formatMinimumWage(record.hourly)}
                    </span>
                  </div>

                  <p
                    className={`mt-2 text-[10px] font-medium sm:text-xs ${
                      record.year === 2026 ? "text-blue-700" : "text-gray-500"
                    }`}
                  >
                    {String(record.year).slice(2)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-gray-400 to-gray-300" />
              일반 인상
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-violet-500 to-violet-400" />
              10%↑ 급등 (2018·2019)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-blue-600 to-blue-500" />
              2026 현재
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-6 py-5 sm:px-8">
        <p className="mb-3 text-xs font-medium text-gray-500">연도별 상세</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {MINIMUM_WAGE_HISTORY.map((record) => (
            <div
              key={record.year}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                record.year === 2026
                  ? "bg-blue-50 font-medium text-blue-900"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              <span>{record.year}년</span>
              <span>
                시급 {formatMinimumWage(record.hourly)}원
                {record.increaseRate !== null && (
                  <span className="ml-2 text-xs text-gray-400">
                    (+{record.increaseRate}%)
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-gray-400">
          출처: 최저임금위원회 연도별 결정현황, 고용노동부 2026년 최저임금 고시.
          월급은 주 40시간·월 209시간 기준이며, 주휴수당 포함 실수령은 계산기에서
          확인하세요.
        </p>
      </div>
    </section>
  );
}
