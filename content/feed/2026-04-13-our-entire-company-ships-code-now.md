---
title: "Our Entire Company Ships Code Now. 40 PRs from Non-Engineers in 60 Days."
date: "2026-04-13"
description: "In February, I opened our entire codebase to the company. PMs, designers, projects, customer success,..."
tags: ["ai", "product"]
canonical: "https://dev.to/epilot/our-entire-company-ships-code-now-40-prs-from-non-engineers-in-60-days-jo5"
slug: "our-entire-company-ships-code-now"
---

In February, I opened our entire codebase to the company. PMs, designers, projects, customer success, and support all got access to 219 repositories and over a million lines of production code. I handed them powerful coding agents and told them to start contributing.

I've been writing about product engineering for years. The core idea: engineers should understand the whole product, the customer, the business problem. I wanted to test the reverse. Can non-engineers contribute to the codebase if you give them the right tools?

Two months of real data delivered a clear answer: yes. And it may be the most powerful shortcut I've found to building capable, business-aware product teams who truly care about what they ship.

Here is what that looked like at epilot: 629 merged PRs in 60 days. **40 PRs were from 11 non-engineers**. All teams have at least one person who contributed to our codebase with Claude Code.

We're not alone in seeing this shift. [Stripe ships over a thousand agent-produced PRs per week](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents). [Superhuman uses Codex](https://openai.com/index/introducing-codex/) to let product managers contribute lightweight code changes without pulling in an engineer (except for code review). [Intercom gave Claude Code to everyone in the company](https://ideas.fin.ai/p/we-gave-claude-code-to-everyone-at), over 1,000 non-engineers (PMs, designers, support, marketers, and more), and more than 300 became active weekly users.

This post is a detailed, honest look at how we set it up, what actually worked, the mistakes we made, and the deeper lessons that emerged.

---

## The starting point

epilot is a B2B SaaS platform for energy companies. We run a fully remote team of 40+ product engineers with no engineering managers and no dedicated platform team. Everyone owns end-to-end ownership. We already ship to production 150+ times per week on AWS serverless.

Our entire engineering team was already using AI coding agents daily. Claude Code, Codex, Cursor. Engineers had adopted them fast and the productivity gains were obvious. The question I wanted to answer next: what happens when you expand codebase access via coding agents to the rest of the company? PMs, designers, customer success, support. Not as a one-off hack day, but as a fully supported, production-grade workflow.

## The infrastructure that turned agents into teammates

Claude Code and Codex still only ship connectors to GitHub, and our entire codebase lives in GitLab. So we created a single GitHub repo that bootstraps a developer sandbox with a shallow copy of all 219 repositories. This allows both AI agents or engineers to spin up a fully functioning developer environment with everything cloned & tools set up within minutes.

### 1. Agents live in Slack
We created **#dev-squad-agents** alongside our regular squad channels. Anyone could join via Claude Code, Codex, or GitHub Codespaces. I ran three one-hour onboarding sessions to showcase the tooling and make sure everyone had the required access: one for design, one for support, one for go-to-market. The PMs didn't need their own session. Their engineering teams had already invited them and they were eager to start.

This single decision drove adoption more than anything else.

### 2. One-click preview environments
Every PR automatically generates a live preview link in CI. Click it, see the change, test it immediately. No local setup required.

For engineers this is convenient. For non-engineers it is essential. If they cannot see and interact with their change, they can't meaningfully contribute.

