---
title: "How I Got Product Engineering Wrong"
date: "2024-10-13"
description: "If you've seen my posts lately you've probably seen a lot of talk about Product Engineers: software..."
tags: ["product", "ai", "sauna"]
canonical: "https://dev.to/epilot/the-sauna-epiphany-how-i-got-product-engineering-wrong-35jg"
slug: "the-sauna-epiphany-how-i-got-product-engineering-wrong"
image: "/assets/covers/the-sauna-epiphany-how-i-got-product-engineering-wrong.webp"
imageAlt: "How I Got Product Engineering Wrong"
---

If you've seen my posts lately you've probably seen a lot of talk about _Product Engineers_: software engineers who talk in customer problems and take pride in the products they build, not only the code and technologies they use.

My core thesis is that with the rise of AI, the expectations for software engineers are being redefined, moving away from narrow programming roles: backend, frontend, C#, Java, React, etc. fast becoming obsolete due to AI tools like [Cursor](https://www.cursor.com/) lowering the barrier of entry and unlocking productivity with any technology.

The days when you could coast on your ability to churn out code are over. If you're still clinging to the idea that you're safe just because you know how to write code in a widely used language or framework you're in for a rude awakening.

I believe this trend is likely to be the biggest industry shift in my lifetime, even surpassing the agile movement of the last 20 years. And I'm not the only one talking about it. ([#1](https://blog.pragmaticengineer.com/the-product-minded-engineer/), [#2](https://hybridhacker.email/p/how-to-become-a-product-engineer), [#3](https://thesoftwareengineeringtimes.substack.com/p/are-product-engineers-replacing-software), [#4](https://saranga.dev/from-code-monkey-to-product-engineer-the-evolution-of-software-engineering-in-the-age-of-llms-3c79a508464d), [#5](https://thesoftwareengineeringtimes.substack.com/p/are-product-engineers-replacing-software))

But I got it wrong.

Not entirely wrong, but I made it more complicated than it needed to be. In my quest to define what it means to be a product engineer, I overlooked the power of simplicity and ironically did not think enough about the customer: the ambitious software engineer thinking strategically about their careers.

## I overengineered it

In my earlier attempts to help engineers break out from purely technical roles, I published an extensive checklist to help engineers think and ask questions as product engineers. It covered everything from understanding the user and the market to measuring success and staying ahead of industry trends.

Here's a taste of that checklist:

