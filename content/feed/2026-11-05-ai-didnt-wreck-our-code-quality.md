---
title: "AI Didn't Wreck Our Code Quality. Here's the Data."
date: "2026-11-05"
description: "Eight months of coding agents at epilot. Same team, 2,4× the PRs merged, 3× the new product capability, and fewer severe incidents than ever. Every number, and how we measured it."
tags: ["ai", "agents", "engineering", "epilot"]
slug: "ai-didnt-wreck-our-code-quality"
image: "/assets/covers/ai-didnt-wreck-our-code-quality.webp"
imageAlt: "Merged PRs per month at epilot, with the share opened by autonomous agents"
---

"AI will wreck your code quality."

I hear this a lot. Usually from people who haven't tried it on a real codebase with real customers.

So we counted.

This week we published the epilot Engineering Report 2026. Every number in it comes straight from our own GitLab, Datadog, Jira and Zendesk. No surveys asking engineers how productive they feel. No vendor case study.

This is the long version: what the numbers say, how we measured them and what I think actually made the difference.

![Headline numbers: 2,4x PRs merged every week, 244 production deploys in an average week, 2 customer-facing SEV-1 incidents in 2026, 22 people outside engineering now contribute code](/assets/ai-didnt-wreck-our-code-quality/01-kpis.webp)

## What changed in February?

Less than you'd think.

Our engineers were already working with AI every day long before 2026. What changed in February was that we brought autonomous coding agents into Slack and did the boring work to let them operate across our whole codebase. Every repository mirrored into one workspace. A compressed index of our 893 internal docs in every agent's context. A fresh cloud sandbox with a live preview for every run.

The docs index turned out to be the single biggest lever. I wrote about that in February: [We made coding agents actually reliable by fixing one thing](/feed/we-made-coding-agents-actually-reliable-by-fixing-one-thing/). Short version: hand the agent a map of your docs up front instead of making it decide when to look things up.

Anyone at epilot can tag the agent in a thread. It comes back with a PR, a preview link and screenshots. An engineer checks it and merges it. CI deploys it.

“Anyone” means anyone, not just engineers. Two months in I wrote about what happened when we opened the codebase to product managers, designers and customer success: [Our entire company ships code now](/feed/our-entire-company-ships-code-now/). They didn’t stop.

What we didn't do matters just as much. No AI team. No platform team. No prompt engineering workshops. No increased hiring either: between 40 and 44 engineers committed code in every single month since January 2025.

The same team with new tools.

## Did output actually go up?

It more than doubled.

- 495 PRs merged in an average week in Q3 2026, up from 204 in Q1 2025. That's 2,4×.
- 244 production deploys in an average week, up from 137. Our best week so far had 359.
- 10,7 PRs landed per engineer per week (counting the agent PRs they merged), up from 4,4.

![Weekly production deploys, January 2025 to October 2026, rising from 137 to 244 a week](/assets/ai-didnt-wreck-our-code-quality/02-deploys.webp)

Autonomous agents now open about 30% of everything we merge. Since February they've opened more than 8000 PRs and our engineers merged 4844 of them. Most of the rest got closed after a look, which is exactly how it should work.

![Merged PRs per month by who opened them: autonomous agents open about 30% of merged PRs by October 2026](/assets/ai-didnt-wreck-our-code-quality/05-agent-prs.webp)

The part I find most interesting: PRs opened by people went up too, from 873 in January to 1663 in September. So the agents add to what our engineers ship.

## Isn't counting PRs a vanity metric?

Pretty much, yes.

When I shared the first draft of the report, our CTO Szilard pushed back. His take: "output doubled" undersells it, because we now ship bigger and more impactful things than before. His gut said 3 to 4×.

PR counts can't settle that. A PR can be a typo fix or a whole new feature.

So we measured what the product can actually do. epilot is API-first: every API gets a machine-readable OpenAPI contract before it's built. That makes the specs a pretty honest record of product capability over time. We parsed every OpenAPI spec in all our active GitLab repositories at the start of each quarter and diffed them.