### 3. Deep institutional context
We built an indexed knowledge base called **[how-to-everything](https://www.linkedin.com/pulse/we-made-coding-agents-actually-reliable-fixing-one-thing-kuosmanen-oa2of/)**. It contains our API patterns, backend conventions, code style, CI/CD and testing strategy, full business context, domain terminology, and our entire RFC archive.

Stripe solved the same problem by connecting agents to 400+ internal tools. We chose comprehensive indexing. The insight is identical: **agents without your company’s context produce garbage. Agents with it produce work that feels native.**

### 4. Design system in context
Our Volt UI component library is baked into the agent prompt. Claude now generates frontend code that respects the correct components, spacing, colours, and patterns from the first try. Consistent UI without forcing a designer to review every small change.

---

## Claude as a coworker: the Slack pattern

Claude quickly became the most active “team member.” People tag **@Claude** the same way they tag colleagues, and they expect results just as fast.

### How engineers use it
Simple tasks look like: “@Claude fix EPI-5660.” A PR appears.

More powerful uses scale across the organization:
- _“@Claude which microfrontends still use the legacy editor?”_ → instant audit of all 219 repos.
- _“@Claude migrate 13 backend repos from file-client to lambda-adapter.”_ → completed in one session.
- Mass upgrades across 20+ repositories: one message triggers 6 parallel sub-agents that handle changes, tests, and PRs.

What once took a full day of tedious cross-repo work now happens in hours. Agents worked weekends. Engineers didn't have to.

### How non-engineers use it
They speak in plain product language:
_- “@Claude disable drag and drop of entity table columns for embedded tables.”_
- _“@Claude when creating a new family in the Label Builder, the drawer should close automatically.”_

Claude figures out the right repositories and implementation details. Non-engineers don't need to know our tech stack or repo structure. They describe the desired outcome.

### Production impact
We added Claude to **#alerts-production** on day two. It investigates incidents, reads logs, traces errors, and proposes fixes before most engineers open the dashboard. When a bulk action hammered Elasticsearch with 100 parallel requests, Claude designed an org-level job queue with concurrency limits that cut peak load by 90%. Engineers started replying “another one bites the dust” to resolved alerts.

Within a week, Claude felt like a trusted junior-to-senior coworker: fast executor, deep historian, and reliable pair programmer. Usage spread organically to every squad.

---

## What people actually built

### Non-engineer contributions (40 merged PRs from 11 people)
- **Feature work**: One PM built auto-tagging for file uploads (a feature he had spec’d three months earlier). Another shipped 13 PRs on messaging (bulk email templates, sidebar toggles, drawer behaviour, i18n). A go-to-market colleague delivered entire features, like pivot tables for displaying time-series data in epilot tables, that are now live for customers.
- **Daily improvements**: Customer success shipped portal config changes they handle every day. Designers and support added FullStory tracking and started prototyping new UI flows.
- **Translations**: Native speakers cleared 116 German translation improvements with almost no engineering involvement.
- **UX via vibecoding**: A designer shipped a UX improvement to our Flow Hub before heading into the weekend: when creating a new Flow, users now get prompted to enter a name first. She described it as "vibe coding" and the change reduced friction in a way she'd been wanting to fix for a while.

These were not toy changes. Several were meaningful, customer-facing updates. One PM even asked Claude to create a demo video of the feature it just built, so he could share it with the team. The full cycle from spec to demo, handled through conversation with an agent.

### Engineer contributions (589 merged PRs)
Engineers use agents across the full lifecycle. Writing RFCs and technical designs. Implementing multi-service features. Running tests. Shipping to production. Auditing feature flag usage across 15 repos and cleaning up stale flags. Investigating production incidents from alert channels before anyone opens a dashboard.

Some of the most valuable uses are research and diagnostics. "Which services listen to the file upload event?" "How many microfrontends still use the legacy editor?" "Audit all listSchemas calls and upgrade to the new summary API where safe." These are questions that used to take half a day of grepping across 219 repos. Claude answers them in minutes.

GitHub Codespaces turned out to be a key piece for engineers too. Running Claude Code in auto-mode in a cloud sandbox means you can kick off a multi-repo migration and let it run without risking your work laptop. No local state to corrupt, no accidental changes to your working branch. The sandbox spins up with the full codebase mirrored and Claude works through the task autonomously. Engineers now run 6 parallel sub-agents in Codespaces for bulk upgrades across 20+ repos: package bumps, migration scripts, test updates, PRs opened. What used to be a full day of copy-paste across repos is done in one session.

### The new collaboration model
Non-engineer describes the problem in business terms → Claude implements → engineer reviews for architecture and quality. The person closest to the customer now helps ship the solution. Feedback loops tightened dramatically.

A designer and engineer even deployed [Agentation](https://www.agentation.com/) (a prompt-structuring tool) in 2.5 hours. The designer now uses it daily and calls it a “dream collaboration.”

---

## Guardrails: the hard lesson

A few weeks in, one non-engineer with full GitLab push access bypassed our CI pipeline and deployed code to production without review. No damage, but it was exactly the wake-up call we needed.

We immediately tightened permissions: non-engineers and agents create PRs; engineers review and merge. No direct push to protected branches.

But that incident was just one piece. When you give AI agents to 50+ non-engineers, you need a proper governance framework. We built one.

### What we had from day one

- **Sandboxed execution only.** Agents run in Claude Code Web, Codex sandbox, or GitHub Codespaces. No production infrastructure access. No deployment outside CI.
- **Dedicated bot users.** Limited API scopes. Code-level access only. Zero access to customer data, session tokens, or production databases.
- **Public channels only.** All agent interactions happen in shared Slack channels. Engineers see everything and can intervene. No private DMs with agents.
- **Human responsibility.** You trigger the agent, you own the output. No exceptions.

### What we added after

We published a formal **Agentic AI Tool Usage Guideline**. The core principle: give the agent the minimum access it needs for the task at hand, and nothing more.

The guideline includes:

- **A three-tier data classification.** Red (never share with AI): customer PII, session tokens, credentials, security documents. Yellow (anonymise first): user research transcripts, survey responses, usage metrics with identifiers. Green (safe): public docs, your own drafts, anonymised research, process docs. Hard line on red: no exceptions, no "just this once."
- **An approved connector matrix.** Every tool combination (Claude + Figma, Claude + Atlassian, Claude + Miro, etc.) classified by risk level with specific conditions and recommended settings.
- **Prompt injection awareness.** Use a separate browser profile for Claude browser extension. Don't paste content from untrusted sources into agent prompts. Disconnect MCP connectors when not in use.
- **Explicit dealbreakers.** Leaking customer personal data, unauthorized code deployment, and feeding company data into model training are not allowed regardless of how useful the outcome might be.
- **GDPR and EU AI Act compliance.** The guideline maps our practical rules to specific legal obligations: data minimisation (Art. 5), DPA requirements (Art. 28), AI literacy obligations (Art. 4), transparency requirements (Art. 50). We're a European company serving energy utilities. Regulatory compliance is table stakes.

**Lesson**: Lock down merge and push permissions *before* opening access. We got lucky. And build the governance framework early. Guardrails didn't slow adoption; they accelerated trust and usage.

---

## What surprised us most

- **Adoption speed**: Three one-hour onboarding sessions and people were off. Every team across the company had active contributors within three weeks.
- **Non-engineers shipping real features**: I expected small fixes and translations. Instead, people from across the company delivered complete, production features.
- **Claude as institutional memory**: Support now asks Claude product questions instead of hunting down engineers. It has become the fastest way to understand how anything works across five years of code history.

---

## Beyond code

This is just one layer. My colleague Suresh built **Vigilos**, an internal BI agent that lets anyone query our data warehouse in natural language. Designers check average journey name lengths for UX decisions. Customer success identifies accounts with AI features disabled. Product managers run customer segment analysis in minutes.

We'll share that story soon.

---

## Where this goes

Two years ago I published the Product Engineer Manifesto: engineers should care about the customer, the business outcome, and the whole product.

What these two months taught me is that the same mindset now applies in reverse. Give non-engineers the right tools, deep context, and sensible guardrails, and they will deliver.

We're still hiring product-minded engineers. That hasn't changed. Engineers at epilot own the full product lifecycle: customer understanding, architecture, quality, reliability, and shipping. Non-engineer contributions don't reduce what we expect from engineers. They amplify it. The entire organization now ships alongside them.

629 merged PRs in 60 days. 40 from non-engineers.
