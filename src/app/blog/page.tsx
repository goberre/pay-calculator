import Link from "next/link";
import BlogInfographic from "@/components/BlogInfographic";
import { buildBlogListJsonLd } from "@/lib/blogJsonLd";
import { formatBlogDate, getAllPosts } from "@/lib/blog";
import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "시급·연봉 가이드 | 주휴수당·최저임금 정보",
  description:
    "2026년 시급, 연봉, 주휴수당, 최저임금, 알바 월급 관련 정보를 정리한 가이드입니다.",
  keywords: [
    "시급 가이드",
    "연봉 환산",
    "주휴수당 정보",
    "최저임금 정보",
    "알바 월급",
    ...seoConfig.keywords.slice(0, 5),
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    url: `${siteConfig.url}/blog`,
    siteName: seoConfig.siteName,
    title: "시급·연봉 가이드",
    description:
      "2026년 시급, 연봉, 주휴수당, 최저임금 관련 정보",
    images: [{ url: seoConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "시급·연봉 가이드",
    description:
      "2026년 시급, 연봉, 주휴수당, 최저임금 관련 정보",
    images: [seoConfig.ogImage],
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  시급: "bg-blue-100 text-blue-700",
  연봉환산: "bg-indigo-100 text-indigo-700",
  주휴수당: "bg-emerald-100 text-emerald-700",
  알바: "bg-violet-100 text-violet-700",
  최저임금: "bg-amber-100 text-amber-700",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const jsonLd = buildBlogListJsonLd(posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200/80 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-8">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              ← 계산기로 돌아가기
            </Link>
            <h1 className="mt-4 text-2xl font-semibold text-gray-900">
              시급·연봉 가이드
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {siteConfig.name} · 총 {posts.length}편
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition hover:shadow-md"
              >
                <BlogInfographic
                  src={post.image}
                  alt={post.title}
                  className="h-40 w-full object-cover object-top"
                />
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        CATEGORY_COLORS[post.category] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatBlogDate(post.date)} · {post.readTime}분
                    </span>
                  </div>
                  <h2 className="line-clamp-2 text-base font-semibold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
