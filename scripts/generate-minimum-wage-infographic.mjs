import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "minimum-wage-history.svg");

const DATA = [
  { year: 2010, hourly: 4110, rate: 2.75 },
  { year: 2011, hourly: 4320, rate: 5.11 },
  { year: 2012, hourly: 4580, rate: 6.02 },
  { year: 2013, hourly: 4860, rate: 6.11 },
  { year: 2014, hourly: 5210, rate: 7.2 },
  { year: 2015, hourly: 5580, rate: 7.1 },
  { year: 2016, hourly: 6030, rate: 8.06 },
  { year: 2017, hourly: 6470, rate: 7.3 },
  { year: 2018, hourly: 7530, rate: 16.38 },
  { year: 2019, hourly: 8350, rate: 10.89 },
  { year: 2020, hourly: 8590, rate: 2.87 },
  { year: 2021, hourly: 8720, rate: 1.51 },
  { year: 2022, hourly: 9160, rate: 5.05 },
  { year: 2023, hourly: 9620, rate: 5.02 },
  { year: 2024, hourly: 9860, rate: 2.49 },
  { year: 2025, hourly: 10030, rate: 1.72 },
  { year: 2026, hourly: 10320, rate: 2.89 },
];

const max = DATA.at(-1).hourly;
const chartLeft = 80;
const chartBottom = 420;
const chartWidth = 880;
const chartHeight = 280;
const barGap = 6;
const barWidth = (chartWidth - barGap * (DATA.length - 1)) / DATA.length;

const bars = DATA.map((d, i) => {
  const h = (d.hourly / max) * chartHeight;
  const x = chartLeft + i * (barWidth + barGap);
  const y = chartBottom - h;
  const isBig = d.rate >= 10;
  const isCurrent = d.year === 2026;
  const fill = isCurrent ? "#2563EB" : isBig ? "#7C3AED" : i >= 10 ? "#60A5FA" : "#9CA3AF";
  const label = d.hourly.toLocaleString("ko-KR");
  const yearShort = String(d.year).slice(2);
  const badge =
    isBig
      ? `<text x="${x + barWidth / 2}" y="${y - 22}" text-anchor="middle" fill="#7C3AED" font-family="system-ui,sans-serif" font-size="11" font-weight="700">+${d.rate}%</text>`
      : isCurrent
        ? `<text x="${x + barWidth / 2}" y="${y - 22}" text-anchor="middle" fill="#2563EB" font-family="system-ui,sans-serif" font-size="11" font-weight="700">현재</text>`
        : "";

  return `
  ${badge}
  <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="4" fill="${fill}"/>
  <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" fill="#374151" font-family="system-ui,sans-serif" font-size="10" font-weight="600">${label}</text>
  <text x="${x + barWidth / 2}" y="${chartBottom + 20}" text-anchor="middle" fill="${isCurrent ? "#2563EB" : "#6B7280"}" font-family="system-ui,sans-serif" font-size="12" font-weight="${isCurrent ? "700" : "500"}">${yearShort}</text>`;
}).join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-label="2010년부터 2026년까지 최저시급 변화">
  <rect width="960" height="540" rx="24" fill="#EFF6FF"/>
  <rect x="32" y="32" width="896" height="476" rx="20" fill="#FFFFFF" opacity="0.9"/>
  <rect x="48" y="48" width="864" height="4" rx="2" fill="#3182F6"/>
  <text x="480" y="88" text-anchor="middle" fill="#2563EB" font-family="system-ui,sans-serif" font-size="13" font-weight="600">INFOGRAPHIC</text>
  <text x="480" y="118" text-anchor="middle" fill="#111827" font-family="system-ui,sans-serif" font-size="26" font-weight="700">2010~2026 최저시급 변화</text>
  <text x="480" y="146" text-anchor="middle" fill="#6B7280" font-family="system-ui,sans-serif" font-size="15">최저임금위원회·고용노동부 공식 시급</text>
  <rect x="120" y="168" width="240" height="52" rx="12" fill="#F9FAFB"/>
  <text x="240" y="190" text-anchor="middle" fill="#6B7280" font-family="system-ui,sans-serif" font-size="12">2010년</text>
  <text x="240" y="212" text-anchor="middle" fill="#111827" font-family="system-ui,sans-serif" font-size="18" font-weight="700">4,110원</text>
  <rect x="360" y="168" width="240" height="52" rx="12" fill="#DBEAFE"/>
  <text x="480" y="190" text-anchor="middle" fill="#2563EB" font-family="system-ui,sans-serif" font-size="12">16년간 상승</text>
  <text x="480" y="212" text-anchor="middle" fill="#1D4ED8" font-family="system-ui,sans-serif" font-size="18" font-weight="700">2.5배 · +151%</text>
  <rect x="600" y="168" width="240" height="52" rx="12" fill="#EFF6FF"/>
  <text x="720" y="190" text-anchor="middle" fill="#2563EB" font-family="system-ui,sans-serif" font-size="12">2026년</text>
  <text x="720" y="212" text-anchor="middle" fill="#1D4ED8" font-family="system-ui,sans-serif" font-size="18" font-weight="700">10,320원</text>
  <line x1="${chartLeft}" y1="${chartBottom}" x2="${chartLeft + chartWidth}" y2="${chartBottom}" stroke="#E5E7EB" stroke-width="1"/>
${bars}
  <text x="480" y="510" text-anchor="middle" fill="#9CA3AF" font-family="system-ui,sans-serif" font-size="14">pay.ehfrhfo.com · 2018·2019 10%↑ 급등 구간 보라색</text>
</svg>`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, svg.trim() + "\n");
console.log(`Wrote ${OUT}`);
