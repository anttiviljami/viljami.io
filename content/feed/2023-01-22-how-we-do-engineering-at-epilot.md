---
title: "How we do engineering @ epilot"
date: "2023-01-22"
description: "Ever since open-sourcing our core Engineering Principles back in January 2021, I regularly get asked..."
tags: ["discuss", "discord", "community"]
canonical: "https://dev.to/epilot/how-we-do-engineering-at-epilot-nai"
slug: "how-we-do-engineering-at-epilot"
image: "/assets/covers/how-we-do-engineering-at-epilot.webp"
imageAlt: "How we do engineering @ epilot"
---

Ever since open-sourcing our core [Engineering Principles](https://github.com/epilot-dev/engineering-principles) back in January 2021, I regularly get asked by candidates how and if the principles really work in practice at epilot.

In this post, I'll attempt to give a glimpse of concrete tools and practices we use in our product team to give an idea of how we apply our principles and what the engineering culture really looks like from the inside.

## Team Structure

![Engineering team group picture](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/42k3bz1nb6ycc0xr1pxk.jpg)

At time of writing, the epilot engineering team consists of 25 full-time remote software engineers organized into 6 squads, each with its own Product Manager and a shared design team of 4 talented product & UX designers.

Each squad is led by an engineer team lead, principally responsible for the team's delivery and engineer wellbeing.

The product leadership team is responsible for communicating our product strategy and maintains a [Now-Next-Later](https://medium.com/the-creative-strategist/why-now-next-later-is-one-of-the-best-frameworks-for-roadmapping-4d547a2f2692) roadmap, but ultimately it's the squads that make all delivery decisions.

Squads are formed around specific business domains within the epilot 360 platform, architected around [Domain Driven Design](https://domaindrivendesign.org/ddd-domain-driven-design/) and micro-ish services both in the backend and frontend.

## Show, Don't Tell

We value real concrete working software, not roadmaps and fancy presentations.

Engineers showcase features in a weekly all-hands Product Demo session: a company-wide celebration and ruthless feedback session. 🎉

Features being demoed are deployed to production but are usually hidden behind a [Feature Toggle](https://www.getunleash.io/), giving demo participants a chance to test and give feedback on features before release.

Most squads use a Kanban-style flow with a weekly planning cycle, but opt to showcase their progress every 2 weeks, with some squads hosting extra demos called "Open Houses" on off-weeks.

The engineering team also hosts an internal bi-weekly "Tech Exchange" to wind down with a beer, but also present and demo cool technical things.

## API-first & serverless

The epilot backend is built as serverless microservices written mostly in Typescript, leveraging services such as AWS Lambda, Step Functions, EventBridge, API Gateway and AppSync.

DynamoDB is the most popular database solution enhanced by managed data stores such as Elasticsearch Cloud, Aurora Serverless and Redshift Serverless.

Our backend is pretty event-driven, with heavy use of EventBridge, SQS and Step Functions to implement asynchronous business logic.

[![epilot tech stack](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xgjoo96jraez8ar3a8re.png)](https://docs.epilot.io/docs/architecture/overview)

Our frontend application consists of microfrontends written in React and Svelte orchestrated by the [single-spa](https://single-spa.js.org/) framework.

The epilot frontend is entirely built on the same APIs we expose to our customers and technical partners via our open-source [SDK](https://github.com/epilot-dev/sdk-js) and public documentation.

We like open standards, so our APIs are defined using common machine-readable specs like GraphQL and OpenAPI.

We find the domain-driven architecture approach an efficient way to organize our teams to act independently while collaborating on software design with an [API-first](https://dev.to/epilot/why-we-design-apis-first-e85) approach.

Organizing our codebase with microservices helps our fully remote engineering team focus on delivery and minimize [bikeshedding](https://en.wiktionary.org/wiki/bikeshedding) over non-critical engineering decisions.

![Microfrontends](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wx4e95wjngxcf7im0z0f.png)

## Freedom and Responsibility

Ok, I freely admit we stole this one from the [Netflix culture deck](https://jobs.netflix.com/culture). Shoulders of giants and so on. ♥

At epilot, every hire is trusted and treated as an adult from day one. We only hire smart people who we can trust and aren't afraid to terminate a relationship if that trust is broken.

We expect engineers to operate by principles and think strategically to benefit our customers and our business. (Max-the-MRR)

We intentionally make it very difficult to create company-wide policies to control which tools to use, what employees should be allowed to do and how they should organize their daily work.

It should be hard to introduce new processes but easy to get rid of existing bad ones.

The exception to this rule is security.

We encourage team members to challenge the status quo with RFCs proposing ways to improve the product and our ways of working.

## RFCs - Solutions Over Problems

Among other things, RFCs written by engineers have so far led us to adopt continuous deployment, harden security, establish new teams, and even [rewrite the entire product in a different tech stack](https://dev.to/epilot/my-first-year-as-epilots-head-of-engineering-killing-the-legacy-monolith-25c2#:~:text=The%20radical%20360%20plan).

These are often simple documents that start out by just describing a problem and expressing a wish or an idea to solve it.

![RFC](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/05wyg0jyd30oruzonlxr.png)

RFCs at epilot have no official approval process. We expect the author to champion their proposal by garnering relevant feedback from peers and stakeholders, and then make an informed decision on how to proceed.

In most cases, the RFC author leads by example and implements the proposal themselves, usually just within her squad at first.

Good ideas spread and are adopted through all teams, not by mandate from above, but by actually improving the quality of our work.

> **Edit:** A total of 192 RFCs have been published in our Confluence since they were introduced 2 years ago. 🔥

## Every Week is Quality Week

The name of this principle came about after a group of engineers expressed concern about technical debt in their project due to pressure to deliver against deadlines.

At the time, it was already an established practice to [fix bugs immediately](https://github.com/anttiviljami/romero-programming-principles#principle-6-fix-bugs-immediately) and treat all types of bugs as critical, but many engineers still felt that they couldn't go against the wishes of product managers to follow the practice.

It was proposed to have a "quality week" at the end of every quarter to give engineers time to focus on quality topics.

As the quarter came to a close, we announced the quality week with instructions to all squads to focus solely on bugs, technical debt and other quality improvements they felt were important.

During the quality week, our engineers were extremely motivated to fix long-time issues that had affected our customers.

We made real, significant progress that week and everyone could see it.

On Monday following the first quality week, we opened [this PR](https://github.com/epilot-dev/engineering-principles/pull/8), making an announcement that every week from now on would be quality week:

[![Every Week is Quality Week PR](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mb6wkx3bdlfzoqucdb8d.png)](https://github.com/epilot-dev/engineering-principles/pull/8)

It worked. We're still starting a new quality week every Monday.

## No-Ops & Continuous Deployment

At epilot you will find a distinct lack of epilot-specific shared tooling. We actively avoid building our own tools and standardizing configurations and instead encourage using open-source tools like AWS CDK, [lambda-powertools](https://github.com/awslabs/aws-lambda-powertools-typescript) and [single-spa](https://single-spa.js.org) to build our product.

We don't have dedicated DevOps engineers or a platform team to build custom tools and pipelines or run k8s clusters.

We expect squads to independently automate testing, deployment and monitoring of their features to minimize the need for manual operational tasks.

Engineers really get to pick any tools they like to do their job, as long as they weigh tech decisions against our principles.

I sometimes get engineers pushing me to leverage my position as head of department to standardize tech choices across the entire engineering team, but so far the approach of giving teams radical freedom has yielded organic adoption of best practices and tools where needed anyways.

Without extra push, all teams have converged to using the same GitLab CI templates, connecting up with [Datadog](https://docs.datadoghq.com/continuous_integration/) to continuously deploy code with synthetic browser tests integrated into the pipeline to make sure we catch problems before they get to production.

The whole team also uses Datadog (another RFC) as the central observability solution to know what's happening in our platform at all times.

When stuff goes wrong, engineers owning the feature jump on a Slack huddle using Datadog's incident management feature to coordinate the response, cleanup and write a post-mortem.

## Why principles matter

When I joined epilot, I made it my personal mission to build an engineering culture that I would personally want to join and be part of.

To me, the [engineering principles](https://github.com/epilot-dev/engineering-principles) are like a founding document; a source code or DNA of how to build a great engineering team.

I'm proud of how far we've come, but there's still lots to learn and improve as we grow and mature as a product team.

I fully expect that in 2 years, writing this blog post would look very different as the industry moves forward with new tools and practices. I hope that these principles will stick.

If the topics in this post resonated with you, make sure to check out our [dev docs](https://docs.epilot.io/) and see our [open positions](https://epilot.cloud/en/career-jobs/)!
