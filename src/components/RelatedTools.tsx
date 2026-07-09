import Link from "next/link";

const TOOLS = [
  {
    href: "https://tax.brand.com",
    name: "종합소득세·4대보험 계산기",
    desc: "세후 실수령액 정밀 계산",
    emoji: "🧾",
  },
  {
    href: "https://tax.brand.com/freelancer",
    name: "프리랜서 3.3% 계산기",
    desc: "외주·부업 원천징수",
    emoji: "💼",
  },
  {
    href: "https://tax.brand.com/employee",
    name: "직장인 연봉 계산기",
    desc: "4대보험·연말정산 추정",
    emoji: "🏢",
  },
] as const;

export default function RelatedTools() {
  return (
    <section
      className="border-t border-gray-200 bg-white"
      aria-label="함께 쓰면 좋은 계산기"
    >
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          함께 쓰면 좋은 계산기
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          시급·연봉 변환 후, 정확한 세후 금액은 세금 계산기에서 확인하세요.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-gray-200/80 bg-gray-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm"
            >
              <span className="text-2xl">{tool.emoji}</span>
              <p className="mt-2 text-sm font-medium text-gray-900">{tool.name}</p>
              <p className="mt-1 text-xs text-gray-500">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
