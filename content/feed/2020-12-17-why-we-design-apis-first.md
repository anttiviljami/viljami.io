---
title: "API First: How Teams Collaborate on Software Design"
date: "2020-12-17"
description: "TL;DR:   APIs are the single most useful design tool for teams collaborating on software. Teams who..."
tags: ["api", "design", "architecture"]
canonical: "https://dev.to/epilot/why-we-design-apis-first-e85"
slug: "why-we-design-apis-first"
---

![Winter is here](https://dev-to-uploads.s3.amazonaws.com/i/ra5ayqosajpsvy8iqa17.png)

**TL;DR:**

- APIs are the single most useful design tool for teams collaborating on software.
- Teams who focus on API design produce better designed software and collaborate more efficiently by parallelising their work around concrete technical contracts.
- Thinking of APIs as the core way to add features into software leads into building up a platform for developers to bootstrap new features on top of a library of existing core APIs.

### Software Design & Features

As developers we intuitively think of features as the basic building blocks for the software we design and build.

Features are the capabilities our software provides. They answer the question: What does the software do?

We design software around features. Some features are user-facing while many features are purely technical and serve internal purposes to make the system as a whole work. 

A software team will add new features, extend existing features and sometimes deprecate and remove old features to be succeeded by new improved ones.

Tests are used to describe features as code and make sure they follow the intended design.

This happens regardless of whether a team follows agile methods and talks about *epics* and *user stories* instead of features. These are just tools to help decide which features the software should have and how to prioritise building them.

### The Problem

![The Problem](https://dev-to-uploads.s3.amazonaws.com/i/k5f1bmonht2jzmh97go7.png) 

In a small team of up to 5-8 people working on the same project, it's still relatively easy to keep track of all features and come together to make decisions on software design.

This is no longer the case when you scale to multiple teams working on the same software.

Questions like these become increasingly harder to answer:

- Which team should be responsible for this feature?
- Can I change this feature without breaking other parts of the software?
- How was this feature intended to be used?
- Could this feature I'm building also be useful to other teams?

### Technical Debt

As a result, software teams easily get into situations where the quality of the software starts to suffer; ultimately leading to unmotivated and poorly performing teams having to constantly deal with symptoms of technical debt:

- Inconsistent APIs, bad design
- Features overlapping in functionality
- Tightly coupled features that are hard to extend without breaking things
- Having to look into implementation to understand what each piece does
- "That one thing only Sam knows about"

How do we fix the problem of multiple teams and individuals collaborating on the same software?

### Software Architecture

![Software Architecture](https://dev-to-uploads.s3.amazonaws.com/i/4atfby7w634t1yvdeks5.png) 

This is the point we start taking the idea of software architecture seriously. Maybe even hire some people with _Architect_ in their job title to solve the problem.

Software architecture on the surface is about designing and organising the pieces that make up software to make it easier to understand and keep developing.

For our purposes, I would argue it's also about helping teams collaborate and organise their codebases by providing a common language and a set of abstractions to communicate about the design of the system.

Here are a few popular architectural patterns a software architect may suggest to help design your software:

- [DDD (Domain Driven Design)](https://dev.to/microtica/the-concept-of-domain-driven-design-explained-1ccn)
- [Onion Architecture](https://medium.com/@shivendraodean/software-architecture-the-onion-architecture-1b235bec1dec)
- [SOA (Service Oriented Architecture)](https://www.ibm.com/cloud/learn/soa)
- [Microservices](https://dev.to/microtica/everything-you-need-to-know-to-get-started-with-microservices-5243)
- [Event-Driven Architecture](https://dev.to/heroku/best-practices-for-event-driven-microservice-architecture-2lh7)

One thing all these patterns have in common is they attempt to abstract the software into a set of smaller, encapsulated units of software.

Most of the units expose an API. An interface to allow other parts of the software to interact with it.

### API as a Design Tool

So it turns out thinking about APIs is pretty important for software architecture.

I would go as far as to say the majority of all software in existence is there to provide APIs for other pieces of software. Think software libraries, OOP interfaces, operating systems: software meant to be used by other software with APIs.

In fact APIs are so important, I'd argue API design is the single most useful design tool for teams collaborating on software design.

Not UML diagrams.

Not entity relationship diagrams.

Not abstract architecture diagrams.

API Design.

### Why API Design?

If software architecture is about building elaborate systems of features provided by small encapsulated units of software, and those features are mainly manifested as APIs, how can we possibly avoid talking about API design as the centerpiece of the whole design?

That would be like designing a public transportation system without looking at the connections between lines.

Or designing a factory line without looking at how the materials move between the machines.

I imagine those things would be very difficult to do.

### API First Design

![API First Design](https://dev-to-uploads.s3.amazonaws.com/i/2qx1syyoa8eofg7ocmxi.png) 

Next time your team starts working on a feature, after you've drafted a design for how the feature might look like to the user, design the APIs needed for that feature.

Try designing the APIs with code. Make sure not to start implementing it yet. Use types, interfaces or technical API definition standards.

Here are some popular standard tools for designing HTTP APIs:

- [Postman](https://www.postman.com/api-design/)
- [GraphQL Type Language](https://graphql.org/learn/schema/)
- [OpenAPI Specification](http://spec.openapis.org/oas/v3.0.3)
- [AsyncAPI Specification](https://www.asyncapi.com/)

Share the API design. Include it as part of a proposal or RFC (request-for-comments). Provide examples for how the API would be used. Invite colleagues to give feedback and make suggestions (PRs) to improve the design. 

Once the comments stop coming in, run with it. This API will now become part of the beautiful software you're building together.

### Efficiency

In addition to producing higher quality software, teams who focus on API design first are able to work more efficiently by parallelising work around the API contract.

Because APIs work like contracts, they can have a future start date. A promise that this API will exist in the software at a later date.

Even before a team starts implementing an API, other teams can already start building new software depending on the technical definition of the API.

Mocks can be used to test the software even before a single line of code has been written to implement the API. 

Changes to the API can be proposed with concrete PRs. This is a lot easier while the API only exists as a design with no implementation.

This is a really powerful way to parallelise work and avoid blocking dependencies between teams.

### Example of an API First Workflow

Let's say we have two product teams working on an Ecommerce app, both with their own backlogs and user stories they wish to deliver.

**Team Alpha** plans to add a price notification feature that lets users know when pricing has changed on products they saved in a watchlist.

**Team Omega** plans to add a new improved search feature that provides product recommendations for users based on their purchase history and products they have saved in a watchlist.

Both teams need a watchlist feature to implement their end-to-end user stories.

### A Story of Collaboration

Team Alpha starts working on their price notification story by producing some UI wireframes alongside API designs as OpenAPI definition files in a git repository.

The designs are included as part of a company internal RFC document describing the solution for price notifications.

Omega team views the RFC and notices that Alpha's proposal includes the watchlist feature they need but the Watchlist API is missing a way to fetch all saved products for a user, a feature needed to come up with the recommendations for Omega's search feature.

Omega then makes an adjustment in the OpenAPI definition adding the missing feature to the API design and submits a PR, which gets merged after review from Alpha.

As both teams are happy with Alpha's proposed design, Alpha gets to work on their price notification feature.

Meanwhile Omega submits their own RFC proposal with designs for the improved search feature using the Watchlist API definition as part of the solution. After some collaborative iteration on the RFC document, Omega is ready to continue with their own feature.

Both teams work on their respective features in parallel, mocking the Watchlist API to test out their features.

Later, Alpha informs Omega that the Watchlist API has been implemented as part of their sprint. Omega tests the newly implemented API and is happy to see their search feature now working as designed.

Using this workflow, both teams efficiently collaborated on the design of the software using RFC documents to describe their solutions, including technical API designs to enable working with version control and Pull Requests, both teams working in parallel to complete their user stories.

### Platform of Features

![Platform of Features](https://dev-to-uploads.s3.amazonaws.com/i/tjlhl300h0loun1mf7aj.png) 

As teams focus on APIs first, they end up building up a platform of features.

Focusing on well designed APIs to build end-to-end features, the APIs will implement platform features that can be leveraged by other teams working on other parts of the software.

Smart companies will start building up a Developer Portal, a central repository for the technical API definitions and start providing tools and well written documentation to consume platform APIs.  Maybe even release language-specific SDKs to make consuming versioned APIs as easy as installing software packages.

At this stage you have a level 4 API First engineering organisation (see: [4 Levels of API adoption](https://dev.to/epilot/4-levels-of-api-adoption-2i0p)) with teams able to iterate fast by collaborating on the software design on a detailed level, constantly expanding the platform with new APIs and tools to build and consume them.

This is a good place to be. 💙
