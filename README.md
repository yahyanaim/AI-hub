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

- **48 courses** across Python, JavaScript, Computer Science, Frontend, Backend, DevOps, AI/ML, Cloud, and Mobile
- **Course detail pages** with structured roadmaps, tags, and links to YouTube/freeCodeCamp sources
- **PDF roadmap export** — 3 template styles (Simple, Professional, Detailed)
- **Course popup modal** with embedded resources and "Visit course" link
- **Upvote & bookmark** system with localStorage persistence
- **Category filtering** with flex-wrap chips (no horizontal scroll)
- **Leaderboard** — weekly / monthly / all-time rankings
- **Command palette** (⌘K) instant search
- **User profiles** — submitted / upvoted / bookmarked tabs

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

All course data lives in `lib/seed.ts` — 48 entries sourced from:
- **CS50** (Harvard's Intro to CS, Python, AI, Web, SQL)
- **MIT OCW** (6.100L, 6.NULL, Missing Semester)
- **Stanford** (CS106B, CS144)
- **freeCodeCamp** (full YouTube courses on Python, React, Django, TypeScript, Docker, AWS, etc.)
- **University of Michigan** (Dr. Chuck's Python/Django/SQL courses)

## File structure

```
ai-hunt/
├── app/                # Routes, layout, globals.css
├── components/
│   ├── cards/          # CourseCard, PromptCard, RepoCard
│   ├── detail/         # CourseDetail, PromptPlayground
│   ├── home/           # HomeView
│   ├── leaderboard/    # LeaderboardView
│   ├── listing/        # ListingView + per-type views
│   ├── profile/        # ProfileView
│   ├── search/         # CommandPalette, SearchView
│   ├── submit/         # SubmitForm (4-step wizard)
│   ├── interactive/    # UpvoteButton, BookmarkButton
│   ├── layout/         # Navbar, Footer, FilterBar, ThemeManager
│   └── ui/             # Avatar, Badges, Logo, Markdown
├── lib/
│   ├── store.tsx       # AppProvider context + localStorage
│   ├── seed.ts         # 48 courses seed data
│   └── utils.ts        # Helpers
└── types/index.ts
```
