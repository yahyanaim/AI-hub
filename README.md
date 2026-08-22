# AI Hub

A curated directory of **free educational resources** — university courses (CS50, MIT OCW, Stanford), YouTube crash courses, and industry learning paths for developers.

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

## Features

- **1,800+ curated entries** — AI tools, dev tools, open-source repos, courses, offers & scholarships
- **Course detail pages** with structured roadmaps, tags, and links to sources
- **PDF roadmap export** — 3 template styles (Simple, Professional, Detailed)
- **Upvote & bookmark** system with localStorage persistence
- **Category filtering** with flex-wrap chips (no horizontal scroll)
- **Command palette** (⌘K) instant search across everything, incl. Arabic titles
- **User profiles** — submitted / upvoted / bookmarked tabs
- **AI Career Advisor** chat backed by NVIDIA inference

## How data works (read before deploying)

This project has **no shared backend or database**. Everything you see ships as
static seed data from [`lib/seed/`](lib/seed/) and is rendered client-side.

What this means in practice:

- **Votes, bookmarks, submissions, and comments are stored per-browser** in
  `localStorage`. What one visitor submits or upvotes is **not visible to anyone else**
  and does not change the numbers other visitors see.
- Clearing site data (or using another browser/device) resets all personal
  contributions.
- Seed content always comes fresh from the code on every deploy — user edits never
  overwrite it (`lib/store.tsx` persists only small user deltas under key
  `ai-hunt-state-v4`).
- `/api/chat` is a stateless streaming proxy to an external LLM API — nothing said
  there is stored server-side.

If you need real multi-user persistence, you'll want to add a database and swap the
store layer — the UI code is already isolated behind `AppProvider`.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS variables |
| Motion | Framer Motion |
| Icons | Lucide React |
| State | React Context + localStorage |
| Fonts | Inter + JetBrains Mono |

## Data

All content lives in `lib/seed/` as typed TypeScript modules (`tools.ts`,
`dev-tools.ts`, `repos.ts`, `courses.ts`, `offers.ts`, `scholarship` offers included),
re-exported by `lib/seed/index.ts` and validated in CI by
`node scripts/validate-seed.mjs` (duplicate id/slug guard).

## File structure

```
ai-hunt/
├── app/                # Routes, layout, globals.css, api/chat
├── components/
│   ├── cards/          # ToolCard, DevToolCard, RepoCard, CourseCard, OfferCard…
│   ├── detail/         # Per-type detail views + comment thread
│   ├── home/           # HeroSection, HomeView, Sidebar
│   ├── listing/        # ListingView + per-type views (pagination, filters)
│   ├── profile/        # ProfileView
│   ├── search/         # CommandPalette (⌘K), SearchView
│   ├── submit/         # SubmitForm wizard + donation gate
│   ├── chat/           # AI advisor chatbot
│   ├── layout/         # Navbar, Footer, SupportPage, FilterBar…
│   └── ui/             # Avatar, Badges, Logo, Markdown…
├── lib/
│   ├── store.tsx       # AppProvider context — seed data + localStorage user deltas
│   ├── seed/           # Static content modules (re-exported via index.ts)
│   ├── json-ld.ts      # Safe JSON-LD serializer for schema tags
│   └── utils.ts        # Helpers
├── scripts/            # validate-seed / dedupe-seed / split-seed
└── types/index.ts
```
