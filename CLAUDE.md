@AGENTS.md

# FitFam Waitlist

Standalone Next.js (App Router, TypeScript, Tailwind v4) waitlist landing page for FitFam, a not-yet-built hybrid training app (swimming, running, calisthenics, strength).

This is a **separate project**, not connected to any main FitFam app/backend codebase.

## Backend: waitlist signups
The email form (`components/WaitlistForm.tsx` mobile, `components/scenes/WaitlistScene.tsx` desktop) posts to `POST /api/waitlist` (`app/api/waitlist/route.ts`), which validates and inserts into a Supabase Postgres table. Shared submit/state logic lives in `hooks/useWaitlistSubmit.ts` so both components stay in sync.

- **DB schema**: `supabase/migrations/0001_create_waitlist_signups.sql` — table `waitlist_signups` (email unique + format-checked, `favorite_sport` constrained to the 4 sport ids, `ip_hash`, `user_agent`, `created_at`). RLS is enabled with **no policies**, so only the `service_role` key (server-only) can touch it — apply this migration in the Supabase SQL editor or via the Supabase CLI.
- **Server-only Supabase client**: `lib/supabase/admin.ts`, guarded with the `server-only` package so it can never end up in a client bundle.
- **Validation**: `lib/waitlist/schema.ts` (Zod), sport id enum derived from `lib/sports.ts` so it can't drift from the UI.
- **Rate limiting**: `lib/waitlist/rateLimit.ts` — IPs are HMAC-hashed (never stored raw) with `RATE_LIMIT_SALT`, capped at 5 signups per hashed IP per 10 minutes, backed by a count query against `waitlist_signups` itself (no extra table/service).
- **Anti-bot**: a hidden honeypot field (`company`) in both waitlist forms; a filled-in value is silently treated as success without touching the DB.
- **Required env vars** (see `.env.example`, never commit real values): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (service_role, not anon — server-only), `RATE_LIMIT_SALT`. These must also be set in the Vercel project's environment variables before deploying.

## Consent and privacy (2026-10-29)
- The form has a required, unticked checkbox: consent to be emailed about the launch and updates, plus the privacy notice at `/privacy` (`app/privacy/page.tsx`, linked from the form and the footer). The API (`app/api/waitlist/route.ts`) rejects a signup without `consent: true` and stores `consent_at` and `consent_version` (`lib/waitlist/consent.ts`; bump the version when the notice or the checkbox text changes). Migration `0002_add_consent.sql` is applied to the live database. Rows created before it have NO recorded consent: do not email them without asking again. Optional server env vars `LEGAL_OPERATOR_NAME` and `LEGAL_CONTACT_EMAIL` override the notice (defaults: "FitFam" and the public contact address).

## Stack
- Next.js App Router + TypeScript + Tailwind CSS v4 (`@theme inline` tokens in `app/globals.css`, no `tailwind.config.js`)
- Fonts: Heebo (headings/numerals) + Assistant (body), via `next/font/google`, loaded in `app/layout.tsx`
- Icons: Material Symbols Outlined (loaded via `<link>` in `app/layout.tsx`), rendered through `components/MaterialSymbol.tsx`. **Exception:** calisthenics uses a custom hand-drawn SVG (`components/CalisthenicsIcon.tsx`, a pull-up bar + figure) because Material Symbols has no bodyweight/street-workout icon. `components/SportIcon.tsx` is the wrapper every usage site should go through — it picks Material Symbols vs. the custom SVG per sport automatically.
- Animation: Framer Motion throughout
- Language: Hebrew, `dir="rtl"` on `<html>` (`lang="he"`)
- `.claude/skills/` in this repo has the `ui-ux-pro-max` design-intelligence skill installed (project-scoped, added via `npm install -g ui-ux-pro-max-cli` + `uipro init --ai claude`). Loads automatically in new sessions.

## Design system (strict — see full spec history in conversation, not repeated here)
- Colors defined in `app/globals.css` `@theme inline`: `canvas`, `surface`/`surface-raised`/`surface-high`/`surface-well`, `border`/`border-emphasis`, `text-primary`/`text-secondary`/`text-muted`, `ember` #ff5637 (primary/CTA), `volt` #a4d64c (success), `info` #7bd0ff (data accent), `gold` #eab308 (rare/unused so far). Do not introduce other accent colors — the four sport icons cycle through ember/volt/info/ember, not their own colors.
- Type scale as Tailwind `fontSize` tokens: `display-hero`, `headline-lg/md/sm`, `body-lg/md/sm`, `label-lg/md`, `label-technical`.
- Radius/spacing intentionally left at Tailwind defaults because they already match the spec (4/8/12/16px = `rounded`/`lg`/`xl`/`2xl`).
- Glow effect: `.glow-ember` / `.glow-volt` / `.glow-info` utility classes in `globals.css` — real box-shadow bloom, used sparingly on CTAs/active/success states, not everywhere.

