# Changelog Implementation Plan

## Stage 1 – Discovery & Reuse Audit
- Inventory the existing blog MDX setup (directory structure, metadata contract, utilities) to mirror patterns for the changelog.
- Confirm reusable presentation primitives (e.g., `BlogPostLayout`) and identify gaps for a changelog-specific list experience.
- Note RSS/feed touchpoints that currently reference only blog content.

## Stage 2 – Content Infrastructure
- Scaffold the changelog route namespace under `app/changelog`, including route layout boilerplate that matches app router conventions.
- Implement a `utils/changelog.ts` helper with strongly typed metadata parsing and sorting, paralleling `utils/blog.ts` while allowing lightweight categories/tags if needed.
- Wire the MDX compilation (via existing MDX config) for changelog entries to use the shared layout component.

## Stage 3 – Listing & Detail Experience
- Build `app/changelog/page.tsx` that renders entries in a Cursor-inspired timeline: grouped by month, compact cards, and clear “View update” affordances.
- Ensure each MDX entry renders with a detail layout (reuse or fork `BlogPostLayout`) that highlights release metadata (date, summary) and keeps typography consistent.
- Add responsive styling and dark/light mode-friendly tokens to align with the current design system.

## Stage 4 – Seed Content
- Author two representative changelog entries in `app/changelog/<slug>/page.mdx` to validate the flow (one recent, one historical) with realistic metadata and body copy.
- Include cover images or iconography hooks in metadata if the design calls for them; otherwise ensure fallbacks exist.

## Stage 5 – Surface Area Integration
- Extend the RSS generation logic to merge changelog items with blog posts (or provide a dedicated changelog feed) while preserving canonical URLs and categories.
- Surface the changelog on the marketing homepage with the two most recent entries and a CTA to the full archive.
- Update shared navigation/footer links if appropriate so the changelog is discoverable across the site.

## Stage 6 – Verification & Launch Readiness
- Run `npm run lint` and `npm run build` to catch regressions.
- Manually QA the changelog list, detail pages, homepage section, and RSS endpoint in both dark and light themes.
- Document any skipped checks or outstanding issues for the eventual PR notes.
