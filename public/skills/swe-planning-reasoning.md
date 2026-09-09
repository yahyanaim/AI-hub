---
name: swe-planning-reasoning
description: >
  Think like an experienced software engineer before touching code: transform ambiguous
  ideas into clear, proportionate, testable plans. Covers requirements, business rules,
  scope, edge cases, trade-offs, testing strategy, and definition of done. Anti-overengineering
  by default.
---

Software Engineering Planning & Reasoning
Your role before touching code: think like an experienced software engineer, not a code generator. Transform an ambiguous idea into a clear, proportionate, testable plan — then execute it.

This is about engineering procedure and judgment, not a mandated architecture or stack.

Core workflow: Understand → Define → Design → Decide → Plan → Implement → Test → Document

Core principle: "I can generate the code" is not the same thing as "I understand what should be built." The second is software engineering; only that produces the first well.

1. Understand the Problem
Before any tech decision, identify: What problem are we solving? Who has it? What does success look like? What's explicitly requested vs. implied-but-necessary? What's still unknown?

Don't invent requirements. If an ambiguity doesn't block progress, make a reasonable assumption and state it. If it would fundamentally change the implementation, ask before proceeding.

Booking system — don't think "I need Express + MongoDB + JWT." Think: "Users need to create bookings for available slots while preventing conflicting bookings." Problem before technology.

2. Define Requirements
Functional: what the system must do (create booking, cancel, view slots...).
Non-functional: only the qualities that are actually relevant here (performance, security, reliability, scalability, maintainability, data integrity). Don't add "enterprise-sounding" NFRs a small internal tool doesn't need.
3. Identify Business Rules
Business rules matter more than framework choice. For every important operation ask: "What must always remain true?"

"Two confirmed bookings must never occupy the same resource and time slot" — this rule should shape the data model, the logic, DB constraints, and the tests.

4. Define Scope
Explicit In Scope / Out of Scope. Never add a feature because it's "cool" or a technology because it's popular. The only question: does this solve a real requirement of this project?

5. Identify Assumptions & Constraints
Users, traffic, deadline, budget, team size, existing infra, required tech, external APIs, hosting, auth requirements. Don't design for imaginary scale — a 100-user app isn't architected for 100M users unless explicitly required.

6. Define Acceptance Criteria
Testable and observable, in Given → When → Then form.

Bad: "Booking works."
Good: "Given a slot is already booked, when another user attempts to book it, then the system rejects the request and creates no duplicate."
7. Design Before Coding
Design the minimum system that satisfies the requirements: architecture, data model, API contracts, auth, key workflows, error handling, integrations, component responsibilities. Proportional to the problem — no over-design.

8. Make Technical Decisions Explicitly
Ask "what problem does this solve here?" — not "what could I use?" Prefer the simplest technology that satisfies requirements. Avoid technology theatre: don't reach for Redis, Kafka, RabbitMQ, microservices, Kubernetes, or event-driven architecture just to look advanced.

9. Evaluate Trade-offs
When a decision has real consequences, name the trade-off explicitly (e.g., Postgres gives relational integrity and transactions, at the cost of schema rigidity vs. a document DB). There's rarely one objectively correct answer — engineering is choosing the right compromise for this project.

10. Think About Edge Cases
For every critical operation: simultaneous requests, duplicate submission, invalid data, missing resource, external API failure, DB failure, expired auth, unauthorized access, partial success, retried requests.

Concurrency is especially important for anything involving shared/limited resources — don't just mention the race condition, decide where it's prevented: application logic, DB constraint, transaction, locking, or a combination.

11. Define Critical Business Flows
Write the logical flow before coding important operations.
Create Booking → validate request → authenticate user → validate resource → check availability → apply business rules → persist safely → return result.

Implementation details depend on the stack; the logic should be clear before either is chosen.

12. Define the Minimum Architecture
Only after understanding the problem. A simple layered flow (routes → controllers → services → repository/DB) is an example, not a mandate — choose based on complexity, team size, growth, maintainability, and deployment needs. Don't add architectural complexity without a reason.

13. Define the Data Model
Entities, fields, relationships, keys, unique constraints, indexes, validation rules. For booking-like systems: how is a conflicting state prevented? Don't rely on frontend validation alone — enforce integrity as close to the data as appropriate.

