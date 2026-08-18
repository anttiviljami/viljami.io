---
title: "We Made Coding Agents Actually Reliable By Fixing One Thing"
date: "2026-02-04"
description: "Last week, Vercel published research showing that giving coding agents a compact index of your..."
tags: ["ai", "agents", "coding", "documentation"]
canonical: "https://dev.to/epilot/we-made-coding-agents-actually-reliable-by-fixing-one-thing-525b"
slug: "we-made-coding-agents-actually-reliable-by-fixing-one-thing"
---

Last week, Vercel published [research showing that giving coding agents a compact index of your documentation dramatically outperforms letting them search for answers on demand](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals). Their eval results: 100% task success rate with the map approach, versus only 79% when agents had to actively look things up.

Same agent, same tasks, different approach to context. The difference between working and not working.

The insight clicked immediately. If we could give Claude Code reliable access to this institutional knowledge without forcing it to decide when to look things up, it would fundamentally change how people work in our codebase.

So we built it.

## The Context Problem

Coding agents have a token limit. A ceiling on how much information they can process at once. Think of it like working memory. You can't hand Claude Code your entire codebase and documentation library upfront. It's too much.

The traditional solution is skills: the coding agent decides when it needs information and actively looks it up. "I need to know about authentication, let me search for that." Sounds reasonable. In practice it creates three problems:

1. **Decision paralysis** - the agent has to decide *when* to look up docs, and it often guesses wrong
2. **Async delay** - every lookup is a round-trip, breaks flow
3. **Sequencing conflicts** - exploring code vs. consulting docs creates timing issues

Vercel's approach flips this: give Claude Code a compressed index of what documentation exists and where to find it, *before* it starts work. The index is small enough to fit in context every turn, so it always knows what's available. When it needs details, it reads the specific file directly. No decisions, no lookups, no conflicts.

## Why Compression Matters

The key innovation is compression. A full documentation tree - all the folder structures, file names, categories - takes significant space. Too much to include in every conversation turn.

The compressed index uses a simple pipe-delimited format that shrinks this by ~80%:

```
[epilot Docs Index]|root: ./.epilot-docs|00-general:{tech-stack.md,business-context.md,ci-cd.md}|01-apis:{api-design.md,calling-apis.md}|02-epilot360-microfrontends:{env-vars.md,local-dev.md}|...
```

That single line tells the agent:
- Where the docs live (`.epilot-docs/`)
- What categories exist (`00-general`, `01-apis`, etc.)
- What files are in each category

It's a table of contents, not the full book. But it's enough. The agent sees the map, understands what's available, and pulls specific files when needed. The decision-making load disappears.


![Claude code actually reading docs for once before jumping into code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2smftr4lr0o3jpr0xtxp.png)


## Why This Matters

The accuracy improvement is significant (100% vs 79% task success), but it's not the real story.

The real story is what happens when you lower the barrier to contribution. Proper context enables the person closest to the problem to fix it, regardless of job title. Your PM can fix bugs. Designers can adjust component behavior. Support engineers can patch data issues. You remove bottlenecks. Context and authority live in the same person.

Coding agents are the equalizer. But they're only as good as the context you give them.

Most companies will throw Claude Code at their codebase and wonder why results are inconsistent. The agent hallucinates patterns. Makes incorrect assumptions. Writes code that doesn't match conventions.

The difference is context. Structured, compressed, always-available context about how *your* codebase works.

## How to Build Your Own

The pattern is straightforward. Here's what we did at epilot:

1. **Curate agent-friendly documentation** - organize your internal knowledge: conventions, APIs, architectural patterns, framework usage, code style
2. **Structure by domain** - group related docs (general, backend, frontend, infrastructure, etc.)
3. **Use descriptive filenames** - the agent sees filenames in the compressed index before opening files. `api-design.md` is better than `guidelines.md`. `error-handling.md` is better than `errors.md`. Make filenames searchable and specific.
4. **Automate updates** - pull live data where possible (OpenAPI specs, schema definitions, framework docs)
5. **Generate compressed index** - use a simple format (pipe-delimited works well) that reduces the doc tree by ~80%
6. **Embed in agent context** - add the index to your CLAUDE.md or AGENTS.md file (the context files Claude Code reads)

One thing worth highlighting: we don't just include our internal documentation. We also package docs for the frameworks and libraries we heavily use - single-spa, openapi-backend, openapi-client-axios, i18next, and Volt UI (our custom design system). When Claude Code needs to know how i18next pluralization works or how to register a single-spa parcel, it already has the answer. No hallucination, no outdated Stack Overflow posts, just accurate framework documentation.

## What This Enables

We're already seeing daily usage across the team. Developers context-switch between services faster. Non-engineers contribute directly instead of filing tickets.

But the real potential is broader: if compressed context improves coding agents for technical documentation, why stop there?

- **Runbooks and incident response** - on-call engineers with instant access to procedures
- **Customer domain knowledge** - support teams with context on product behavior
- **Business logic** - product decisions and their rationale, preserved and accessible

The pattern is the same: curate the knowledge, compress it, embed it in context, let the agent work.

## The Constraints Are Disappearing

For decades, contributing to a codebase required deep technical knowledge. You needed to understand the language, the frameworks, the architectural patterns, the implicit conventions. The barrier was high.

Coding agents lower it. Claude Code, Cursor, and similar tools don't replace engineers. They make technical knowledge more accessible. With the right tooling and the right context, a PM can fix bugs. A designer can adjust styling logic. A support engineer can patch data issues.

The question isn't whether this is possible. It's how fast you can adapt.

Organizations which enable broader contribution will move faster than those that don't. The tools exist. The research is clear. What's missing is execution.

## Start Simple

You don't need to document everything upfront. Start with the knowledge that causes the most friction:

- **Code style conventions** - how you write TypeScript, naming patterns, file structure
- **Common patterns** - how you handle authentication, API calls, error handling
- **Framework specifics** - non-obvious usage of your frameworks and libraries
- **Internal APIs** - if you have OpenAPI specs, even better

Create a simple doc structure:
```
docs/
  00-general/
    code-style.md
    tech-stack.md
  01-apis/
    api-design.md
    calling-apis.md
  02-backend/
    error-handling.md
    database-patterns.md
```

Generate the compressed index (pipe-delimited format, one line per directory). Add it to your CLAUDE.md or AGENTS.md file - the context files that Claude Code and other coding agents read on startup. Done.

The compressed index approach works! 🎉 Vercel's research proved it: 100% task success versus 79% without it. We've validated it internally. Now it's about whether you'll adopt it before your competitors do.
