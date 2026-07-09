import { seoIntroSections } from "@/config/seo";

export default function SeoContent() {
  return (
    <article className="mx-auto max-w-4xl px-4 pb-12">
      {seoIntroSections.map((section) => (
        <section key={section.title} className="mb-8">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            {section.title}
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">{section.body}</p>
        </section>
      ))}
    </article>
  );
}
