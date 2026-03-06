# Thesis Summary (relevant excerpts) — Background_thesis_Abschlussarbeit

This document summarizes the **relevant concepts** from the thesis excerpts provided in chat, focusing on how they inform the **Global Stack / MOOD** direction and the prototype’s feature scope.

## 1. Problem framing / motivation
- The world is becoming **logistically closer**, while some societies are **growing apart**.
- Profit-oriented mainstream social platforms shape interaction patterns in ways that reduce:
  - constructiveness
  - meaningful exchange
- A general, customizable interface is needed to support **meaningful and constructive online exchange**.

Key claim:
- The negative dynamics are not an “anthropological constant”, but largely shaped by platform design (“code is law”).

## 2. Core thesis: unify deliberation tools into one platform
- Many tools support fragments of deliberation (e.g. voting, discussion, ideation, monitoring).
- The thesis argues these should be combined into **one platform** where functions can be:
  - linked
  - sequenced
  - embedded into a broader framework

Desired platform concept:
- An “intelligent hub” that groups can **tailor to their needs**.
- The way decisions are made is **up to the users** (board, owner, parliament, or new online consensus processes).

## 3. Framework concepts (key entities)
A high-level conceptual structure is proposed, leaving room for future finer-grained design.

### 3.1 Groups & subgroups
- Subgroups are themselves groups; groups can be nested arbitrarily.
- Members can access modules/processes/components from parent groups.
- Visibility models can vary (examples mentioned):
  - public
  - only results
  - only info and members
  - private
  - invisible

Potential advanced concept:
- “Federalization”: deliberation on high levels via representatives/delegations from subgroups.

### 3.2 Processes
- A deliberation “debate” often has multiple phases.
- Literature often suggests a 5-step deliberation (example):
  1. identify public values
  2. develop options
  3. estimate consequences
  4. weigh alternatives
  5. decision
- The framework should allow these phases to be **customizable**.
- Processes can be:
  - sequential or parallel
  - template-based (“Templates”)
  - closable by deadline or admin

### 3.3 Modules
- Processes are composed of modules; modules are chosen and arranged per process.

Module categories and examples (as listed):
- **Problem/Objective Definition**
  - Identify / Validate / Prioritize problems/objectives/values
- **Debate Modules**
  - Pro/Contra discussion
  - Open discussion
  - Ideation challenge
  - Estimate consequences
  - Compare options
- **Live Support Modules**
  - Live event
  - Breakout rooms
  - Minipublic / deliberative polls
  - Chatroom (text/voice/video)
- **Decision Modules**
  - Vote
  - Prioritize
  - External decision + statement
- **Action Modules**
  - Feedback loop from execution team
  - Task assignment
- **Other Modules**
  - Evaluation
  - Brainstorming
  - Survey
  - Petition
  - Announcement

Important design stance:
- “All conceivable options” should be available, because:
  - a universally “best” deliberation mode is unknown
  - groups differ by culture and context
  - the platform should enable comparative research and evaluation

### 3.4 Components
Components are defined as features that are always available and not linked to an individual process.

- **Mandatory**: Analysis tools
- **Optional**: Knowledge hub (explicitly not solved in the thesis; future work)
- **Optional**: Platform features (chat, documents, calendar, profiles)
- **Optional**: Principles (identify/verify/prioritize principles like fairness/sustainability; monitor them)

## 4. UI / interaction design implications
### 4.1 Debate layout
- Typical “sort by popularity” can distort debate (“rich-get-richer”), suppress minority views, and reward extremes.
- Argument mapping is discussed as a context-oriented alternative, with multiple layout styles.
- Epistemic goals (collective knowledge) are highlighted as important; integration of knowledge resources into debate layouts is recommended.

### 4.2 Moderation
- Moderation tradeoffs:
  - High moderation can increase validity but can be labor-intensive and create suspicion.
  - Low moderation can increase perceived fairness and participation.
- Pre- vs post-moderation.
- Proposed mechanisms include limited moderation for insults, or mutual moderation with randomly chosen moderators.

## 5. Funding & distribution
- A subset of related work argues for:
  - large-scale open-source
  - led by an independent institution
  - funded with public money
- Reasons include:
  - transparency
  - reduced data harvesting
  - public influence over the interface

## 6. Prototype approach (as described)
- A web app prototype demonstrates feasibility and basic functions.
- Uses imaginary groups and storylines to create an immersive, exploratory experience.
- The described prototype matches the current repo approach:
  - Next.js + TypeScript + Tailwind
  - mockup data in TypeScript files
  - curated scenarios

## 7. Implications for Global Stack / MOOD (actionable)
### 7.1 What the current prototype already aligns with
- Group/subgroup structure with story-based scenarios.
- Processes as ordered sequences of modules.
- Module types that cover several thesis module categories.
- External decision + statement (present as `ExternalDecision`).

### 7.2 What the alpha roadmap should preserve
- Keep “all conceivable options” as an architectural direction, but present a **right-sized curated path**.
- Ensure the platform supports:
  - group-specific rules and configuration
  - multiple visibility modes
  - templates for common process lifecycles

### 7.3 What to add next for a usable alpha
- Real interaction + persistence:
  - writing comments/messages
  - submitting votes/priorities
  - saving edits
- A clear separation between:
  - demo seed data
  - instance/user-modified data

## 8. Open questions for integration into ARCHITECTURE.md
- Which debate layouts should be showcased first (threaded, pro/con, argument map)?
- How do we represent “rules before a debate” in the UI without overwhelming users?
- Minimal moderation stance for alpha (insult filter only vs lightweight community moderation)?
- Visibility matrix for groups/subgroups in alpha (which modes to support first)?
