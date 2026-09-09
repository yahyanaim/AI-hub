---
name: hqse-software-engineering
description: >
  Apply high-quality software engineering principles when building any app, website, mobile app,
  CLI tool, API, or coding project. Draws from the "High-Quality Software Engineering" (HQSE)
  framework used in six-nines (99.9999% uptime) systems. Use this skill whenever the user asks
  to develop, architect, plan, or review any software — web apps, mobile apps, backends, scripts,
  dashboards, games, or dev tools. Covers design, code quality, testing strategy, tracing,
  error handling, scalability, code reviews, and project planning.
---

This skill encodes the engineering principles from *High-Quality Software Engineering: Lessons from the Six-Nines World* by David Drysdale. Apply these throughout every software project — from architecture to the last line of code.

---

## 1. BEFORE YOU WRITE A SINGLE LINE

### Requirements First
- Know what the user **actually needs** vs. what they asked for. Ask one clarifying question if the request is ambiguous.
- Identify **implicit requirements**: performance, scalability, resilience, error behavior, and support/debugging needs.
- Define **use cases** (concrete scenarios): main-line flows + important error paths. These become your test cases later.
- For anything non-trivial, identify what "done" looks like (acceptance criteria).
### Design Before Coding
- **Divide and conquer**: break the problem into components with clear, single responsibilities.
- Every component should have one job. Ask: *What concept does this correspond to?*
- Define **interfaces** (what the component does + what callers need to know) separately from **implementations** (how it does it).
- Apply the **Black Box Principle**: a caller should never need to know how a component works internally — only its interface.
- A good interface test: *Could you swap out the entire implementation without any caller noticing?* If yes, the interface is solid.
---

## 2. CODE ARCHITECTURE PRINCIPLES

### Component Responsibility
Each module, class, function, or file should have **one clear responsibility**. When adding a feature, ask: *Which component owns this?* If none do, create a new one. Never spread a single concern across multiple components.

### Interface Design Rules
- **Complete**: expose all operations that fall under the component's responsibility, even if not yet implemented.
- **Minimal**: no extra operations. If something isn't this component's core job, move it elsewhere.
- **Principle of Least Astonishment**: behavior should match caller expectations. Name things clearly. Symmetric operations should have symmetric names (e.g., `allocateX` / `freeX`, `connect` / `disconnect`).
### Minimize Special Cases
- Special cases = `except` / `unless` in the description of code. Each one increases bugs.
- When special cases are unavoidable, **generalize and encapsulate** them in one place.
- Watch for special-case accumulation across versions. Refactor proactively.
### Encapsulate Everything External
- Wrap all system calls, I/O, timers, network calls, and third-party APIs behind interfaces.
- This makes mocking/testing trivial and isolates platform-specific logic.
- Example: never call `Date.now()` or `fetch()` directly everywhere — wrap them so tests can substitute controlled versions.
---

## 3. SCALABILITY & RESILIENCE (Design It In From The Start)

### Asynchronicity
- Asynchronous interfaces are harder but essential for scalable, resilient systems.
- When going async, always handle:
  - Result delivery mechanism (callback, promise, event)
  - State kept alive during the async gap
  - Correlation of responses to their requests
  - Out-of-order responses
  - Cleanup when the provider disappears mid-operation
### Fault Tolerance Thinking
- Ask: *What happens if this component fails?* Design for graceful degradation.
- Avoid single points of failure. If introducing a failover system, ensure the failover system itself isn't a new single point of failure.
- Keep state externalized and synchronized where possible so recovery is fast.
### Scalability Path
Even if v1 doesn't need it, design with the upgrade path in mind:
1. Single-threaded → multi-threaded → multi-process → distributed
2. Each step requires cleaner interfaces than the step before
3. If you encapsulate data access behind one interface now, distributing it later costs far less
### Avoiding the Cutting Edge
- New libraries, frameworks, and tools carry hidden costs: bugs, lack of support, learning curve, future abandonment.
- Prefer proven, well-understood technology — especially for core functionality.
- "Cutting edge" is fine for isolated, experimental, or non-critical parts of the system.
- If using something new, budget extra time for learning and risk in the project plan.
---

## 4. CODE QUALITY

