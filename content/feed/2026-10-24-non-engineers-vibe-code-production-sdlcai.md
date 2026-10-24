---
title: "I Let Non-Engineers Vibe-Code Our Production Codebase. Eight Months Later."
date: "2026-10-24"
description: "An update to my April post, and the SDLCAI talk on video: 7831 agent PRs, 4582 in production, what broke and the one rule that fixed it."
tags: ["ai", "product", "talks"]
slug: "non-engineers-vibe-code-production-sdlcai"
---

In April I wrote about opening our codebase to the entire company. 629 merged PRs in 60 days, 40 of them from 11 non-engineers. The question I got most afterwards: what happens once the honeymoon is over?

On 13 October I answered it on stage at the SDLCAI seminar in Espoo. The talk is called "I Let Non-Engineers Vibe-Code Our Production Codebase". Here's the video.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0">
<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" src="https://www.youtube-nocookie.com/embed/SL6QypO5BxA" title="I Let Non-Engineers Vibe-Code Our Production Codebase, SDLCAI 2026" loading="lazy" allowfullscreen></iframe>
</div>

[Watch on YouTube](https://www.youtube.com/watch?v=SL6QypO5BxA) · [Slides (PDF)](https://sdlcai.org/media/talks/non-engineers-vibe-code-production/404574e7-178f-48ea-bca5-02245c74ab6a.pdf) · [Q&A with Jussi Hacklin and Sini Tistelgrén](https://www.youtube.com/watch?v=q-4H3JMNDE4)

## The numbers, February to September

- 7831 pull requests opened by agents
- 4582 merged to production
- 807 driven by non-engineers
- 16 non-engineers still shipping code every day

Merged agent PRs per month grew 3,4× from March to September. It never plateaued.

Most of the 807 are not translation fixes, which is what I expected. Designers now send a preview link instead of a Figma file. Product managers fix the annoying thing they've been filing tickets about for years. Customer success ships the change in ten minutes that would have waited six months in a backlog.

## What stuck since April

**The agent lives in Slack.** You tag it like a colleague, in a public channel, and it comes back with a pull request and a preview link. Adoption spreads by watching. PMs watch engineers, engineers watch each other. The vendor matters much less than the pattern: when our Slack integration got repriced, we built our own runtime and nobody noticed the difference.

**If you can't see the change, you can't own it.** Every PR gets a preview link. That's what made it work for people who will never install an IDE.

## What broke

A few weeks in, an agent working for a non-engineer found a way to deploy through our CI pipeline. It never reached production. Our security monitoring caught it. We got lucky.

Same day we landed one rule that everybody can remember: agents and non-engineers open as many pull requests as they want. Engineers review and merge. Same bar as any other change.

You'd expect that to slow things down. Non-engineers merging their own PRs went from 36 a month to 1, by design, and the number of merged agent PRs kept growing. Guardrails build trust, and trust drives adoption.

The bigger lesson was about engineers. A default AWS profile can't tell you apart from your agent, so we cut off all laptop access to production AWS. I wrote that up [here](/feed/we-locked-ourselves-out-of-production/).

## The honest list

- Review is the bottleneck. Writing code is cheap, understanding every change is not. We use AI on that side too.
- Not every PR should ship. About two thirds of non-engineer PRs get merged, the agent average is 59%. A closed PR costs minutes. That's the filter working.
- Agents are confidently wrong. People learn to push back, and non-engineers pick that up fast.
- Engineers over-trust too. My favourite quote of the year, from a PM: "Unfortunately engineers also just trust whatever AI gives them, so we have some weird translations."

## If you want to do this

1. Hire the coworker. Put the agent in Slack and tag it.
2. Open the codebase, with preview links on every PR.
3. Guardrails first. Lock merge permissions before you open access, not after.
4. Write it down. Your context is the bottleneck, not the model.

The people closest to your customers can change your software now. Are you letting them?

Happy to compare notes with anyone wrestling with the same questions. The [original April post](/feed/our-entire-company-ships-code-now/) has the full setup.
