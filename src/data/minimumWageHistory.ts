/** 최저임금위원회·고용노동부 공식 시급 (2010~2026) */
export type MinimumWageRecord = {
  year: number;
  hourly: number;
  /** 전년 대비 인상률(%) — 최저임금위원회 고시 기준 */
  increaseRate: number | null;
  /** 월 209시간 기준 (고시 월급) */
  monthly209: number;
};

export const MINIMUM_WAGE_HISTORY: MinimumWageRecord[] = [
  { year: 2010, hourly: 4_110, increaseRate: 2.75, monthly209: 858_990 },
  { year: 2011, hourly: 4_320, increaseRate: 5.11, monthly209: 902_880 },
  { year: 2012, hourly: 4_580, increaseRate: 6.02, monthly209: 957_220 },
  { year: 2013, hourly: 4_860, increaseRate: 6.11, monthly209: 1_015_740 },
  { year: 2014, hourly: 5_210, increaseRate: 7.2, monthly209: 1_088_890 },
  { year: 2015, hourly: 5_580, increaseRate: 7.1, monthly209: 1_166_220 },
  { year: 2016, hourly: 6_030, increaseRate: 8.06, monthly209: 1_260_270 },
  { year: 2017, hourly: 6_470, increaseRate: 7.3, monthly209: 1_352_230 },
  { year: 2018, hourly: 7_530, increaseRate: 16.38, monthly209: 1_573_770 },
  { year: 2019, hourly: 8_350, increaseRate: 10.89, monthly209: 1_745_150 },
  { year: 2020, hourly: 8_590, increaseRate: 2.87, monthly209: 1_795_310 },
  { year: 2021, hourly: 8_720, increaseRate: 1.51, monthly209: 1_822_480 },
  { year: 2022, hourly: 9_160, increaseRate: 5.05, monthly209: 1_914_440 },
  { year: 2023, hourly: 9_620, increaseRate: 5.02, monthly209: 2_010_580 },
  { year: 2024, hourly: 9_860, increaseRate: 2.49, monthly209: 2_060_740 },
  { year: 2025, hourly: 10_030, increaseRate: 1.72, monthly209: 2_096_270 },
  { year: 2026, hourly: 10_320, increaseRate: 2.89, monthly209: 2_156_880 },
];

export const MIN_WAGE_FIRST = MINIMUM_WAGE_HISTORY[0];
export const MIN_WAGE_LATEST = MINIMUM_WAGE_HISTORY[MINIMUM_WAGE_HISTORY.length - 1];

export function formatMinimumWage(amount: number): string {
  return amount.toLocaleString("ko-KR");
}
