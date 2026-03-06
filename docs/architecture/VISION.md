# Global Stack — Vision

> *we will someday be the ancients*

## 1. Motivation
Global Stack is an open project for decentralizing the digital world.

**Core problem:**
- Power is shifting toward private corporations, oligarchies, and authoritarian states.
- Increasingly capable AI increases the need for **new systems in the hands of the population**, with **extreme security**.
- Global cooperation needs high-quality networking and **well-defined rules** for open, goal-oriented discourse.

**High-level ambition:**
- Build and maintain an open stack that enables:
  - communication across hostile environments
  - sovereign infrastructure operation
  - collective deliberation with clear rules

## 2. Program framing
This program is intended to be commissionable as a small set of large, legible projects.

**Potential contributors / sponsors:**
- Foundations
- Governments / public institutions
- Initiatives
- Open-source community

**Deliverables (3 program modules):**

| Module       | Purpose |
|-------------|---------|
| **Connect** | Framework/interface for decentralized connectivity across multiple channels |
| **Open OS** | Server OS + client software/OS enabling sovereign networks with user-defined rules |
| **MOOD**    | Deliberation plugin/product that makes collective reasoning and decisions usable |

## 3. System-of-systems qualities
- **Composable:** modules can be enabled/disabled per community.
- **Scalable:** from small local groups to large federations.
- **Customizable:** rules and workflows can be adapted while staying understandable.
- **Multi-client:** Web UI, desktop/mobile client software, and potentially a client OS.

## 4. Connect (concept)
The "glue" layer that connects endpoints across different connectivity channels.

**Initial channel ideas:**
- VPN (e.g. Headscale)
- TOR
- USB stick (encrypted)
- Radio links

**Architecture intent:**
- A unifying interface that exposes: identity, addressing, transport selection, security policies.

**Open questions:**
- Minimum demonstrable set of channels for the first public story?
- Library, daemon, spec, or all three?

## 5. Open OS (concept)
Operational sovereignty:
- Federated networks with user-defined rules
- Data sovereignty as a first-class concept
- OS-level foundation that reduces need for humans to be "the admin"

**Key requirements:**
- Configuration described formally/informally, then enforced by the system.
- System is "self-administering"; users do customization of applications.
- Malware detection is system-driven.
- "No LLM; must be hardcoded" (security-critical control plane).
- Strong preference: **NixOS**.

**Open questions:**
- Show Open OS as roadmap only, or minimal demonstrator?
- Boundary between Open OS and Connect?

## 6. MOOD (in this vision)
MOOD is the deliberation component of the Global Stack. Its goal is to make collective reasoning and decision-making usable for any group, from sports clubs to municipalities.

For the **technical architecture** of MOOD, see `docs/architecture/ARCHITECTURE.md`.
For the **alpha product scope and UX**, see `docs/product/ALPHA.md`.
