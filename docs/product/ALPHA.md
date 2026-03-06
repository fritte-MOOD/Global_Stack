# MOOD Alpha — Product Specification

## 1. Alpha stance
**Capabilities first, restrictions later.**
The system should support "everything is possible" and only restrict when needed.

## 2. Prototype goal
The next prototype must be:
- **Expressive** — communicates the ideas quickly
- **Understandable** — low cognitive load
- **Right-sized** — not too many features
- **Credible** — rules feel real, not hand-wavy

**Success criterion:**
A new viewer can understand the concept in minutes and can "play" through one deliberation end-to-end.

## 3. Two entry points

| Entry point | Description |
|-------------|-------------|
| **Curated demo** | Existing example groups with finished/ongoing processes (seeded data, presentation-ready) |
| **Collaborative sandbox** | A community starts with a starter kit and creates/modifies their own processes |

Additionally: users can **continue working on top of seeded demo processes** (seeds are starting points, not read-only museum data).

## 4. Group modes (A / B / C) — configurable per group

| Mode | Who creates/edits | Who participates |
|------|-------------------|------------------|
| **A — Admin-led** | Admins only | Members comment/vote |
| **B — Member-driven** | Members under basic guardrails | All members |
| **C — Public** | Open participation | Anyone (requires moderation/anti-abuse) |

**Default for new groups:** TBD (see open questions).

Implementation note: build capability-complete, then default UI + policy to safer settings.

## 5. Persistence & save behavior

### 5.1 Default: editable seeds
Users can modify the curated demo data directly.

### 5.2 Save prompt
On first change (or on navigation away), the UI asks:
- **Save changes** → persistent (requires login)
- **Keep tinkering without saving** → ephemeral (lost on reload)

### 5.3 Login
Saving requires a **simple login** (username + password).
Unsaved work is treated as a **session draft** (client-side only).

### 5.4 Data split
- **Seed data** — shipped examples (curated demo)
- **Instance data** — user-created or user-modified

## 6. Starter kit
A new collaborative sandbox starts from a **starter kit** (not fully empty).

**Exact contents:** TBD — candidates:
- 1 group + 0 processes (completely free)
- 1 group + 1 empty process template (guided creation)
- 1 group + 1 editable example process (shows the principle)

## 7. UI principles
- Default to **one primary path** ("Start here") rather than many features.
- Each view answers one question:
  - "What is this process about?"
  - "Where are we in the flow?"
  - "What do I need to do now?"
  - "What did we decide?"
- Prefer visuals for: timeline/flow, role differences, decision legitimacy.

## 8. Open questions

### 8.1 Demo flow
- Exact minimal module sequence to show?
  - Example: Discussion → Proposal → Decision → Summary
- Decision mechanism: simple majority vote? consent-based? other?

### 8.2 Starter kit contents
- Which of the three candidates (see section 6)?

### 8.3 Audience
- Primary audience for the first presentation?
  - Technical open-source contributors?
  - Institutions/foundations?
  - Policymakers?

### 8.4 Default group mode
- Default for newly created groups: Mode A, B, or C?
