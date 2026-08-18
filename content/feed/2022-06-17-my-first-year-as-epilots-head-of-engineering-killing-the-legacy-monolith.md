---
title: "First year as Head of Engineering @epilot - Killing the Legacy Monolith"
date: "2022-06-17"
description: "This post is a personal account of my experience at epilot.cloud and our journey rebuilding our..."
tags: ["leadership", "career", "serverless"]
canonical: "https://dev.to/epilot/my-first-year-as-epilots-head-of-engineering-killing-the-legacy-monolith-25c2"
slug: "my-first-year-as-epilots-head-of-engineering-killing-the-legacy-monolith"
image: "/assets/covers/my-first-year-as-epilots-head-of-engineering-killing-the-legacy-monolith.webp"
imageAlt: "First year as Head of Engineering @epilot - Killing the Legacy Monolith"
---

This post is a personal account of my experience at [epilot.cloud](https://epilot.cloud/en/) and our journey rebuilding our legacy Java monolith SaaS from the ground up with AWS, serverless and microfrontends, mostly during 2021.

The text is written from the perspective of engineering and focuses on the challenges I faced taking on leadership of our growing team of 25+ engineers.

I fully acknowledge this is not the complete picture of epilot's growth during this time as we have many other amazing departments and individuals working to make epilot the next tech unicorn success story.

Full disclosure, I love this company and am heavily invested in the product's success after my first year and a half. 💙

![Cologne Carnival](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5ybon69p9qvdgay6b7vh.jpg)

(I'm the one dressed up as the doctor for our company's annual Cologne carnival celebration)

## Beginnings

I joined the Cologne-based startup epilot in October 2020 as a cloud engineer to head a new platform team and aid the product team transition to serverless AWS.

The task felt right in my wheelhouse.

By that time I already had three real serverless products under my belt, had experience migrating monoliths to microservices, and had acquired more than 8 years of professional experience in total as a developer and team lead working mostly with AWS and other cloud platforms.

I knew startups. I had experience with the business domain. I knew the technology well.

This was my time to shine.

## Build better software, faster.

As our CTO Szilard Toth put it in our first discussions, my job description was to help us "build better software, faster".

I took that mission statement very seriously.

Coming off a 4-year stint at [Futurice](https://futurice.com), a lean service design focused consultancy, my first instinct was to make a current state analysis of my new company - epilot.

To get my bearings, I joined one of the engineering teams and got busy.

I learned about the challenges our teams were facing and got a deeper view into our legacy product, which had already been in active development for more than 3 years.

We were already doing a lot of things right: All three teams at the time were generally following agile practices, engineers were eager to discuss and learn their new tools, many had even taken the time to get AWS certified.

But there were certainly some big concerns.

At the end of my first full month, I was ready to present my learnings to the company.

## First insights

I published an internal document titled "epilot Tech Review" detailing my assessment of the current state of epilot's engineering.

These were the main findings:

1. The decision made (before my time) to pick AWS, serverless and React as our foundation was a good one for what the team wanted to achieve: Low operating costs and high development speed. This was especially great for hiring due to many candidates being attracted to these modern technologies.
2. Our teams lacked experience working with these technologies. Progress was slow and unfortunate decisions were made with the very first small scale serverless projects.
3. Alarmingly, the engineering team had no viable plan or strategy to migrate the legacy product to the new serverless architecture. Everyone was excited about the new tech but we clearly had no clue how to actually build our product with it.

I emphasised in the document how important it was for epilot's success to move away from the legacy technology stack, a proprietary monolithic Java framework which had already proven to be a poor fit for our use case, difficult to run and extremely slow to develop new features on.

Our ability to deliver as an engineering team was looking pretty grim. The company had already invested a full year into going serverless with not much to show for it.

To make matters worse, some of our key engineers had just announced they were leaving the company.

In spite of our woes on the engineering side, epilot had a rare advantage:

A proven product-market fit – Even with our product leaving much to be desired, our paying customers were becoming fans!

Yes, they were sometimes frustrated with the quality of the software and our inability to deliver features they were asking for, but they were totally bought into the vision of what epilot could be and we were clearly delivering value for them.

I think this was thanks to our visionary leadership with deep industry knowledge knowing which problems to solve along with a great sales team and a MacGyver-like customer success team working around the limitations of our software.

We had the right idea, just not a great technical execution yet.

Luckily I knew I could make a difference when it comes to execution.

## RFCs and API first

I went on to establish the platform team I was hired for. We started small with myself and an SRE who had been at epilot a year before me.

The first things the team tackled were improvements to developer workflows such as enabling an [API Design First approach](https://dev.to/epilot/why-we-design-apis-first-e85) for our serverless APIs and building common CI/CD pipelines for the tools our teams were using.

I introduced RFCs for the teams as a tool to discuss designs and proposals to improve our product and work.

With key engineers leaving us, it was important to establish an open culture with teams making independent decisions while focusing on good software design and communication.

![RFCs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s6ofxs17i2550m8mttjq.png)

As one of the very first RFCs shared, I laid out my admittedly optimistic plan to move away from our legacy monolith app.

## The radical 360 plan

I brought my plan directly to senior company leadership triggering a series of discussions in late 2020 to figure out our legacy migration strategy.

In sessions with our CEO Michel, CTO Szilard and head of sales Marlon, it became very clear this would not be just a migration from monolith to serverless. We needed to build the new version of epilot SaaS with a radically different design, starting from a new flexible data layer to power the diverse set of use cases our customers were asking for.

We called it epilot 360. And it would be my job to build it.

From the start of 2021, we established a new strike team to head the effort of building 360. I doubled as the leader of both the platform team and the new 360 team.

The 360 plan was radical. We would completely rebuild our main portal interface using frontend microservices and embed the old product into the new portal as a microfrontend to provide backwards compatibility while we rebuild and migrate features one by one in the new serverless world.

Getting the old monolith to work in the new portal was our first big technical hurdle. We developed a "headless" mode for the old app, where the UI was modified to fit into the new portal layout and implemented secure communication with the parent 360 app to pass information like the current user's session to the legacy app.

From the data side, we continued to split up the legacy SQL database into serverless microservices. We introduced [Hasura](https://hasura.io/) to act as the gateway to synchronise data between the legacy database and our new serverless services.

By March 2021, we had migrated our first module to 360 using the new flexible data model and had shipped a new portal microfrontend for it.

We introduced [Datadog](https://www.datadoghq.com/) for centralised logging and monitoring, as well as to provide crucial analytics and observability tools for our new serverless product.

Finally in July of 2021, we greeted all our users with a whole new 360  login and portal experience, wrapping the old familiar app in our brand new look with serverless features already replacing many legacy views.

![New 360 Login](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w624qiz00mq762xdyh7o.png)

This felt like the first big launch of 360. Although lots of work was still ahead to fully get rid of our legacy app, our users were happy to see us start to deliver on our promises with a new major release of the epilot product.

From here on the rate of new releases in our app would radically increase.

## Head of Engineering

In May of 2021, I was officially promoted to head of engineering which meant I was no longer just in charge of the platform team and the 360 team. I was now in charge of the entire engineering team with our CTO shifting his focus away from engineering to product management.

In the meantime we had also ramped up our recruitment efforts. We published our in-house [engineering principles](https://github.com/epilot-dev/engineering-principles) and built a new recruitment landing page [promise.epilot.cloud](https://promise.epilot.cloud/) to showcase our culture. As a result, we managed to acquire some amazing new engineering talent during 2021. <3

So far it had been mostly just my small team of 4 developers working on 360. Now as the new head of department, I needed to shift the focus of all our by now 25+ engineers and 6 teams to work on the new 360 platform.

This came with some major challenges.

## Scaling the team

One of the biggest challenges was the radically different underlying design of 360 with its flexible data model as opposed to our legacy product's traditional static data model.

Teams initially struggled to wrap their heads around the new [flexible entities](https://docs.epilot.io/docs/entities/flexible-entities); not least because of my struggle to communicate it properly. Through some much needed visual design support and hands-on experience with the product, we slowly built up an understanding of our new 360 product together.

A major focus of the architectural design of 360 was on modularity by utilising frontend and backend microservices combined with our API First software design approach.

This was to allow teams to work independently giving them the freedom to choose their own tools and ways to solve problems.

We found this approach to be a big success as it kept our projects small with teams motivated to try out new technologies, share and learn from other teams, and quickly change approaches when needed.

After the first few months of teams working on 360 it was clear that we were able to move much faster than ever before with our new tech stack.

We adopted continuous deployment across all teams and quickly surpassed an average of >100 production releases each week. This was a huge achievement considering that back when I joined we were able to deploy only 1-2 times per week during a pre-defined maintenance window!

![Production Deployments Graph](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p8bt6azzs70scun0o57v.png)
 
By the end of 2021, all our teams had shipped major features on the 360 product and we had reached enough feature parity for the first new users to be onboarded to epilot completely on 360 with no trace of the legacy product.

We had an MLP - Minimum Lovable Product!

Things would speed up even more throughout the first half of 2022 with teams getting comfortable with 360, shipping more serverless features to get us closer to the magical feature parity state with our rather large legacy product.

We opened up the 360 platform to external developers and partners with our [public developer docs](https://docs.epilot.io/) and [open source SDK](https://github.com/epilot-dev/sdk-js/).

In the meantime our sales and customer success teams have been actively engaged with existing customers to help them migrate to 360. More and more users are now adopting the new features each week and we’re learning from them to make 360 even better.

## Takeaways from the first year

As I'm writing this post in June 2022, after my first full year as head of engineering and after almost a year of running the main epilot application in production on AWS serverless and frontend microservices, I can't help but ask myself:

Was 360 a success?

While my ego would love to give a resounding "Yes!" as the answer, I can't be fully satisfied until we've fully completed the migration of all features from the legacy app and have successfully shut down the old monolith and moved on with happy users.

We're not quite there yet.

Are we building better software, faster? – Yes! The feedback from our customers is very positive and our product teams are delivering features 10x faster than we were back in 2020 when I joined. We're demoing new features every week now!

Are we on track getting rid of our legacy monolith? – Yes! At the time of writing, we're close to 90% feature parity with more users hopping over to 360 each week.

Was it way more difficult than initially thought? – Heck yes! The people side of things turned out to be much more complex than the technical side – as always.

It isn’t easy to align 5 remote product teams to work on a new product redesigned and rebuilt from the ground up.

It isn't easy to introduce big changes to our tech stack, product, and engineering culture.

It isn't easy to keep our users happy while introducing a new product with major design changes and new concepts to learn.

While none of these things are easy, they are surely worthwhile and we strive to get better every day.

## Conclusion

Looking back, I've learned a lot in the past year about leadership, engineering and building products.

With our engineer teams now working well, I've been able to focus my daily work on helping our customers and technical partners hands-on with their adoption of 360. This has really helped me gain better perspective on where the 360 product stands today from our users' perspective.

I've received a ton of feedback; from customers, from colleagues, and from our leadership team.

I’m glad to say things are looking bright for epilot 360!

Still lots to learn and build.