## Copy voice (locked in, do not revert to generic SaaS copy)
Derived from the real @fitfam_hybrid Instagram voice: short sentences, direct/cocky address, no feature-benefit language, sparse load-bearing emoji, triads for rhythm beats. The page is a **teaser** — it's allowed to say training / hybrid identity (with pride) / "this will feel like a game" as a hook, and nothing more. Never explain gamification mechanics (no points/streaks/leaderboard by name), never fabricate stats, spot counts, prices, or testimonials. The final CTA (waitlist form) is the one place allowed to be a direct, dare-style ask ("תוכיחו שאתם ראשונים") — but still no invented urgency claims (no fake spot counts / "founding member" pricing) until a real hook exists.

Current headline copy lives directly in the components (`HeroScene`, `ProblemScene`, `DisciplineScene`/`lib/sports.ts` taglines, `SocialProofScene`, `WaitlistScene`, and their mobile-only counterparts `Hero.tsx`/`ProblemSection.tsx`/`DisciplinesSection.tsx`/`SocialProofSection.tsx`/`WaitlistForm.tsx`) — there's no separate copy/content file. If copy changes again, both the desktop scene and the mobile fallback component need updating (see Architecture below).

## Architecture: desktop pinned scroll-morph vs. mobile normal scroll
The user asked for a page where **scrolling doesn't move the page down** — scroll position instead drives crossfade+drift transitions between full-viewport "beats" (Hero → Problem triad → 4x discipline → social proof → waitlist), Apple/Stripe-style. This is implemented **desktop-only** (`md:` breakpoint) — full-page scroll-jacking is bad on mobile (address bar collapse, momentum-scroll conflicts, virtual keyboard vs. the email input), so mobile gets a normal stacked-section scroll experience instead, reusing the original (pre-morph) components.

- `app/page.tsx` renders two parallel trees: `<div className="md:hidden">` with the classic stacked sections, and `<div className="hidden md:block">` with `<ScrollExperience />`. `<Footer />` is shared and always normal-flow (not part of the pinned experience).
- `components/ScrollExperience.tsx` is the desktop orchestrator: one tall container (`TOTAL_BEATS * 100vh`) with a `sticky top-0 h-screen` inner viewport. `useScroll` on the container gives `scrollYProgress` (0→1 across the whole container), passed down to each scene along with its beat `index`/`total`. Includes a thin ember→volt progress bar pinned to the top of the viewport. The hero CTA button scrolls the window programmatically to the waitlist beat's scroll offset (`scrollToBeat`), since there's no normal in-page anchor to jump to inside the pinned container.
- `hooks/useBeat.ts` is the shared crossfade math: given global `progress`, a beat `index`, and `total` beat count, returns `{ opacity, y, pointerEvents }` MotionValues (fade+drift in, hold, fade+drift out; `pointerEvents` flips to `"none"` outside the beat's active window so hidden beats — e.g. the waitlist email input — don't eat clicks). Every scene component calls this once.
- `components/scenes/*.tsx` are the desktop beat components (`HeroScene`, `ProblemScene`, `DisciplineScene` ×4 via `SPORTS.map`, `SocialProofScene`, `WaitlistScene`). These are **not** used on mobile.
- `components/Hero.tsx`, `ProblemSection.tsx`, `DisciplinesSection.tsx` (now just a stacked heading + `DisciplineCard` list, no pinning), `SocialProofSection.tsx`, `WaitlistForm.tsx` are the **mobile-only** normal-scroll versions (`whileInView` reveals, no `useBeat`).
- This is crossfade/drift morphing (opacity + vertical offset), not literal shared-element/FLIP animation — that was an explicit scope call made and communicated to the user, not a limitation to silently fix later unless asked.

## Known open items / not yet verified
- The full desktop `ScrollExperience` rewrite (this session) has **not yet been checked in a real browser** — only `tsc --noEmit` and `next build` have passed. Before calling it done: verify in-browser that (a) all 8 beats crossfade correctly in order, (b) the waitlist email input is actually focusable/typeable only during its beat (pointer-events gating), (c) the hero CTA's `scrollToBeat` lands in the right place, (d) mobile (`md:hidden` tree) still renders/behaves as it did before this rewrite.
- No real urgency hook decided for the final CTA yet (user explicitly declined to invent one — ask before adding a spot count / pricing claim).
- The Supabase migration (`supabase/migrations/0001_create_waitlist_signups.sql`) HAS been applied: the `waitlist_signups` table exists in the live Supabase project and holds real signups. The same project's database is also read (read-only, by the FitFam API's admin endpoint). Env vars (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RATE_LIMIT_SALT`) are set in the local `.env.local`; Vercel needs the same values if the site is deployed. If the Supabase project is ever moved to another region, a new project is required (Supabase cannot change a project's region): re-run the migration there, copy the rows, then update these two env vars locally and in Vercel.
- `ui-ux-pro-max` skill was installed project-scoped mid-session; it will only be visible/loadable in *new* Claude Code sessions (skill discovery happens at session start), not this one.

## Commands
- `npm run dev` — dev server (was left running on :3000 during this session)
- `npm run build` — production build (passes as of last check)
- `npx tsc --noEmit` — type-check
- `npx eslint .` — lint (clean aside from expected `next/next/google-font-display` / `no-page-custom-font` warnings on the Material Symbols `<link>` in `app/layout.tsx`, which are false positives for App Router)