14. Define API Contracts
For each important endpoint: method, path, auth requirement, request/response shape, status codes, error format. Design endpoints for real use:

POST /bookings
{ resourceId, startTime, endTime }
→ 201 created | 400 invalid | 401 unauthorized | 404 not found | 409 conflict
15. Authentication & Authorization
Only introduce auth if requirements actually need users or protected operations. If needed, define who can authenticate, roles, permissions, ownership rules. Don't add roles with no business purpose.

16. Choose the Stack
Only after requirements and design are understood. Weigh existing constraints, team familiarity, dev speed, maintainability, ecosystem, deployment, complexity. Every significant choice should be able to answer "why did we use this?" — not just "we used this."

17. Define Project Structure
Choose a structure proportional to complexity. A tiny project may need far fewer layers than the canonical routes/controllers/services/repositories/models/middleware/utils/tests. Don't create near-empty files just to follow a pattern.

18. Define Critical Tests Before Implementation
Identify what must never break: success path, validation, authorization, not-found, conflict, business-rule violations, and external/DB failure. Prioritize invariants and failure scenarios for critical logic.

19. Create the Implementation Plan
Break work into Epics → Stories → Tasks, ordered by dependencies, risk, business value, complexity. Rough default order: setup → schema → core domain logic → endpoints → auth → validation/error handling → critical tests → UI integration → docs. Adapt to the actual project.

20. Definition of Done
Not "runs locally." Proportionally include: implementation complete, validation and error handling in place, critical edge cases handled, tests passing, migrations created, API and docs updated, security addressed, no dead code, integration verified. Use judgment — don't force every item onto a tiny project.

21. Implementation Rules
Follow the plan — don't continuously redesign mid-build unless new information forces it.
Keep the solution proportional — a mini app stays a mini app.
No speculative features "for now" without a concrete reason.
No speculative infrastructure "just in case."
Never let implementation violate an established business invariant.
If implementation reveals a wrong assumption, stop and reconsider the affected design rather than pushing through.
22. Review the Implementation
After building, check: Did we build what was requested? Did scope creep in? Are business rules enforced? Can invalid/conflicting states exist? Can unauthorized users reach protected operations? Are critical failure scenarios handled? Do critical scenarios have test coverage? Did we introduce unneeded abstraction/infra? Can another engineer understand this?

23. Documentation
Document decisions that matter — why X was chosen, not just that it was used: what the app does, how to run it, architecture, business rules, DB setup, env vars, API usage, testing, key trade-offs.

24. The AI's Role
Act as Engineer → Architect → Planner → Implementer → Reviewer, not Prompt → Code. Speed of code generation isn't engineering quality. The job is removing ambiguity before generating code.

25. Anti-Overengineering Rule
Before adding any technology, abstraction, service, dependency, or pattern, ask: What problem does it solve? Is that problem actually present? Is there a simpler solution? What complexity does it add? Will the project genuinely benefit?

If the answer is unclear: don't add it. Prefer simple + correct + maintainable over complex + impressive + unnecessary.

26. Mini Application Mode
When the user signals small/prototype/MVP/internal-tool/demo: optimize for simplicity, speed, correctness, maintainability, clear business logic, minimal dependencies and infrastructure. Don't reach for microservices, distributed systems, event-driven architecture, message queues, Kubernetes, multiple databases, or heavy observability stacks unless requirements actually justify them.

27. Decision Log
Keep a lightweight log for important calls:

Decision: Use PostgreSQL
Why: Relational booking data needs strong consistency and constraints
Alternative: MongoDB
Why not: Integrity constraints matter more here than schema flexibility
Concise — no documentation bureaucracy for tiny projects.

28. Required Output Before Coding
When requirements aren't yet clear enough, produce a concise plan using this structure (proportional to project size — a short version for tiny apps, more detail for complex systems):

Problem
Requirements (functional + non-functional)
Business Rules
Scope (in/out)
Assumptions & Constraints
Acceptance Criteria
Architecture
Data Model
API / Interfaces
Critical Flows
Edge Cases
Technical Decisions
Testing Strategy
Implementation Plan
Definition of Done
Relationship to other skills: once a plan from this skill is approved, hqse-software-engineering governs code-level execution quality (architecture principles, error handling, tracing, testing depth, code review). backend-development and nova-design-system govern stack- and design-specific conventions during implementation.

Understand first. Design second. Code third. Verify always.
