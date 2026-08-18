#!/usr/bin/env node
// Generates public/feed/** from content/feed/*.md
// Run: npm run build:feed
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { Feed } from "feed";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT_DIR = join(ROOT, "content/feed");
const OUT_DIR = join(ROOT, "public/feed");
const SITE_URL = "https://viljami.io";
const BUTTONDOWN_USERNAME = "viljami";

marked.use(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);
marked.setOptions({ headerIds: false, mangle: false });

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const formatDate = (isoDate) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

// dev.to Liquid tag -> real X/Twitter embed (rendered client-side by widgets.js)
const TWITTER_EMBED_RE = /\{%\s*twitter\s+(\d+)\s*%\}/g;

const preprocessEmbeds = (markdown) => {
  let hasTwitter = false;
  const content = markdown.replace(TWITTER_EMBED_RE, (_, id) => {
    hasTwitter = true;
    return `\n\n<blockquote class="twitter-tweet"><a href="https://twitter.com/x/status/${id}"></a></blockquote>\n\n`;
  });
  return { content, hasTwitter };
};

const loadPosts = () => {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = readFileSync(join(CONTENT_DIR, file), "utf8");
    const { data, content: rawContent } = matter(raw);
    const { content, hasTwitter } = preprocessEmbeds(rawContent);
    return {
      ...data,
      html: marked.parse(content),
      hasTwitter,
      url: `${SITE_URL}/feed/${data.slug}/`,
    };
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
};

const subscribeForm = ({ compact = false } = {}) => `
    <section class="subscribe${compact ? " subscribe--compact" : ""}" id="subscribe">
      ${compact ? "" : "<h2>Get new posts by email</h2><p>No spam, unsubscribe anytime. One email per post.</p>"}
      <form action="https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}"
        method="post" class="subscribe__form">
        <input type="email" name="email" placeholder="Type your email&hellip;" required aria-label="Email address" />
        <button type="submit" class="btn btn-primary">Subscribe</button>
      </form>
    </section>`;

const layout = ({
  title,
  description,
  canonicalPath,
  ogType = "website",
  body,
  hasTwitter = false,
  image,
}) => `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="theme-color" content="#0e0f12" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#fafaf7" media="(prefers-color-scheme: light)" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:url" content="${SITE_URL}${canonicalPath}" />
  ${image ? `<meta property="og:image" content="${SITE_URL}${image}" />` : ""}
  <link rel="canonical" href="${SITE_URL}${canonicalPath}" />
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <link rel="alternate icon" href="/assets/favicon.png" type="image/png" />
  <link rel="alternate" type="application/rss+xml" title="Viljami Kuosmanen &mdash; Feed" href="${SITE_URL}/feed/rss.xml" />
  <link rel="stylesheet" href="/style.css" />
</head>

<body>
${body}
${hasTwitter ? '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' : ""}
</body>

</html>
`;

const renderIndex = (posts) => {
  const items = posts
    .map(
      (p) => `
      <li class="post-list__item">
        <a class="post-list__link" href="/feed/${p.slug}/">
          <span class="post-list__date">${formatDate(p.date)}</span>
          <span class="post-list__title">${escapeHtml(p.title)}</span>
          <p class="post-list__desc">${escapeHtml(p.description || "")}</p>
        </a>
      </li>`
    )
    .join("\n");

  const body = `
  <main class="feed-page">
    <header class="feed-hero">
      <a class="feed-hero__avatar-link" href="/" aria-label="Viljami.io">
        <img class="feed-hero__avatar" src="/assets/viljami.jpg" alt="Viljami Kuosmanen" width="72" height="72" />
      </a>
      <p class="feed-hero__name">Viljami Kuosmanen</p>
      <p class="feed-hero__bio">
        <strong>Distinguished Engineer</strong> at <a href="https://www.epilot.cloud" target="_blank" rel="noopener">epilot.cloud</a>.
        Maintainer of <a href="https://openapistack.co" target="_blank" rel="noopener">openapistack.co</a>, used by AWS, GitHub, IBM, Intel, and SAP.
        Author of the <a href="https://productengineer.org" target="_blank" rel="noopener">Product Engineer Manifesto</a>.
        Writes about product engineering, AI-augmented teams, and running an engineering org from the inside.
      </p>

      <hr class="feed-hero__divider" />

      <p class="feed-hero__subscribe-label">
        Subscribe to get future posts via email (or grab the <a href="/feed/rss.xml">RSS feed</a>)
      </p>
      ${subscribeForm({ compact: true })}
    </header>

    <ul class="post-list">${items}</ul>

    <footer class="impressum">
      <p><a href="/">&larr; Back to viljami.io</a></p>
    </footer>
  </main>`;

  return layout({
    title: "Writing — Viljami Kuosmanen",
    description:
      "Essays on product engineering, AI-augmented software teams, and running engineering orgs, by Viljami Kuosmanen.",
    canonicalPath: "/feed/",
    body,
  });
};

const renderPost = (post) => {
  const cover = post.image
    ? `
    <figure class="post__cover">
      <img src="${post.image}" alt="${escapeHtml(post.imageAlt || "")}" />
      ${post.imageAlt ? `<figcaption>${escapeHtml(post.imageAlt)}</figcaption>` : ""}
    </figure>`
    : "";

  const body = `
  <main class="card feed-card post">
    <header class="hero">
      <p class="eyebrow"><a href="/feed/">&larr; Viljami.io / Feed</a></p>
      <h1>${escapeHtml(post.title)}</h1>
      <p class="title">${formatDate(post.date)}</p>
    </header>
${cover}
    <article class="post__body">
${post.html}
    </article>

    <hr class="feed-hero__divider" />
    <p class="feed-hero__subscribe-label">
      Subscribe to get future posts via email (or grab the <a href="/feed/rss.xml">RSS feed</a>)
    </p>
    ${subscribeForm({ compact: true })}
  </main>

  <footer class="impressum">
    <p><a href="/feed/">&larr; All posts</a></p>
  </footer>`;

  return layout({
    title: `${post.title} — Viljami Kuosmanen`,
    description: post.description || post.title,
    canonicalPath: `/feed/${post.slug}/`,
    ogType: "article",
    hasTwitter: post.hasTwitter,
    image: post.image,
    body,
  });
};

const renderRss = (posts) => {
  const feed = new Feed({
    title: "Viljami Kuosmanen — Writing",
    description:
      "Essays on product engineering, AI-augmented software teams, and running engineering orgs.",
    id: `${SITE_URL}/feed/`,
    link: `${SITE_URL}/feed/`,
    language: "en",
    favicon: `${SITE_URL}/assets/favicon.png`,
    copyright: `All rights reserved ${new Date(posts[0]?.date ?? "2026-01-01").getUTCFullYear()}, Viljami Kuosmanen`,
    feedLinks: { rss: `${SITE_URL}/feed/rss.xml` },
    author: { name: "Viljami Kuosmanen", link: SITE_URL },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      content: post.html,
      date: new Date(`${post.date}T00:00:00Z`),
    });
  }

  return feed.rss2();
};

const build = () => {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const posts = loadPosts();

  writeFileSync(join(OUT_DIR, "index.html"), renderIndex(posts));
  writeFileSync(join(OUT_DIR, "rss.xml"), renderRss(posts));

  for (const post of posts) {
    const dir = join(OUT_DIR, post.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), renderPost(post));
  }

  console.log(`Built ${posts.length} posts -> ${OUT_DIR}`);
};

build();
