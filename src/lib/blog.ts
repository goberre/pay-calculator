import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  image: string;
  readTime: number;
  calculatorHref: string;
  calculatorLabel: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const CATEGORY_DEFAULTS: Record<
  string,
  { calculatorHref: string; calculatorLabel: string }
> = {
  시급: { calculatorHref: "/hourly", calculatorLabel: "시급 계산기" },
  연봉환산: { calculatorHref: "/annual", calculatorLabel: "연봉 계산기" },
  주휴수당: { calculatorHref: "/part-time", calculatorLabel: "알바 계산기" },
  알바: { calculatorHref: "/part-time", calculatorLabel: "알바 계산기" },
  최저임금: { calculatorHref: "/minimum-wage", calculatorLabel: "최저시급 계산기" },
};

function estimateReadTime(content: string): number {
  const chars = content.replace(/\s+/g, "").length;
  return Math.max(3, Math.ceil(chars / 450));
}

function parseMeta(slug: string, raw: string): BlogPostMeta {
  const { data, content } = matter(raw);
  const category = String(data.category);
  const defaults = CATEGORY_DEFAULTS[category] ?? CATEGORY_DEFAULTS["시급"];

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    category,
    keywords: Array.isArray(data.keywords)
      ? data.keywords.map(String)
      : [],
    image: String(data.image ?? `/blog/${slug}-info.svg`),
    readTime: Number(data.readTime) || estimateReadTime(content),
    calculatorHref: String(data.calculatorHref ?? defaults.calculatorHref),
    calculatorLabel: String(data.calculatorLabel ?? defaults.calculatorLabel),
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      return parseMeta(slug, raw);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  return { ...parseMeta(slug, raw), content };
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function formatBlogDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${year}.${month}.${day}`;
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return getAllPosts().slice(0, limit);

  const sameCategory = getAllPosts().filter(
    (post) => post.slug !== slug && post.category === current.category,
  );
  const others = getAllPosts().filter(
    (post) => post.slug !== slug && post.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}