- [1 Understand](https://dev.to/epilot/the-product-engineer-checklist-469d#1-understand)
  - [1.1 Who's the user?](https://dev.to/epilot/the-product-engineer-checklist-469d#11-whos-the-user)
  - [1.2 Who's the customer?](https://dev.to/epilot/the-product-engineer-checklist-469d#12-whos-the-customer)
  - [1.3 What's the market?](https://dev.to/epilot/the-product-engineer-checklist-469d#13-whats-the-market)
  - [1.4 Ask Why](https://dev.to/epilot/the-product-engineer-checklist-469d#14-ask-why)
  - [1.5 What do we already know?](https://dev.to/epilot/the-product-engineer-checklist-469d#15-what-do-we-already-know)
- [2 Craft](https://dev.to/epilot/the-product-engineer-checklist-469d#2-craft)
  - [2.1 Am I proud of what I'm building?](https://dev.to/epilot/the-product-engineer-checklist-469d#21-am-i-proud-of-what-im-building)
  - [2.2 Does the product feel good?](https://dev.to/epilot/the-product-engineer-checklist-469d#22-does-the-product-feel-good)
  - [2.3 How do I get there faster?](https://dev.to/epilot/the-product-engineer-checklist-469d#23-how-do-i-get-there-faster)
  - [2.4 Teamwork](https://dev.to/epilot/the-product-engineer-checklist-469d#24-teamwork)
- [3 Growth](https://dev.to/epilot/the-product-engineer-checklist-469d#3-growth)
  - [3.1 How do I measure the success of my work?](https://dev.to/epilot/the-product-engineer-checklist-469d#31-how-do-i-measure-the-success-of-my-work)
  - [3.2 How do I maximise the impact of my work?](https://dev.to/epilot/the-product-engineer-checklist-469d#32-how-do-i-maximise-the-impact-of-my-work)
  - [3.3 How do I stay ahead of the curve?](https://dev.to/epilot/the-product-engineer-checklist-469d#33-how-do-i-stay-ahead-of-the-curve)
- [4 Product Vision](https://dev.to/epilot/the-product-engineer-checklist-469d#4-product-vision)
  - [4.1 What’s our North Star?](https://dev.to/epilot/the-product-engineer-checklist-469d#41-whats-our-north-star)
  - [4.2 How does my work impact the overall design of the product?](https://dev.to/epilot/the-product-engineer-checklist-469d#42-how-does-my-work-impact-the-overall-design-of-the-product)
  - [4.3 What's the ambition level?](https://dev.to/epilot/the-product-engineer-checklist-469d#43-whats-the-ambition-level)

Great stuff, but let's be honest — no engineer is going to run through a 15-point checklist to make a product decision. Just seeing this long list of questions can be totally overwhelming, especially if you're used to being in a technical role.

If we expect engineers to actually start doing this stuff, the core idea needs to be simple and easy to remember.

## The Wake-Up Call in the Sauna

As I'm writing this post, I'm enjoying a company working vacation in a nice hotel in Mallorca with my epilot colleagues. I was having a conversation in the hotel sauna with a principal engineer where something he said in passing suddenly clicked for me.

He was venting about some engineers on his team who seemed to be diving head first into coding without bothering to understand the problem. _"It's so easy. Every engineer should be able to answer what problem they're solving, who the customer is, and what the impact of the work they're doing is."_

That hit me like a splash of cold water in a 100°C Finnish sauna.

He was totally right.

## Boiling It Down to 3 Essential Questions

To think like a product engineer, it's already enough to start with just three simple questions:

- **What's the problem?**
- **For who?**
- **Why is this important?**

Let's dive a bit deeper into each one.

### 1. What's the problem?

Stop coding for a second. Do you really know what you're trying to solve? Not the ticket description in Jira, but the real-world issue. If you can't articulate the problem in simple plain English, you have no business writing a single line of code.

### 2. For who?

Identify your user and customer. Sometimes they're the same person; other times, they're not. Understanding who will use your product (and who will pay for it) is crucial. It shapes the way you approach the solution and helps you tailor the experience to meet their needs.

### 3. Why is this important?

As engineers there's never a shortage of things we could improve or implement. If solving the problem doesn't make a meaningful difference, why are you wasting your valuable time? We're not here to build features that nobody uses or cares about. Connect your work to something that actually matters and helps build your track record.

By anchoring your work in these three questions, you immediately move from code monkey to a high value product-minded engineer. Still a rare breed. You're not just implementing features someone else decided to build; you're elevating yourself to a position to influence product decisions and build smarter.

## Leverage Your Team—They're There for a Reason

The biggest mistake engineers make is thinking they have to find all the answers themselves.

Most of us are lucky to work in a product team with other disciplines like UX researchers, designers, PMs and business stakeholders whose job is to help answer these questions.

By leaning on your team, you not only find better answers but also foster a more collaborative and innovative environment.

Product engineering is a team sport.

## Taking Action: Start Asking the Right Questions Today

So, the next time you tackle a new topic, pause for a moment before diving into code. Ask yourself:

- **What's the problem?**
- **For who?**
- **Why is this important?**

Write down your answers. If you don't know, reach out to your team and find out. This simple practice can transform your approach to work, leading to better decisions, more impactful solutions, and a greater sense of ownership.

Congratulations, you just became a Product Engineer! 

## Join the Conversation

I'd love to hear your thoughts on this simplified approach to product engineering. Have you tried asking these three questions in your work? What impact did it have? Share your experiences in the comments below.

Consider giving the [GitHub repository](https://github.com/anttiviljami/product-engineer-manifesto) a star if the product engineer role resonates with you!
