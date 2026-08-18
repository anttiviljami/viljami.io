---
title: "We Locked Ourselves Out of Production"
date: "2026-08-18"
description: "A few months back an engineer was setting up a build pipeline with an AI coding agent. The agent held..."
tags: ["security", "aws", "ai", "agents"]
canonical: "https://dev.to/epilot/we-locked-ourselves-out-of-production-1n22"
slug: "we-locked-ourselves-out-of-production"
---

A few months back an engineer was setting up a build pipeline with an AI coding agent. The agent held production AWS credentials. It created a CloudFormation stack in production, then "cleaned up" by deleting it. Straight in prod, outside CI/CD.

Our monitoring caught it immediately. An alert fired the moment the change happened: deployment in the production account by a role that is not part of the approved CI/CD pipeline.

Nothing broke. The engineer had confirmed each step, and detection worked exactly as designed. But detection is not prevention. If the agent had deleted the wrong stack, the alert would have fired too. And everyone would be having a really bad day.

Nothing happened but the moment scared me enough to take a step back to rethink how we deal with engineer production access.

You've read the public versions of this story. [An agent wiped a founder's production database through Cursor during ordinary development work](https://www.fastcompany.com/91533544/cursor-claude-ai-agent-deleted-software-company-pocket-os-database-jer-crane). Replit's agent [deleted a production database during a code freeze, then fabricated thousands of fake records to cover it up](https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-coding-platform-goes-rogue-during-code-freeze-and-deletes-entire-company-database-replit-ceo-apologizes-after-ai-engine-says-it-made-a-catastrophic-error-in-judgment-and-destroyed-all-production-data). The pattern is always the same: a "clean up and roll back" that looks reasonable to an agent and is catastrophic in production.

We run AI agents across engineering, and we want to. It's part of how epilot operates. But our AWS access model was designed before that, and it assumed a careful human is the only thing holding production credentials.

That assumption is dead. Today we buried it: no engineer at epilot can reach production AWS directly from their laptop anymore. Not the CLI, not the console. Here's what replaced it.

## The design

![broker flowchart](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/jdp25rvf1hf3u7kzx3ab.png)

Production access at epilot was already technically short-lived: time-limited sessions behind MFA. On paper, that looks fine.

In practice, sessions outlive the reason you opened them. You assume prod for a quick check, switch to another task, and a live production session stays behind on your machine. Usually as the global default AWS CLI profile.

That means every process on the laptop is connected to production by default. Your test suite. Your scripts. Every AI agent you run. Nobody decided that. It's just what a global profile on a busy machine does.

So we changed who the prod roles trust. Developer identities can't assume them at all anymore. The roles trust exactly one principal: an internal access broker. And the broker only mints a session after a human walks through two separate surfaces: a web portal behind SSO (the portal and its REST API both sit behind it) and a manual approval in Slack.

The flow:

1. **Request.** Open the Admin Portal, pick an access level and a duration, write why you need it. Takes 30 seconds.
2. **Approve.** The portal posts your request to a Slack channel the whole company can see, and you approve it there. This is the trick: the Slack approval is a second factor, not a peer review. It's a separate app on a separate surface, so an agent driving your terminal or your browser session can't complete it. Approving your own request is fine. Another engineer can approve it too, but nobody has to. The Slack thread is the audit log.
3. **Connect.** The broker mints a session named after you and its approver, then you choose: a one-click sign-in link to the AWS Console, or a throwaway EC2 jump host. The jump host lives in a private subnet, reachable only through Session Manager. No SSH keys, no open ports. Ready in about 90 seconds.
4. **Expire.** Sessions die on their own. Jump hosts are destroyed with them.

There are three access levels, and the default is read-only:

- **Read-only**: inspect resources, read logs and metrics. No writes, no deploys. This covers most production visits.
- **Developer**: day-to-day production support. Deploy through the CI/CD pipeline (never around it), read logs, manage infra. Cannot delete stacks, read SSM secrets, touch customer data directly or decrypt with KMS CMKs.
- **Administrator**: full access. Assume only if you absolutely need it.

![access request dialog](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/4z17a5wxk32yt6m40bcn.png)


Notice what the developer tier can't do. Accessing customer data at epilot is intentionally difficult. No direct reads from the data stores, no decrypting with customer-managed KMS keys, not even for day-to-day production support. And even read-only goes through the broker. We treat read access as access.

Escalation is deliberate, like everything else in the flow. You don't get developer access out of habit. You ask for it, and the reason sits in Slack next to your name.

The access page in our Admin Portal states the whole contract in four principles: deliberate and isolated, second-factor approval, attributed and time-limited, least privilege. That's not a compliance poster. It's literally the UI copy engineers read while requesting access.

The jump host is the hardened path: **no AI agents installed, none allowed**, only the minimal tooling for production support, with full shell-session and AWS API logging. Clickops and incident investigation still work. That's what the console link is for. But a console session is still a browser, so we treat it as the weaker option and the jump host as the default.

For emergencies there's a separate break-glass admin role. A small named group can assume it directly with MFA, and every use fires a loud alert in our security channel. Emergency access stays open without reopening the everyday hole.

## Self-approval? Seriously?

![Self approved request](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/p6vpzkthbyq5qehy86sm.png)

The first reaction to this design is always the same: what's the point if you approve yourself?

Our engineers were always trusted with production. You build it, you run it. That hasn't changed. A second human clicking "approve" would add latency and theatre, not security. Rubber-stamp approvals are how big orgs pretend to have controls.

The threats we're closing are ambient credentials and autonomous agents. Those are handled by the credential-free laptop and the out-of-band approval, not by another pair of eyes.

## What this doesn't solve

An approved human can still break production. So can an agent driving an approved console session. The goal was never to make damage impossible. It's to make production access deliberate, attributed and temporary instead of ambient.

The broker itself is now a high-value target. It's the only thing that can assume prod roles, so we scoped it tightly, locked it down and watch it closely. We've concentrated the risk in one small surface we can actually defend, instead of spreading it across every laptop in the company.

Break-glass is a deliberate bypass. We contain it with a tiny group, MFA and loud alerting rather than pretending it doesn't exist.

Can't an agent just approve itself in Slack?

Yes, technically. A rogue agent running on your machine could technically take over your browser session to create the request, then access Slack to approve it.

But to get there, a lot of things already have to have gone really badly wrong:

1. You gave the agent full access to your browser with a logged in admin session.
2. You gave the agent full access to Slack.
3. You let the agent act without verifying anything. Nothing and no one is checking what it does.
4. The agent decided to go out of its way to find out how to do this and perform all the steps

But this is of course not a realistic agent setup any engineer at epilot would run. Security always comes in layers. What we prevent with this setup are the common footguns where it was too easy to give AI unfiltered prod access.

## The rollout

We ran the broker for two weeks alongside the old access and asked engineers to stop using their direct prod roles. Today we flipped the trust policies and removed direct assumption entirely.

The announcement slack post filled with celebration emojis. Engineers cheering for losing production access tells you something about how everyone actually feels about agents sitting next to prod credentials.

This is how we approach cloud security in general. Security at epilot is not a separate department reviewing things after the fact. It's a core engineering competence: every engineer builds it, runs it and secures it, and external pentests keep us honest. The architecture does the enforcing: SSO in front of everything, CI/CD as the only path to deploy, monitoring that flags a rogue change within seconds, and production access that requires deliberate, named, visible intent.

Accessing customer data is supposed to be difficult. We built it that way on purpose.

We didn't build this because we fear AI agents. We built it because we run them everywhere and intend to run more. Banning agents is easy. YOLOing them into production is even easier. Building the rails that let you run them at full speed is the actual work, and it's why we'll adopt the next generation of agents faster than the companies still deciding whether to allow them.

You build it, you run it still stands. You just don't run it from the machine your agent lives on.
