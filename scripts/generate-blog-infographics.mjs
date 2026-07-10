import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "blog");

const STYLE = {
  시급: { accent: "#3182F6", soft: "#DBEAFE", bg: "#EFF6FF" },
  연봉환산: { accent: "#4F46E5", soft: "#E0E7FF", bg: "#EEF2FF" },
  주휴수당: { accent: "#059669", soft: "#D1FAE5", bg: "#ECFDF5" },
  알바: { accent: "#7C3AED", soft: "#EDE9FE", bg: "#F5F3FF" },
  최저임금: { accent: "#D97706", soft: "#FEF3C7", bg: "#FFFBEB" },
};

function esc(t) {
  return String(t)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrap(title, category, body) {
  const s = STYLE[category] || STYLE["시급"];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
  <rect width="960" height="540" rx="24" fill="${s.bg}"/>
  <rect x="32" y="32" width="896" height="476" rx="20" fill="#FFFFFF" opacity="0.85"/>
  <rect x="48" y="48" width="864" height="4" rx="2" fill="${s.accent}"/>
  <text x="480" y="92" text-anchor="middle" fill="${s.accent}" font-family="system-ui,sans-serif" font-size="24" font-weight="700">${esc(title)}</text>
${body}
  <text x="480" y="510" text-anchor="middle" fill="#9CA3AF" font-family="system-ui,sans-serif" font-size="16">pay.ehfrhfo.com · 2026</text>
</svg>`;
}

function row(y, label, value, accent, soft, bold = false) {
  const fw = bold ? "700" : "600";
  const fs = bold ? "24" : "20";
  return `  <rect x="64" y="${y}" width="832" height="56" rx="12" fill="#FFFFFF" stroke="${soft}"/>
  <text x="96" y="${y + 36}" fill="#374151" font-family="system-ui,sans-serif" font-size="20" font-weight="600">${esc(label)}</text>
  <text x="864" y="${y + 36}" text-anchor="end" fill="${accent}" font-family="system-ui,sans-serif" font-size="${fs}" font-weight="${fw}">${esc(value)}</text>`;
}

const INFOGRAPHICS = [
  {
    slug: "minimum-wage-2026-hourly",
    category: "최저임금",
    title: "2026 최저시급 10,320원 환산",
    body: `
  <rect x="64" y="120" width="832" height="52" rx="12" fill="#D97706"/>
  <text x="480" y="154" text-anchor="middle" fill="#FFF" font-family="system-ui,sans-serif" font-size="22" font-weight="700">시급 10,320원 · 주 40h · 주휴 포함</text>
${row(188, "월급 (세전)", "약 215만원", "#D97706", "#FEF3C7", true)}
${row(246, "연봉 (세전)", "약 2,580만원", "#D97706", "#FEF3C7")}
${row(304, "실수령 (간이)", "약 190~200만", "#B45309", "#FEF3C7")}
${row(362, "위반 기준", "10,320원 미만", "#92400E", "#FEF3C7", true)}`,
  },
  {
    slug: "hourly-to-annual-salary",
    category: "연봉환산",
    title: "시급 1만원 → 연봉 환산",
    body: `
${row(120, "시급", "10,000원", "#4F46E5", "#E0E7FF", true)}
${row(178, "월 209시간 기준", "월 209만원", "#4F46E5", "#E0E7FF")}
${row(236, "연봉 (세전)", "약 2,508만원", "#4F46E5", "#E0E7FF", true)}
${row(294, "주 40h + 주휴 8h", "× 4.345주/월", "#4338CA", "#E0E7FF")}
${row(352, "역산 공식", "연봉÷12÷209=시급", "#3730A3", "#E0E7FF")}`,
  },
  {
    slug: "weekly-holiday-pay-guide",
    category: "주휴수당",
    title: "주휴수당 계산 공식",
    body: `
${row(120, "조건", "주 15시간+ · 개근", "#059669", "#D1FAE5", true)}
${row(178, "공식", "(주근무÷40)×8×시급", "#059669", "#D1FAE5")}
${row(236, "예: 주 20h", "시급1만 → 주휴 4만", "#059669", "#D1FAE5")}
${row(294, "월 환산", "× 4.345주", "#047857", "#D1FAE5")}
${row(352, "미지급 시", "임금체불 신고 가능", "#065F46", "#D1FAE5", true)}`,
  },
  {
    slug: "part-time-20-hours-monthly",
    category: "알바",
    title: "주 20시간 알바 월급",
    body: `
  <rect x="64" y="120" width="832" height="52" rx="12" fill="#7C3AED"/>
  <text x="480" y="154" text-anchor="middle" fill="#FFF" font-family="system-ui,sans-serif" font-size="22" font-weight="700">시급 10,320 · 주 5일 × 4h</text>
${row(188, "주 근무", "20시간", "#7C3AED", "#EDE9FE")}
${row(246, "주휴수당", "약 4.1만/주", "#7C3AED", "#EDE9FE", true)}
${row(304, "월급 (세전)", "약 108만원", "#6D28D9", "#EDE9FE", true)}
${row(362, "연봉 환산", "약 1,300만원", "#5B21B6", "#EDE9FE")}`,
  },
  {
    slug: "salary-40m-hourly-converter",
    category: "연봉환산",
    title: "연봉 4,000만원 → 시급",
    body: `
${row(120, "연봉", "4,000만원", "#4F46E5", "#E0E7FF", true)}
${row(178, "월급 (세전)", "약 333만원", "#4F46E5", "#E0E7FF")}
${row(236, "환산 시급", "약 15,900원", "#4F46E5", "#E0E7FF", true)}
${row(294, "기준", "월 209시간", "#4338CA", "#E0E7FF")}
${row(352, "실수령 (간이)", "약 280~290만", "#3730A3", "#E0E7FF")}`,
  },
  {
    slug: "alba-hourly-real-income",
    category: "알바",
    title: "알바 시급 vs 실수령",
    body: `
  <text x="240" y="130" text-anchor="middle" fill="#7C3AED" font-size="20" font-weight="700">3.3% 원천</text>
  <text x="720" y="130" text-anchor="middle" fill="#3182F6" font-size="20" font-weight="700">4대보험</text>
${row(148, "월 200만 기준", "193만  |  170~180만", "#6366F1", "#EEF2FF")}
${row(206, "적용", "외주·용역  |  근로계약", "#6366F1", "#EEF2FF")}
${row(264, "확인", "계약서·지급명", "#6366F1", "#EEF2FF", true)}
${row(322, "정밀 계산", "tax.ehfrhfo.com", "#4338CA", "#EEF2FF")}
${row(380, "시급 환산", "pay.ehfrhfo.com", "#4338CA", "#EEF2FF")}`,
  },
];

fs.mkdirSync(OUT, { recursive: true });

for (const item of INFOGRAPHICS) {
  const svg = wrap(item.title, item.category, item.body);
  fs.writeFileSync(path.join(OUT, `${item.slug}-info.svg`), svg, "utf8");
  fs.writeFileSync(path.join(OUT, `${item.slug}.svg`), svg, "utf8");
}

console.log(`Generated ${INFOGRAPHICS.length} pay blog infographics.`);
