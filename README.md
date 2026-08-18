# [viljami.io](https://viljami.io)

![CI](https://github.com/anttiviljami/personal-website/workflows/CI/badge.svg)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/anttiviljami/blob/master/LICENSE)

Company site for **Viljami.io / MRR Copilot Oy**. Viljami Kuosmanen's consulting, advisory, and speaking practice. [https://viljami.io](https://viljami.io)

Plain HTML + CSS, no build step for deploy. Auto dark/light via `prefers-color-scheme`.

The one exception is `/feed` (writing, RSS, email subscribe) — its HTML pages are generated from Markdown by a local build script, then committed as static output like everything else. There is still no build step at deploy time.

## Develop

```sh
npm install
npm start
# → http://localhost:5173
```

## Writing (`/feed`)

Posts live as Markdown + frontmatter in `content/feed/*.md`. To add a new post, create a new file there (see existing ones for the frontmatter shape: `title`, `date`, `description`, `tags`, `slug`, optional `canonical`), then rebuild:

```sh
npm run build:feed
```

This regenerates `public/feed/**` (index, one folder per post, `rss.xml`) from `content/feed/*.md`. Commit both the source Markdown and the generated `public/feed/` output.

Email subscriptions go through [Buttondown](https://buttondown.email) — the subscribe form embedded on every `/feed` page posts to `https://buttondown.email/api/emails/embed-subscribe/<username>`. The username is set in `scripts/build-feed.mjs` (`BUTTONDOWN_USERNAME`); update it once a real Buttondown account exists, then `npm run build:feed` to regenerate. New posts can be cross-posted to the Buttondown newsletter manually, or by pointing Buttondown's RSS-to-email feature at `https://viljami.io/feed/rss.xml` so every new entry goes out automatically.

## Deploy

The `public/` directory is the deploy artifact. CI publishes it to GitHub Pages on every push to `master` (see `.github/workflows/ci.yml`). DNS for `viljami.io` points to the Pages site.

The original AWS S3 + CloudFront infrastructure (`terraform.tf`) is retained for reference but is no longer the active deploy target.

## Layout

```
content/
└── feed/             ← Markdown source posts (frontmatter + body)
scripts/
└── build-feed.mjs    ← generates public/feed/** from content/feed/*.md
public/
├── index.html        ← main page
├── impressum.html    ← legal info (MRR Copilot Oy)
├── style.css
├── serve.json        ← local dev config for `serve`
├── feed/              ← generated: index, rss.xml, one folder per post
└── assets/
    ├── favicon.svg / favicon.png
    ├── checklist-cover.jpg
    ├── resume.pdf
    └── portfolio.pdf
```

## Legal

Operated by **MRR Copilot Oy** · VAT-ID FI35240143 · Liisantie 2 A, 36200 Kangasala, Finland.
