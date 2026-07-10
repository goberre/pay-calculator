import Link from "next/link";
import { notFound } from "next/navigation";
import BlogInfographic from "@/components/BlogInfographic";
import BlogPostBody from "@/components/BlogPostBody";
import { buildArticleJsonLd } from "@/lib/blogJsonLd";
import {
  formatBlogDate,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${siteConfig.url}${post.image}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  시급: "bg-blue-100 text-blue-700",
  연봉환산: "bg-indigo-100 text-indigo-700",
  주휴수당: "bg-emerald-100 text-emerald-700",
  알바: "bg-violet-100 text-violet-700",
  최저임금: "bg-amber-100 text-amber-700",
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = buildArticleJsonLd(post);
  const related = getRelatedPosts(slug, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200/80 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-8">
            <nav className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-400">
              <Link href="/" className="hover:text-blue-600">
                홈
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600">
                가이드
              </Link>
            </nav>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {post.category}
              </span>
              <time dateTime={post.date} className="text-xs text-gray-400">
                {formatBlogDate(post.date)}
              </time>
              <span className="text-xs text-gray-400">
                · {post.readTime}분 읽기
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold leading-snug text-gray-900 sm:text-3xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              {post.description}
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-8">
          <figure className="mb-6 overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm">
            <BlogInfographic
              src={post.image}
              alt={`${post.title} 인포그래픽`}
              className="h-auto w-full"
              priority
            />
          </figure>

          <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
            <BlogPostBody content={post.content} />

            <div className="mt-10 rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-900">
                직접 계산해 보세요
              </p>
              <p className="mt-1 text-xs text-blue-700">
                이 글과 연결된 계산기에서 시급·연봉을 바로 확인할 수 있습니다.
              </p>
              <Link
                href={post.calculatorHref}
                className="mt-3 inline-flex rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
              >
                {post.calculatorLabel} →
              </Link>
            </div>
          </article>

          {related.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                관련 글 더 보기
              </h2>
              <ul className="grid gap-3 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="block overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition hover:shadow-sm"
                    >
                      <BlogInfographic
                        src={item.image}
                        alt={item.title}
                        className="h-28 w-full object-cover object-top"
                      />
                      <div className="p-3">
                        <p className="line-clamp-2 text-sm font-medium text-gray-800">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