- New API operations: 91 a quarter in 2025, 279 a quarter in 2026. That's 3,1×.
- Existing operations extended (parameters, request or response schemas changed): 230 a quarter in 2025, 442 in 2026. That's 1,9×.
- 1860 API operations across 111 API specs today, up from 699 across 61 in January 2025.

![API operations added or extended per quarter: 321 on average in 2025, 721 in 2026](/assets/ai-didnt-wreck-our-code-quality/03-api-capability.webp)

The growth is broad. The three busiest APIs account for less than a quarter of this year's new operations. The rest is spread across integration tooling for ERP and billing systems, a much bigger customer portal, AI agents, Config Hub, calendars, enterprise sign-in and a long tail of everything else.

Our product managers' own Jira data points the same way. Roadmap items they rate high impact went from about 8 per major release in 2025 to 17 in 2026. The five major releases of 2026 shipped 154 new features and improvements, more than all seven releases of 2025 combined (150).

So was Szilard right? For new capability: yes, about 3×.

## Did quality suffer?

Short answer: No. It improved.

This was the part I was most nervous about. Shipping 2,4× more changes is a great way to break things 2,4× more often.

Customer-facing SEV-1 incidents, the ones that stop customers from working: 14 in 2023. 6 in 2024. 4 in 2025. 2 so far in 2026, with 40 and 45 minutes of customer impact.

![Customer-facing SEV-1 incidents per year: 14 in 2023, 6 in 2024, 4 in 2025, 2 in 2026 to date](/assets/ai-didnt-wreck-our-code-quality/04-sev1.webp)

- Reverted PRs dropped from 1,7% to 0,5% of everything we merge.
- About 96% of bugs get caught before a release reaches customers. Each recent release cycle found around 300 bugs before shipping to Stable, while customers reported 8 to 13 in the five days after.
- 69% of bugs are found by us, not reported by customers.
- We fix 211 bugs a month now, 77% more than in 2025. Since June about 40% of those fixes come from a PR an agent opened.

Now the honest part. Customer-reported bug tickets did go up in absolute terms, from about 56 a month in 2025 to about 97 a month in Q3 2026. Our customer base grew too: the number of customer organisations filing tickets went from 85 to 133 a quarter. Per customer organisation, bug reports stayed about flat (2,0 → 2,2 a quarter) while we ship 2,4× as much.

I'd rather show you that than leave it out. Data you have to squint at to believe isn't worth much.

The app got faster as well, without a performance team:

- Longest main-thread block in our browser tests down 76% since April (1020 ms → 243 ms).
- JavaScript loaded at start down 38% (14,9 MB → 9,2 MB).
- 99,98% of requests through our public API gateway answered without a server error.

That came from 181 small performance PRs merged so far this year (49 in the same months of 2025), kept honest by performance budgets that fail the pipeline when something creeps back.

## How do engineers keep up with reviewing all of this?

They review the behaviour. The intent from the RFC. The shape of the code.

I've said for years that PR review is overrated. Async approvals mostly hand off responsibility to whoever clicks the button. Agents forced us to get explicit about what review is actually for.

An engineer checks the spec or the agent session behind a PR, clicks through the change running in its preview environment and skims the code for shape. Tests and CI gates catch the rest.

It isn't free. Median time from PR opened to merged went from 1,1 hours to 1,8 hours as engineers took on reviewing agent and non-engineer PRs. I'm happy with that trade.

## What did CI have to become?

Fast. Really fast.

Thousands of agent PRs only work if every one of them gets a quick pipeline and a running preview. Our pipeline volume grew 3 to 4× this year.

- Median pipeline to production: 33 minutes → 15 minutes.
- The full staging suite of about 210 Playwright browser tests runs in just over 3 minutes on AWS Lambda runners. In January the staging gate averaged 13,9 minutes. AI test selection now runs only the tests a change can affect, so the gate averages about 2,5 minutes.
- AWS runners with cached ARM images in about 80 production repositories took build and test jobs from 8 to 10 minutes down to 1 to 2.
- A review app on every PR, so reviewers, PMs, designers and the agents themselves click through a change before it merges.

