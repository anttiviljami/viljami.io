---
title: "After 3 years: Bets I made as Head of Engineering rewriting the epilot SaaS – worth it?"
date: "2024-02-15"
description: "In this post, we take a look back at some of the most influential decisions I implemented early on in..."
tags: ["saas", "react", "aws", "career"]
canonical: "https://dev.to/epilot/after-3-years-bets-i-made-as-head-of-engineering-rewriting-the-epilot-saas-worth-it-2bc1"
slug: "after-3-years-bets-i-made-as-head-of-engineering-rewriting-the-epilot-saas-worth-it"
image: "/assets/covers/after-3-years-bets-i-made-as-head-of-engineering-rewriting-the-epilot-saas-worth-it.webp"
---

In this post, we take a look back at some of the most influential decisions I implemented early on in our SaaS rewrite journey at [epilot](https://epilot.cloud/en) and evaluate how well each one has played out after 3 years.

[Skip ahead](#conclusion-was-the-rewrite-a-good-idea) or read on until the conclusion for a full verdict of whether rewriting our app was a good idea to begin with.

## Doubling down on AWS & serverless

**Good bet 👍**

To be fair, AWS was already the de-facto cloud platform used by the epilot team before I joined.

My contribution was to convince the team to go all in on a serverless architecture with an ambitious strategy to rewrite and replace our proprietary Java-based 3rd party monolith running on EC2, piece by piece with functionalities leveraging serverless AWS offering.

After 3 years, there are no regrets to choosing to be fully vendor-locked with AWS for the speed, scalability and minimal operations overhead it provides.

## Microfrontends with single-spa

**Good bet 👍**

The decision early on to take a microservices approach in our frontend was made out of purely practical reasons.

Frankly our small team who lead the work on the new platform didn't have the time, the confidence, nor the desire to make long term decisions on the frontend tech stack, tooling and important design decisions on behalf of all our other teams, present and future.

I'm extremely happy we went down this path instead of imposing one framework and toolset for everyone. The *single-spa* approach lets us improve our frontend game each time a new microfrontend gets added to our application, which by now has happened more than 30 times! We've even ended up replacing entire MFEs (microfrontends) a few times, which isn't as bad as it sounds when the codebases are kept relatively small.

Notably the microfrontend approach also helped us support the transition from the legacy product to the new one, as we were able to treat the legacy app as just one of our many (micro)frontends, and slowly replace functionalities one by one by shipping new microfrontends.

## Using React without a framework

**Bad bet 💸**

I know, *"skill issue"*, right? But honestly I've found that even the really senior (read: expensive) React engineer hires tend to struggle with performance and end up wasting a lot of time on fixing major performance issues with React applications when they start to do anything meaningful.

Starting over, I would probably spend a bit more time choosing a React framework that works well in a microfrontend environment rather than encouraging all teams to start from scratch, and establishing no-framework as the implicit default.

Controversial: I might not even pick React for most MFEs anymore. We already use *Svelte* in parts of our app, and turns out *Sveltekit* works super well in a single-page-app environment like ours!

## RFCs

**Good bet 👍**

The practice of writing RFCs to collaborate on software design and async decision making was one of the first and best things I introduced joining epilot.

To this day we use RFCs as the main way to share ideas and be transparent about the work that our engineers do. I'd consider this one a very good bet and would absolutely recommend a culture of writing RFCs for all product organizations.

## API First

**Good bet 👍**

We give a ton of freedom to engineers to pick whatever languages, tools and techniques they see fit, but the one thing I've always demanded from our teams has been to design using machine-readable API contracts, such as *OpenAPI* or *GraphQL*.

I would say this is internally the most important way we collaborate on our software's design, using shared types and automated tests to ensure our implementations follow the common API contracts. This approach has radically reduced bugs and allowed our engineers to work together efficiently leveraging platform features built and maintained by other teams.

On top of that, being API First and publicly building and sharing our API contracts has allowed our customers and partners to effortlessly build on our product, and integrate it deeply with their own IT landscape using our API & SDK.

## Continuous production deploys from `main`

**Bad bet 💸**

Turns out our customers simply did not tolerate the frequent changes and inevitable rollbacks of this approach.

We technically still ship continuously from `main` to our production environment, with an average of 150 production deployments every week, (with a lot of tests!), but now ship a monthly stable snapshot release to paying customers, and heavily utilise feature flags to roll out changes.

## Not using feature flags from the beginning

**Bad bet 💸**

We did use GitLab feature flags on launch, but they were only used to turn features on/off between stages (`dev`, `staging`, `production`).

Turns out this wasn't enough. Our teams really needed better tools to give us fine-grained control over rolling out features to specific customers. 

Going back, I wish we had started earlier with something like *LaunchDarkly*.

## Hiring product-focused senior engineers remotely

**Good bet 👍**

This is a decision I'm very proud of. Keeping an almost unreasonably high bar to getting hired and seeking out individuals who care about the product, our customers and our business has allowed us to build and retain a motivated team with zero managers and architects. 

Making engineer hiring remote-first allowed us to tap into an international pool of senior talent resulting in a team of more than 30 exceptional and motivated hands-on *Product Engineers* from more than 10 countries working for us, and growing... ❤️

## In-house DevOps / platform team

**Bad bet 💸**

We tried to establish a platform team on two separate occasions but both times the team struggled to produce value for our teams. The DevOps engineer hired to lead the second platform team ended up leaving us for a bigger company after a few months.

Looking back, part of the reason for this was likely a combination of leveraging managed/serverless services that don't require much in-house automation work, and hiring senior engineers who can automate things for themselves when needed.

We've recently started experimenting working with a 3rd party DevOps consultancy to join us on a project-basis to help us with non-product related engineering tasks such as optimising our CI/CD pipelines.

Regardless, we don't anymore see any need to hire and establish an in-house DevOps team, or get into *Platform Engineering* of any sort in the foreseeable future.

## Weekly Demos

**Good bet 👍**

The all-hands weekly demo is still easily my favourite recurring event at epilot. It's like having a company-wide celebration of shipping things, every week!

The weekly demo brings not only a positive buzz around all the cool stuff being built, but also the expectation that engineers personally showcase concrete customer value created in their teams every week. It keeps us accountable for consistent delivery and maintains a rapid feedback loop with the rest of the company.

## Open-Source Engineering Principles

**Good bet 👍**

Transparently laying out our Engineering Principles in a [public GitHub repo](https://github.com/epilot-dev/engineering-principles) helped set clear expectations for our culture internally, and perhaps even more importantly for engineer candidates, many of whom have testified making the decision to apply at epilot because of our principles resonating with their own beliefs. 

## Hasura

**Good bet 👍**

One of the early key bets was the decision to use *Hasura* to interface with our legacy database to break up the monolith into microservices.

Event triggers listening on DB changes and pushing messages to SQS while using the GraphQL API to implement 2-way data sync with the legacy app turned out to be a great and reliable event-driven pattern for breaking up the monolith step by step.

Since shutting down the legacy product last year, *Hasura* was decommissioned together with the legacy Postgres database, but it truly served its purpose well during the migration to serverless. 🫡

## DynamoDB as our go-to database

**Good bet 👍**

We haven’t had any fundamental issues with DynamoDB single table design in our backend microservices. 

Of course it’s not suitable for every use case, and we have turned to *Aurora serverless*, *Elasticsearch*, and even *InfluxDB* in a few special cases, such as for search and analytical needs. But for 80% of the time, DynamoDB is fast, convenient and extremely worry-free as a default application database. 

## AWS OpenSearch service

**Bad bet 💸**

We started out on *Amazon OpenSearch Service* (still called *Elasticsearch service* back then) but were struck with a pretty bad incident where our domain became completely non-responsive in our development environment and the only thing we could do was to contact AWS support to resolve the issue. This was totally unacceptable for us as we heavily rely on Elasticsearch for our main functionalities.

*Elastic Cloud* ended up being far more reliable and manageable for us in the end. Having a self-service reboot button on the interface makes all the difference!

However with both providers rolling out their serverless solutions, which would be extremely attractive to us, we're keeping our eyes open and are open to experimenting again with *AWS OpenSearch* offering.

## Datadog for observability & monitoring

**Good bet 👍**

Datadog is one of those tools that once you get used to it, you wonder how you ever lived without it.

The value we get from Datadog's UI for logs, traces, monitors and dashboards is insane, and absolutely worth every penny.

We use Datadog RUM for browser & UX monitoring. The RUM sessions and logs are extremely helpful for tracking down frontend crashes and bugs, as well as visually understanding user behaviours.

On top of that, we use pipeline observability to analyse CI pipelines, custom metrics to track business & application KPIs, and cloud security management for compliance reporting and threat detection.

## Datadog for incident management & post-mortems

**Good bet 👍**

Datadog Incident Management has been absolutely vital in making sure we take the right steps to analyse and learn from our incidents. We use it during incidents for coordination and communication, as well as after the fact for post-mortem and analysis of past incidents and trends.

## Datadog for browser tests

**Bad bet 💸**

Datadog synthetic browser tests were great to get started fast but quickly became slow, expensive, hard to expand and simply not good enough for our team. 

We ended up switching over to *Playwright*.

## Redshift Serverless

**Bad bet 💸**

Quite slow. Very expensive. At least for our use case of generating dashboards with Spectrum querying mostly parquet files from S3.

Our team is currently investigating replacing Redshift with *Clickhouse*.

## Microservices

**It's complicated 😎**

At this point I've stopped referring to our product as having a *microservices* architecture. I don't find it a very helpful abstraction to understand a large, event-driven, interconnected product that's mostly FaaS.

Yes, we still develop and deploy our services as independent domain-specific modules with well-defined APIs.

In reality however our application is used by the customer as one big product with all the pieces needing to connect and work together to provide a service.

Thus, we must also test and ship the product as one. (Really, we have one large shared e2e test project that blocks all pipelines. When we're shipping our monthly stable release, we take a snapshot of all our bundles and ship those in one atomic import map file.)

I simply find it more useful to think of our product as one monolith, made up of a large number of independent infrastructure & FaaS modules with APIs.

## Conclusion: Was the rewrite a good idea?

If you ask me now I would never recommend any SaaS company take the decision to fully rewrite their software. It's generally just a pretty dumb and painful thing to do. 😅

For epilot sadly we were left with no other choice.

The legacy version of our SaaS was built on top of a proprietary 3rd-party low-code platform *Axon Ivy*, which by no means was designed to run a multi-tenant SaaS, but that the external epilot dev team from Vietnam (affiliated with Axon) had managed to wrangle to work.

The fact that epilot was able to build a successful and fast-growing business on top of what's essentially a hacked low-code business process automation tool, is the ultimate proof to me that the tech stack really doesn't determine a company's success!

But we were seriously starting to hit the limits of our software, especially when it came to scalability and speed of development. We didn't even have access to the source code so that we could take over the development of the core application. All we could do was upgrade to new versions provided by the vendor and continue to hack the software to make it do more things it wasn't designed for.

Simply put, it wasn't sustainable for a fast growing software company. No developer wants to work on software like this. Especially not the talented and ambitious ones we wanted to work with.

It took us nearly 3 years, but in the end we managed to reach feature parity, replace, migrate and shut down the legacy app, with very little churn, growing year-over-year and last year **doubling our MRR** while migrating the last customers over to the new platform.

Feels good to say we're only getting started with our new 360 platform.

Looking back at the last 3 years, while I would never recommend anyone pursue a rewrite for a running SaaS business, while simultaneously trying to build a healthy, ambitious engineering team and culture, I'm convinced that for epilot this was the (only) way to go, and we're much better for it.

In the end we at epilot overwhelmingly consider this a…

**Good bet 👍**

## What's next?

To keep things short in this post, I'll publish a separate Part 2 where I share our latest bets focused on building epilot into the next SaaS Unicorn. 🦄

*Mandatory recruitment disclaimer*: If this post made you at all curious, please check out our [docs](https://docs.epilot.io/docs/intro) and check our [open positions](https://epilot.cloud/en/career-jobs/#:~:text=Discover%20now-,We%20are%20looking%20for%20you!,-HR) for more!
