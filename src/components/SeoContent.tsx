import MinimumWageInfographic from "@/components/MinimumWageInfographic";
import { faqItems, HOW_TO_STEPS, seoIntroSections } from "@/config/seo";

export default function SeoContent() {
  return (
    <article
      className="border-t border-gray-200 bg-gray-100/80"
      aria-label="시급·연봉 계산기 안내"
    >
      <div className="mx-auto max-w-4xl px-4 py-12">
        <section className="mb-10 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            3초 사용법
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {HOW_TO_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-gray-50 p-4 text-center"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                  {item.step}
                </span>
                <p className="mt-3 text-sm font-medium text-gray-900">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {seoIntroSections.map((section) => (
          <section key={section.title} className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              {section.title}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">{section.body}</p>
          </section>
        ))}

        <MinimumWageInfographic />

        <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            자주 묻는 질문 (FAQ)
          </h2>
          <dl className="space-y-5">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="border-b border-gray-100 pb-5 last:border-0 last:pb-0"
              >
                <dt className="mb-2 font-medium text-gray-900">{item.question}</dt>
                <dd className="text-sm leading-relaxed text-gray-600">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </article>
  );
}
