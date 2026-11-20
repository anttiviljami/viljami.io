---
title: "OpenAPI Stack joins the GitHub Secure Open Source Fund"
date: "2026-11-20"
description: "Three weeks with GitHub Security Lab: 1005 Dependabot alerts down to 0, six security advisories patched, a written threat model and CodeQL packs for your own code."
tags: ["open-source", "security", "openapi", "github"]
slug: "openapi-stack-joins-the-github-secure-open-source-fund"
image: "/assets/covers/openapi-stack-joins-the-github-secure-open-source-fund.webp"
imageAlt: "openapi-stack and the GitHub Secure Open Source Fund"
---

openapi-stack is a set of open source libraries for building and consuming REST APIs straight from an OpenAPI definition: openapi-backend, openapi-client-axios, openapicmd and a few smaller ones. They're [used by teams at](https://openapistack.co/users/) Microsoft, GitHub, IBM, Red Hat, SAP, AWS, Notion, Intel and Fastly. Those are only the ones I can see in public. Most of the usage is on the critical path of APIs inside products and companies I'll never see.

I started it in 2018 and still do most of the maintaining, with engineering time from [epilot](https://opensource.epilot.cloud), where the libraries run in production. That works fine for features. For issues that didn't affect epilot, the maintenance ran on whatever time was left.

This autumn openapi-stack was part of Session 5 of the [GitHub Secure Open Source Fund](https://github.com/open-source/github-secure-open-source-fund): three weeks with GitHub Security Lab and a cohort of other maintainers, doing nothing but security. This week GitHub [named the alumni](https://github.blog/open-source/maintainers/maintainers-dont-need-more-ai-bug-reports-they-need-fixes/) in a post titled "Maintainers don't need more AI bug reports. They need fixes."

## TL;DR;

- Dependabot alerts: 1005 → 0
- Six security advisories published and patched: five in [openapi-backend](https://github.com/openapistack/openapi-backend/security/advisories), one in [openapi-client-axios](https://github.com/openapistack/openapi-client-axios/security/advisories)
- A written [threat model](https://github.com/openapistack/openapi-backend/blob/main/docs/threat-model.md)
- A [Security Best Practices](https://openapistack.co/docs/openapi-backend/security/) guide and [CodeQL packs](https://github.com/openapistack/openapi-backend-codeql) that check your code against it
- An [SBOM](https://github.com/openapistack/openapi-backend/releases/latest), license notices, provenance and reproducible builds
- An honest [SECURITY.md](https://github.com/openapistack/openapi-backend/blob/main/SECURITY.md) with an incident response plan

## 1005 alerts nobody was reading

On the first evening of the program, the security tab of openapi-backend said **1005** open Dependabot vulnerabilities. I had given up on that list a long time ago.

Almost none of it was the library. openapi-backend has an example project per framework, each with its own lockfile, and Dependabot dutifully reported every stale dependency in every one of them.

So I asked in the program Slack: "Any dependabot experts here?" Nine replies later the fix was obvious. The examples moved to their own branch, CI still tests every release against them, and the real updates got merged. Three days later the count was 1. Today it's 0.

An alert list nobody reads protects nobody. With 1005 alerts on the tab, the one that actually mattered would have been invisible.

## What does openapi-backend actually promise?

The most valuable thing I wrote in three weeks is the [threat model](https://github.com/openapistack/openapi-backend/blob/main/docs/threat-model.md).

Before the program it lived in my head, and every security report turned into an argument about what the library is supposed to do. Reporters said vulnerability. I said documented behaviour. We were both partly right, and there was no document to settle it.

Now there is. Where the trust boundary is, what the library guarantees, what it leaves to your framework and what gets reported often but isn't a bug. SECURITY.md asks reporters to name the guarantee their finding breaks. Triage becomes citing a section instead of arguing.

GitHub's post asks anyone sending AI-assisted reports to check every finding against the project's threat model and security policy first. That only works if the project has written them down.

## The fix had a bug

As part of the program, GitHub Security Lab ran an AI-assisted security audit on the code. It found three things. The one that stung: a hole in an auth fix I had shipped earlier this year. A security handler that did `throw null` still counted as a pass.

Same corner of the code. Same class of bug. Third time this year.

The reason is boring. I had plenty of tests for what should pass and not nearly enough for what must not. AI doesn't get bored listing every weird way a function can fail. I do.

The reports arrived privately on a Monday. All three were fixed and published on Tuesday. GitHub's post quotes a Netty maintainer: "Finding vulnerabilities is no longer our bottleneck. Fixing them is the hard part, and that depends on maintainers." Same here. The audit found the bugs. The fix, a test for every weird failure mode, the release and the advisories were still on me.

## Nobody reads the security page

The most common way an API built on openapi-backend ends up insecure is how the library gets wired up. Security handlers registered, nothing registered to reject failed auth, and the operation handler runs anyway. It's documented. Nobody reads the security page until after the incident.

So I wrote [openapi-backend-codeql](https://github.com/openapistack/openapi-backend-codeql): CodeQL packs that find those setups in your code scanning results. An alert in your pull request is a todo. Docs are a suggestion.

My favourite part is the models pack. openapi-backend builds the request object inside `node_modules`, where CodeQL doesn't look, so its built-in SQL injection and XSS queries had no idea your handler input comes from the client. Now they do.

```yaml
- uses: github/codeql-action/init@v4
  with:
    languages: javascript-typescript
    packs: |
      openapistack/openapi-backend-queries
      openapistack/openapi-backend-models
```

## A security policy for one person

[SECURITY.md](https://github.com/openapistack/openapi-backend/blob/main/SECURITY.md) now opens with: "openapi-backend has a single maintainer: me, in my spare time. There is no security team, no bug bounty and no SLA."

The incident response plan is sized for the project it is. Six steps one person can actually execute, and exactly one hard promise: a confirmed malicious version gets deprecated within 24 hours.

The threat model also names the biggest residual risk: one person holds both GitHub admin and npm publish rights. Writing that down is uncomfortable. It's also true, and you should know it before you depend on the library.

## What's next

openapi-backend went first because it sits on the auth path. Next I'm applying what I learned to every library in openapi-stack, starting with openapi-client-axios and openapicmd. The program comes with check-ins at 6 and 12 months, so there's a deadline on that. Good.

Lenient by default was a design choice I made in 2018. For auth, it was the wrong one. Until that changes: upgrade to the latest 5.x, set `strict: true` and read the [Security Best Practices](https://openapistack.co/docs/openapi-backend/security/) guide.

## Thanks

To Gregg Cochran and the GitHub Secure Open Source Fund team for running a program this well. To the GitHub Security Lab experts for the findings that stung the most and for the CodeQL help. To the Session 5 maintainers, who answered a Dependabot question on kickoff day like it was the most normal thing in the world.

Security is quality. It's not a specialist's job and it's not a phase.

Maintaining something people depend on? [Apply for the next session](https://github.com/open-source/github-secure-open-source-fund).

Happy OSS Hacking!

Viljami
