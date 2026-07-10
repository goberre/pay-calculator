import Link from "next/link";
import BlogInfographic from "@/components/BlogInfographic";
import { formatBlogDate, getAllPosts } from "@/lib/blog";

const CATEGORY_COLORS: Record<string, string> = {
  시급: "bg-blue-100 text-blue-700",
  연봉환산: "bg-indigo-100 text-indigo-700",
  주휴수당: "bg-emerald-100 text-emerald-700",
  알바: "bg-violet-100 text-violet-700",
  최저임금: "bg-amber-100 text-amber-700",
};

type BlogSectionProps = {
  limit?: number;
};

export default function BlogSection({ limit = 5 }: BlogSectionProps) {
  const posts = getAllPosts().slice(0, limit);

  if (posts.length === 0) return null;

  return (
    <section
      className="border-t border-gray-200 bg-gray-100/80"
      aria-label="시급·연봉 가이드"
    >
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Blog
            </p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">
              시급·연봉 가이드
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              2026년 시급, 연봉, 주휴수당, 최저임금 관련 정보
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 text-sm font-medium text-blue-600 hover:underline"
          >
            전체 보기 →
          </Link>
        </div>

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
                className="h-36 w-full object-cover object-top"
              />
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      CATEGORY_COLORS[post.category] ??
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatBlogDate(post.date)}
                  </span>
                </div>
                <p className="line-clamp-2 font-medium text-gray-900">
                  {post.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
