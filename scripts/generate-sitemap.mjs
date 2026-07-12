#!/usr/bin/env node
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pay.ehfrhfo.com";
const BLOG_DIR = path.join(process.cwd(), "content/blog");

const STATIC_PATHS = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/hourly", priority: "0.9", changefreq: "weekly" },
  { loc: "/annual", priority: "0.9", changefreq: "weekly" },
  { loc: "/minimum-wage", priority: "0.9", changefreq: "weekly" },
  { loc: "/part-time", priority: "0.9", changefreq: "weekly" },
  { loc: "/blog", priority: "0.8", changefreq: "weekly" },
  { loc: "/privacy", priority: "0.3", changefreq: "yearly" },
];

function getBlogEntries() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      const lastmod = data.date ? new Date(data.date).toISOString().slice(0, 10) : null;
      return { loc: `/blog/${slug}`, lastmod };
    });
}

function buildUrlEntry(loc, priority, changefreq, lastmod) {
  const lines = [`  <url>`, `    <loc>${SITE_URL}${loc === "/" ? "/" : loc}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  lines.push(`    <changefreq>${changefreq}</changefreq>`);
  lines.push(`    <priority>${priority}</priority>`, `  </url>`);
  return lines.join("\n");
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  ...STATIC_PATHS.map((p) => buildUrlEntry(p.loc, p.priority, p.changefreq, today)),
  ...getBlogEntries().map((p) => buildUrlEntry(p.loc, "0.7", "monthly", p.lastmod ?? today)),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), xml);
console.log(`Wrote pay sitemap (${STATIC_PATHS.length + getBlogEntries().length} URLs)`);
