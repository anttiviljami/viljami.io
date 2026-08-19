#!/usr/bin/env node
// Generates public/sitemap.xml from static pages + content/feed/*.md
// Run: npm run build:sitemap
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT_DIR = join(ROOT, "content/feed");
const PUBLIC_DIR = join(ROOT, "public");
const SITE_URL = "https://viljami.io";

const isoDate = (date) => new Date(date).toISOString().slice(0, 10);

const mtimeOf = (path) => isoDate(statSync(path).mtime);

const staticPages = [
  { path: "/", file: join(PUBLIC_DIR, "index.html") },
  { path: "/impressum.html", file: join(PUBLIC_DIR, "impressum.html") },
  { path: "/feed/", file: join(PUBLIC_DIR, "feed/index.html") },
];

const loadPostUrls = () => {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const raw = readFileSync(join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    return { path: `/feed/${data.slug}/`, lastmod: isoDate(data.date) };
  });
};

const build = () => {
  const urls = [
    ...staticPages.map((p) => ({ path: p.path, lastmod: mtimeOf(p.file) })),
    ...loadPostUrls(),
  ];

  const body = urls
    .map(
      ({ path, lastmod }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), xml);
  console.log(`Built sitemap with ${urls.length} URLs -> public/sitemap.xml`);
};

build();