### Naming
- Names are communication. Spend time on them.
- Function and variable names should accurately describe what they do/hold — no shortcuts.
- Consistent terminology throughout the codebase (don't use four synonyms for the same concept).
- Symmetric operations should have symmetric names.
### Comments
- Comments explain **why**, not **what**. The code shows what; the comment shows the reasoning.
- Add a comment whenever: (a) the code looks wrong but is correct, (b) a non-obvious decision was made, (c) a constraint or edge case isn't visible from the code alone.
- Do NOT add comments that just restate what the code says — these add noise.
### Tracing / Logging
Build a **tracing system** from the start:
- Every significant branch of the code should emit a trace statement.
- Trace statements should include key variable values, not just "got here".
- Use levels: debug < info < warning < error (compile-out debug in release builds).
- Include timestamp, component name, function name, line number in trace output.
- Include context IDs (user ID, request ID, transaction ID) to filter trace per operation.
- Tracing is for developers, logging is for operators. Keep them separate.
### Error Handling
- Handle **all** error paths explicitly. Unchecked errors are future bugs.
- Return errors through interfaces in a consistent, predictable way.
- For async code: ensure there is always a path that handles failure, even if the provider disappears mid-operation.
- Fail loudly in development, fail gracefully in production.
### Portability
- Encapsulate platform-specific behavior (filesystem paths, env vars, OS-specific APIs).
- Avoid assumptions about byte order, integer sizes, locale, timezone.
- Think about what running on a different OS, runtime, or environment would break.
---

## 5. DIAGNOSTICS (Plan for When Things Go Wrong)

Build these in from the start — retrofitting is painful:

- **Installation/startup verification**: check dependencies, versions, required config on startup; fail fast with a clear message.
- **Health checks**: expose a simple endpoint or function that confirms the system is alive and healthy.
- **Tracing & logging**: (see above)
- **Data validation**: assert internal consistency of core data structures at key points.
- **Manageability**: provide a way to reset state, clear bad data, or restart subsystems without a full redeploy.
- **Backup/restore**: if your app persists data, design export/import from day one.
---

## 6. TESTING STRATEGY

### Test Philosophy
All code has bugs. The only question is whether you find them in the lab or in production. Design the system to be **testable from the beginning**.

### Testing Levels to Consider
| Type | What it checks | Automatable? |
|---|---|---|
| Unit tests | Individual components against their interface | Yes |
| Integration tests | Components working together | Yes |
| Functional tests | System does what the requirements say | Yes |
| System/load tests | Behavior under stress, failure, scale | Partial |
| Regression tests | Previously fixed bugs don't recur | Yes |

### Design for Testability
- **Wrap all non-determinism**: wrap `Date`, `Math.random()`, timers, network calls so tests can substitute deterministic fakes.
- **Inject dependencies** rather than hardcoding them — this is what makes components independently testable.
- Use MVC or equivalent: keep business logic separate from UI and I/O so it can be tested without rendering or network calls.
- Build automated tests into the build/CI process — tests that require human interaction don't run reliably.
### What to Test
- Main-line use cases (the "golden path")
- **Boundary conditions**: 0, 1, max-1, max, max+1
- **Invalid inputs**: wrong types, empty strings, null, negative numbers, huge strings
- **Error paths**: what happens when a dependency fails, network drops, disk is full
- **Timing edge cases**: concurrent operations, out-of-order responses, races
### Psychology of Testing
- Approach testing with a **vicious, adversarial mindset**: *I am trying to break this.*
- Developer overconfidence is universal. Budget for it. Plan for more bugs than you expect.
- Use cases from requirements are your test scripts — trace them end-to-end.
### Regression Testing
- Every bug fixed should have a corresponding automated test that would have caught it.
- Tests are only valuable if they run automatically and regularly.
- A bug that recurs is a failure of the regression system, not just a coding mistake.
---

## 7. CODE REVIEWS

### Why to Review
1. **Correctness** — catch bugs before they ship (especially integration bugs between components)
2. **Maintainability** — the reviewer is the first future developer to read this code
3. **Education** — spreads knowledge and improves both reviewer and author
### What to Review
- **Local logic**: off-by-one errors, unchecked nulls/errors, incorrect conditionals
- **Data structures**: lifetime, ownership, access synchronization, key uniqueness
- **Scenario walkthroughs**: mentally run the golden path and key error cases through the code
- **Modularity**: is related code together? Are there copy-pasted chunks that should be a function?
- **Communication**: can this be understood in a single read? Are names clear? Are surprising behaviors commented?
### How to Review (Tone)
- Use questions over assertions: *"Will this handle X when Y?"* not *"This is wrong."*
- Mark comments as subjective when they are: *"I found this hard to follow because..."*
- Distinguish style from correctness. Both matter, but differently.
- Comment on positives too — reinforce good patterns.
- Goal: both author and reviewer should be happy to ship the result.
### The Key Question
*Did the reviewer understand the code?* If not, the review was worthless. A review that doesn't achieve understanding catches nothing meaningful.
---

## 8. PROJECT PLANNING

### Estimation
- All developers underestimate. Account for this explicitly.
- Estimate from multiple angles: time, lines of code, percentage of a similar past task. Compare results.
- Tasks estimated in person-days should be small enough (≤ 1 week) that question marks are visible.
- Track estimates vs. actuals on every task. Learn from the delta.
- Errors should be **symmetrically distributed**: sometimes over, sometimes under. Consistent underestimates mean the process is broken.
### What Gets Forgotten (Budget for These)
- Holidays, illness, onboarding new team members
- Build system setup and maintenance
- Documentation and code comments
- Packaging, deployment, installer
- Interoperability and integration testing
- Sales demos, stakeholder reviews
- Internationalization and accessibility
- Initial post-launch support and bug triage
- **Contingency**: always reserve 10–30% depending on uncertainty
### Task Division
- Match tasks to skill levels. Senior engineers on novel or architectural work; juniors on well-defined tasks.
- Don't let one person own everything in a domain — bus-factor risk.
- Pair experts with learners for knowledge transfer.
- Clearly state whether estimates are in "average developer days" or "this specific person's days". Mixing them causes disasters.
### Dependencies
- Separate interface definitions from implementations so parallel development is possible.
- When component A is needed by component B: define A's interface first, let B build against it using a test stub.
- Surface dependencies in the plan explicitly. Broken dependencies = blocked team members.
### Replanning (When Things Go Wrong)
When the plan is off-track (and it will be):
1. Face the problem early. Late admission of delays is the #1 project management failure.
2. Options: move dates, reduce scope, reduce quality (deliberately, not accidentally), add resource (carefully — late additions hurt more than they help).
3. Always consider knock-on effects on other teams.
---

## 9. SUPPORT & MAINTAINABILITY

### Write Code for the Person Who Fixes It at 2am
That person is sleep-deprived and under pressure. Make the code as clear as possible for them:
- Clear naming, well-structured code, comments explaining non-obvious decisions
- Good tracing so they can see what happened without a debugger
- Error messages that contain enough context to diagnose the problem
### When Working With Existing (Imperfect) Code
- Before touching anything: improve testability. Add regression tests around what you're changing.
- Make fixes slowly and thoroughly. Rushed fixes in messy codebases introduce more bugs.
- Refactor related code as part of a bug fix. Leave things cleaner than you found them.
- Hunt for similar code that might need the same fix. Apply it everywhere.
### Support Metrics to Track
- Bug count per component (reveals weak spots)
- Time to fix bugs (reveals maintainability problems or poor diagnostics)
- Number of fixes that induced new bugs (reveals process or design debt)
- These numbers make the ROI of code quality tangible.
---

## 10. QUICK CHECKLIST (Apply to Every Project)

Before building:
- [ ] Requirements and use cases defined, including error paths
- [ ] Components and responsibilities designed, interfaces sketched
- [ ] Test strategy defined (what types of tests, who writes them, when they run)
- [ ] Tracing and error handling approach decided
- [ ] Plan includes non-coding tasks and contingency
While building:
- [ ] Each component has a single, clear responsibility
- [ ] All external dependencies are encapsulated/injectable
- [ ] Every error path is handled explicitly
- [ ] Every branch has a trace statement (or at minimum, significant state transitions)
- [ ] Tests are written alongside the code, not after
Before shipping:
- [ ] Code reviewed (or self-reviewed with "first future developer" mindset)
- [ ] All test types appropriate to the project are passing
- [ ] Tracing/logging is in place and useful
- [ ] Diagnostics and health checks are in place
- [ ] Installation/startup validates its environment
---

## APPLYING THIS SKILL

When the user asks you to build an app, website, API, or any software:

1. **Clarify first** if requirements are vague (one question max).
2. **Design before coding** — describe the component breakdown and interfaces before writing code.
3. **Write production-quality code**: proper error handling, clear naming, encapsulated dependencies, tracing/logging statements.
4. **Write or describe tests**: at minimum, explain what should be tested and how.
5. **Plan for failure**: what breaks, what the error looks like, how to diagnose it.
6. **Comment the why**, not the what.
7. **Think about the maintainer**: every piece of code will be read far more than it is written.
The six-nines mindset isn't about phone switches — it's about taking quality seriously every time, not just when it's convenient.