Each pipeline got faster and costs roughly a quarter of what it did.

![CI before and after: pipeline to production 33 to 15 minutes, staging e2e gate 13,9 to 2,5 minutes, build and test jobs 8 to 10 down to 1 to 2 minutes](/assets/ai-didnt-wreck-our-code-quality/06-ci.webp)

## Agents that don't wait to be asked

More than a dozen agent workflows run on their own, on a schedule or on a pipeline event.

- Production triage every 30 to 60 minutes. It groups errors and alerts into patterns, investigates across services and fixes the trivial ones. Its memory file holds 209 learnings by now.
- Bug and translation tickets several times a day. It picks up new tickets and opens PRs for the fixes it's confident about.
- Tech debt daily. It takes one item off the engineers' backlog: an upgrade, a missing test, a migration.
- A risk check before production deploys, a public API changelog written from every spec diff, self-healing browser tests and health-check coverage for new support cases.

Every workflow is a Markdown file declaring its tools and permissions, changed only through a reviewed PR. Every run reports to Slack or opens a PR. Nothing happens silently, and an engineer makes the call.

On-call changed too. Monitoring opens a Slack thread for every alert and the on-call engineer has an agent investigate it right there. One engineer merged about 100 fixes in a single on-call week. When a Node.js security release dropped in October, agents had fixes merged across about 15 services within 24 hours.

## The number I'm proudest of

22.

That's how many people outside engineering contribute code at epilot today. Product managers, designers, customer success, QA, finance. In all of 2025 it was 8.

Between February and September they drove 807 PRs, and 543 of them got merged. That's two in three, a better merge rate than the agents' 59%. Counted in contributor days (a day on which someone outside engineering committed code), we went from about 7 a month in 2025 to 100 in October.

![Contributor days per month from people outside engineering: about 7 a month in 2025, 100 in October 2026](/assets/ai-didnt-wreck-our-code-quality/07-outside-engineering.webp)

One product manager has opened 141 PRs since February, including a feature spanning frontend, API and a shared library. Customer success turns a complaint into a PR with a before-and-after recording. Designers send preview links where they used to send mockups. Our QA engineer built the control center we now run every major release from, in a few weeks, with agents.

A company where everyone can fix what slows their customers down is a different kind of company.

## So what keeps it from falling apart?

People. Engineers still own merging and shipping code.

Back in March, when this started to take off, I wrote this in our Slack:

> "Our guardrail is simple: agents create MRs, engineers review & merge. main triggers deployments, so we need engineers in that loop."

It's still the rule. Agents and colleagues outside engineering open as many PRs as they like. An engineer merges them. Only CI deploys. The engineers who build a service also run it on call.

The rest is the boring stuff that was already there:

- Coding agents never touch customer data. They work in isolated, epilot-owned sandboxes in the EU, with no access to customer data and no production access.
- Every backend service is a short-lived AWS Lambda function with least-privilege rights, so a vulnerable dependency reaches one function, not the whole backend.
- Customer data stays in Frankfurt. We're ISO 27001:2022 certified and independently pen-tested.
- AI inference for the features inside our product runs in the EU, including failover, and customer data is never used to train models.

## What would I tell another engineering org?

Everyone has access to the same models. What we had going in was five years of product engineers who own the whole stack and run what they build, on a serverless platform where every API has a machine-readable contract.

Agents love that kind of codebase. Clear contracts, small services, one shared CI pipeline, conventions written down where an agent can read them. They plugged straight into it.

If your engineers can't ship without waiting on a platform team, an ops queue or an architecture board, your agents will wait in the same queue. Fix that first.

Context over prompts. Guardrails over gatekeepers. Engineers in the loop where it matters: at merge and at deploy.

It worked for us. Your mileage will vary, but probably less than you think.

The full report, with every chart and how we measured it all: [epilot Engineering Report 2026 (PDF)](/assets/ai-didnt-wreck-our-code-quality/epilot-engineering-report-2026.pdf)
