# [viljami.io](https://viljami.io)

![CI](https://github.com/anttiviljami/personal-website/workflows/CI/badge.svg)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/anttiviljami/blob/master/LICENSE)

Company site for **Viljami.io / MRR Copilot Oy**. Viljami Kuosmanen's consulting, advisory, and speaking practice. [https://viljami.io](https://viljami.io)

Plain HTML + CSS, no build step. Auto dark/light via `prefers-color-scheme`.

## Develop

```sh
npm install
npm start
# → http://localhost:5173
```

## Deploy

The `public/` directory is the deploy artifact. CI publishes it to GitHub Pages on every push to `master` (see `.github/workflows/ci.yml`). DNS for `viljami.io` points to the Pages site.

The original AWS S3 + CloudFront infrastructure (`terraform.tf`) is retained for reference but is no longer the active deploy target.

## Layout

```
public/
├── index.html        ← main page
├── impressum.html    ← legal info (MRR Copilot Oy)
├── style.css
├── serve.json        ← local dev config for `serve`
└── assets/
    ├── favicon.svg / favicon.png
    ├── checklist-cover.jpg
    ├── resume.pdf
    └── portfolio.pdf
```

## Legal

Operated by **MRR Copilot Oy** · VAT-ID FI35240143 · Liisantie 2 A, 36200 Kangasala, Finland.
