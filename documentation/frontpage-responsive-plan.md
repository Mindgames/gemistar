# Front Page Responsive Improvement Plan

This playbook captures the responsive refinements required to keep the Gamistar landing page polished on desktops while making it seamless on tablets and phones. It is intended to be the working document for engineering and design as changes roll out.

---

## Goals & Guardrails

- Retain the current motion design, gradients, and density on large screens (`≥1024px`).
- Guarantee that tablet (`640px–1023px`) and phone (`<640px`) views surface navigation, message hierarchy, and CTAs without crowding, clipping, or horizontal scroll.
- Keep typography readable (headline line length ≤ 2–3 lines on small screens) and touch targets ≥ 44px tall.
- Avoid performance regressions—no new render-blocking assets or heavy scripts.
- Document every change in this plan to simplify code review and QA.

### Priority Snapshot

| Area | Priority | Effort | Rationale |
| --- | --- | --- | --- |
| Fixed navigation | High | Medium | Missing mobile links, cramped pill container |
| Hero section | High | Medium | Oversized gradients 6 CTA alignment issues cause overflow |
| Logo marquee | Medium | Low | Cards dominate phones, gradients obscure content |
| Feature grid | Medium | Medium | Incorrect heading scale, tight layout on tablets |
| Testimonials | Medium | Medium | 3-up grid too early, long scroll on mobile |
| Final CTA | Low | Low | Oversized spacing/button on phones |
| Footer | Medium | Low | Badge overflow, touch target spacing |
| Global layout | High | Low | `main` min-height typo, safe-area offsets |

---

## Section Audit & Detailed Actions

### 1. Fixed Navigation (`components/design-systems/radiant/navbar.tsx`)

**Impact**  
- Links disappear entirely below `768px`, leaving only auth buttons.  
- Large pill container (`rounded-full border-2`) squeezes logo + buttons on phones.  
- `top-4` offset stacks with hero padding, creating excess blank space on mobile.

**Action Plan**
1. Add a mobile menu (hamburger → sheet/drawer or popover) exposing `Product`, `Waitlist/Dashboard`, `Contact`. Use existing button + Link components where possible.  
2. Simplify header chrome for `<md`: switch to `rounded-2xl border` with `px-3 py-2`, and reduce backdrop blur.  
3. Apply responsive positioning: `top-2` and `px-3` below `md`, restore current styling above.  
4. Decide on theme toggle behaviour—either hide on `/` for smaller breakpoints or move it into the menu to avoid layout shifts.

**Acceptance Criteria**
- Mobile view (<640px) shows hamburger + brand + primary CTA without overlap.  
- Opening the menu reveals all primary navigation links with 48px tap targets.  
- No horizontal scroll introduced by menu transitions.  
- Desktop visual unchanged compared to production.

### 2. Hero (`components/features/ModernHero.tsx`)

**Impact**  
- Background gradients sized at `h-[60rem]` create subtle horizontal scroll on small screens.  
- `min-h-[calc(100vh-4rem)]` with `pt-26` is disproportionate once nav padding shrinks.  
- CTA paragraph competes with the button on narrow widths.

**Action Plan**
1. Scale gradients via responsive utilities (`max-w-[160vw]`, `sm:h-[48rem]`, hide one sparkle on phones) and clamp positions to avoid overflow.  
2. Replace fixed min-height with responsive spacing: `pt-20 pb-16` on phones, `min-h-screen` at `lg`.  
3. Stack CTA copy beneath button on `<sm` using `flex-col` with `gap-4`, and constrain text with `max-w-sm mx-auto text-center`.  
4. Limit video wrapper width (`max-w-4xl mx-auto`) and adjust shadows (`shadow-[...]/md:shadow-[...]`) to stay balanced on smaller screens.

**Acceptance Criteria**
- No horizontal scrolling at 320px and 375px widths.  
- Headline remains legible with ≤ 3 lines on iPhone SE.  
- CTA button + copy align gracefully across breakpoints.  
- Animations continue to run without timing changes.

### 3. Logo Marquee (`components/ui/data-display/LogoMarquee.tsx`)

**Impact**  
- Cards fixed at `h-16` with heavy shadows overpower mobile layout.  
- Edge gradients (`w-32`) hide content on narrow screens.  
- Duplicate arrays double DOM nodes irrespective of viewport.

**Action Plan**
1. Introduce responsive sizing (`h-12 sm:h-14 md:h-16`, `p-1.5 sm:p-2`) and lighter shadow on phones.  
2. Adjust gradient overlays to `w-12` below `md`, `w-24` at `md`, `w-32` at desktop.  
3. Allow marquee `repeat` count to vary by breakpoint (e.g., pass prop, or responsive CSS custom property) to keep animation smooth without excessive nodes.  
4. Validate image intrinsic sizes; consider `sizes` attributes to improve LCP.

**Acceptance Criteria**
- Logos remain fully visible at 320px.  
- Animation stays smooth across breakpoints with no jank.  
- Lighthouse CLS for marquee section remains unchanged or improved.

### 4. Feature Grid (`components/features/ModernFeatures.tsx`)

**Impact**  
- Heading scales down on large screens (`text-4xl lg:text-3xl`).  
- Card padding/gap heavy for phones, causing long scroll.  
- `lg:grid-cols-3` engages at 1024px, shrinking columns too early.

**Action Plan**
1. Correct heading typography (`text-3xl sm:text-4xl lg:text-5xl font-semibold`).  
2. Use responsive spacing: `gap-6 sm:gap-8 lg:gap-10`, `p-6 sm:p-7 md:p-8`.  
3. Shift layout breakpoints: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`.  
4. Optional: add subtle `after` divider or card tint on desktop only for structure.

**Acceptance Criteria**
- Two-column layout appears at 640px with comfortable spacing.  
- Desktop retains three-column layout identical to current visuals.  
- Cards maintain consistent height per row (test with longest copy).

### 5. Testimonials (`components/features/ModernTestimonials.tsx`)

**Impact**  
- Current `md:grid-cols-3` squeezes cards on tablets.  
- Full-width cards create tall stack on phones, reducing scanability.

**Action Plan**
1. Update grid to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, add `md:auto-rows-fr` to equalise card height.  
2. Tweak typography: `text-base sm:text-lg` for quotes, `text-sm sm:text-base` for roles.  
3. Add `space-y` within cards for better rhythm, and evaluate optional mobile snap carousel after baseline improvements.

**Acceptance Criteria**
- Tablet (768px) displays two columns with no overflow.  
- Mobile view keeps card height balanced and easy to read.  
- Section heading maintains hierarchy relative to hero + features.

### 6. Final CTA (`components/features/FinalCTA.tsx`)

**Impact**  
- `py-32` and button `px-8 py-6` feel oversized on phones, leading to redundant whitespace.

**Action Plan**
1. Reduce section padding to `py-16 sm:py-24 lg:py-32`.  
2. Apply responsive button sizing (`px-6 py-4 md:px-8 md:py-6`).  
3. (Optional) Add a subtle upward gradient overlay to tie into hero background on mobile.

**Acceptance Criteria**
- Phone view shows CTA without scrolling excessively.  
- Desktop styling remains visually identical.  
- Button text stays on a single line down to 320px.

### 7. Footer (`components/design-systems/radiant/footer.tsx`)

**Impact**  
- NVIDIA badge fixed at `width={200}` can overflow or blur on phones.  
- Legal links stacked tightly; touch targets borderline.  
- Column alignment inconsistent across breakpoints.

**Action Plan**
1. Make badge responsive (`className="w-full max-w-[150px] sm:max-w-[200px]"`, consider `priority={false}`).  
2. Align columns with `text-center md:text-left`, `md:items-start`.  
3. Increase spacing (`space-y-2`, `py-2`) for legal/contact links; ensure accessible focus states.  
4. Verify dark/light logos swap correctly when theme changes.

**Acceptance Criteria**
- No truncated assets at 320px.  
- Legal links meet touch target guidelines.  
- Visual layout on desktop untouched aside from spacing refinements.

### 8. Global Layout (`app/layout.tsx`, shared styles)

**Impact**  
- Typo in `md:min-h[calc(100dvh-5rem)]` prevents intended override.  
- No safe-area padding for devices with notches.  
- Anchor targets like `#footer` land beneath fixed nav.

**Action Plan**
1. Fix class to `md:min-h-[calc(100dvh-5rem)]` and add responsive top padding on `<main>` (`pt-24 md:pt-28`) once nav spacing finalised.  
2. Introduce utilities for safe-area insets (e.g., custom class `pt-safe` using `env(safe-area-inset-top)`).  
3. Apply `scroll-mt-28` (responsive) to sections with anchor IDs (hero, features, footer).  
4. Confirm global `body` retains `overflow-x-visible` to expose any regressions.

**Acceptance Criteria**
- Anchor links (`#footer`, `#demo`) align below nav at all breakpoints.  
- DevTools shows correct `min-height` on `<main>` across viewport sizes.  
- Safe-area insets active on iPhone notch devices.

---

## Implementation Roadmap

1. **Navigation & Layout Foundations (Sprint 1)**  
   - Build mobile nav component, refactor header positioning, fix `<main>` min-height and safe-area utilities.  
   - QA: 320px, 375px, 768px, 1024px.

2. **Hero & Supporting Hero Elements (Sprint 1/2)**  
   - Resize gradients, adjust CTA stack, cap video width.  
   - QA: ensure animations unaffected, test `prefers-reduced-motion`.

3. **Marquee & Feature Grid (Sprint 2)**  
   - Update marquee sizing and duplication strategy, revise feature cards and typography.  
   - QA: cross-browser scroll smoothness, card height consistency.

4. **Testimonials & Final CTA (Sprint 3)**  
   - Rework grid breakpoints, spacing, CTA padding.  
   - QA: compare before/after screenshots.

5. **Footer Polish & Regression Pass (Sprint 3)**  
   - Implement responsive badge, spacing tweaks, and anchor offsets.  
   - QA: run full-device sweep and regression tests.

---

## Testing & Validation Checklist

- [ ] Manual QA via Chrome DevTools: iPhone SE, iPhone 14, Pixel 5, iPad Mini, iPad Air, 13" laptop.  
- [ ] Verify no horizontal scrollbars at any breakpoint.  
- [ ] Confirm animations respect `prefers-reduced-motion`.  
- [ ] Lighthouse Mobile score comparable to current baseline (note changes).  
- [ ] Run `npm run lint` after each feature branch merge.  
- [ ] Run `npm run build` before PR submission; document failures in **Notes** if any.

---

## Risks & Mitigations

- **Animation regressions**: Introduce storybook or visual snapshots for hero to catch timing shifts.  
- **Menu accessibility**: Ensure mobile navigation uses `aria-expanded`, focus trapping, and ESC handling.  
- **Unexpected horizontal scroll**: Temporarily enable `outline` debugging classes or `overflow-x-scroll` watchers during development.

---

## Follow-Ups & Open Questions

- Should the hero video load a poster/thumbnail on mobile to reduce initial bandwidth?  
- Do we expose an explicit "Download extension" CTA on mobile once Chrome badge is ready?  
- Are there localisation plans that require guarding for longer copy lengths?  
- Do we need a sticky mobile CTA (e.g., `Join Waitlist`) after nav collapse?

Use this document as the approval checklist before implementing responsive work, and update it as new findings emerge during QA.
