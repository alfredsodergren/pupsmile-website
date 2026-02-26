---
name: ecommerce-landing-page-builder
description: Build high-converting, single-product e-commerce landing pages with cinematic design quality. Use this skill whenever the user wants to create, design, or build a product landing page, DTC landing page, Shopify storefront, single-product store, sales page, or any e-commerce frontend. Also trigger when the user mentions headless Shopify, Storefront API, product pages, conversion optimization, or wants to turn ad traffic into purchases. This skill covers the full pipeline from reference analysis to deployed storefront — including copy, design, animations, Shopify integration, and screenshot-based QA loops.
---

# E-Commerce Landing Page Builder

## Role

Act as a World-Class DTC Conversion Architect, Senior Frontend Engineer, and Direct Response Copywriter. You build high-fidelity, conversion-optimized single-product landing pages that turn cold ad traffic into buyers. Every section exists to move the visitor closer to purchase. Every design choice is backed by direct response principles. Eradicate all generic AI patterns — this is not a template site, it's a revenue machine with premium aesthetics.

---

## Critical: Folder Resources

Before building, check the project folder for these resources the user will have uploaded:

- **`/references/`** — Screenshots or PDFs of high-converting landing pages to use as design and structural reference. ALWAYS analyze these before building (see Reference Analysis Protocol below).
- **`/research/`** — Deep research documents on the product market, competitors, customer psychology, and copy angles. Read these to write conversion-grade copy rather than generic marketing fluff.
- **`/shopify/`** — Contains the Shopify Storefront API private access token, store domain, and any Shopify Hydrogen/web component documentation. Use these to wire up real product data, cart functionality, and checkout redirects.
- **`/assets/`** — Product images, logos, brand assets the user has provided.

If any of these folders are missing, ask the user to provide the materials before proceeding. The quality of the output depends on having real reference pages, real research, and real Shopify credentials.

---

## Agent Flow — MUST FOLLOW

### Step 0: Reference Analysis (MANDATORY before building)

Before writing a single line of code, analyze every reference landing page in `/references/`. For each reference page, produce a structured breakdown:

**Structure & Section Inventory:**
- List every section from top to bottom (announcement bar, hero, social proof strip, product showcase, etc.)
- Note approximate content length of each section (short/medium/long)
- Count total number of sections
- Identify how many CTAs appear and where they're placed

**Navigation & Purchase UX:**
- What type of navbar (sticky, minimal, full)?
- Is there an announcement/promo bar? What does it contain (offer, countdown timer, free shipping)?
- Where are "Add to Cart" or "Buy Now" buttons placed?
- Is there a sticky/floating CTA that persists on scroll?
- Is there a cart drawer or does it redirect to checkout?

**Social Proof Architecture:**
- Where does social proof first appear (hero, immediately after, mid-page)?
- What forms: star ratings, review count, testimonial cards, UGC screenshots, video testimonials, press logos, "as seen in" bars?
- How many distinct social proof sections exist?
- Are reviews shown as curated highlights or a full feed with filters?

**Copywriting & Persuasion Patterns:**
- What is the headline formula (benefit-driven, problem-agitation, curiosity, authority)?
- Is there a founder story or brand origin section?
- How is the problem/solution framework deployed?
- What urgency/scarcity mechanisms are used (countdown timers, low stock warnings, limited-time offers)?
- Is there a "who this is for / who this is NOT for" section?
- How is the unique mechanism explained (ingredient breakdown, science section, comparison tables)?
- What objection-handling exists (FAQ, guarantee callouts, "vs competitor" tables)?

**Visual & Interaction Design:**
- Color palette and overall aesthetic mood
- Typography choices (serif vs sans, dramatic vs clean)
- Image style (lifestyle, product-on-white, UGC, before/after)
- Animation style (subtle fades, scroll-triggered, parallax, none)
- Card/container styling (rounded, sharp, bordered, shadowed)
- Use of icons, badges, and trust seals

**Conversion Architecture (the WHY behind each section):**
- Map each section to its persuasion job: Attention → Interest → Desire → Action
- Identify the emotional journey the page creates
- Note how objections are pre-empted before the pricing/offer section
- Identify the "moment of highest buying temperature" and what surrounds it

Output this analysis in a structured format. Then synthesize the patterns across all reference pages into a "Reference Synthesis" that identifies the common winning patterns to replicate.

### Step 1: Ask the User (one call, then build)

After completing reference analysis, ask exactly these questions in a single call:

1. **"Brand name and product in one line?"** — e.g., "PupSmile — postbiotic dental powder that eliminates dog plaque without brushing"
2. **"Who is the customer and what's their #1 pain point?"** — e.g., "Women 55+ whose dogs have brown teeth, bad breath, and vets just say 'get a dental cleaning for $800'"
3. **"What's the unique mechanism?"** — The specific thing that makes this product work differently. e.g., "Postbiotic compounds that break down oral biofilm at the molecular level"
4. **"What's the offer?"** — Price, bundles, discounts, guarantees, free gifts. e.g., "3-pack bundle $89 (was $147), 60-day money back, free shipping"
5. **"Pick a visual direction"** — Single-select from the presets below.
6. **"What reference page should we match closest?"** — If multiple references were uploaded, which one is the primary structural model?

Do not ask follow-ups. Do not over-discuss. Build.

### Step 2: Read Research & Write Copy

Before coding, read everything in `/research/`. Extract:
- The mass desire driving the market
- The dominant awareness level of the target customer (Eugene Schwartz's 5 levels)
- Key emotional triggers and language patterns from real customer reviews
- Competitor weaknesses to exploit
- Specific claims, statistics, and proof points to weave into copy

Write ALL copy for every section before touching code. The copy document should include every headline, subhead, body paragraph, CTA button text, badge label, FAQ answer, and trust callout. This is a direct response landing page — every word must earn its place.

### Step 3: Build the Site

Execute the full build following the Component Architecture below, integrating:
- Copy from Step 2
- Structure from Reference Analysis
- Design tokens from the selected preset
- Real Shopify product data via the Storefront API

### Step 4: Screenshot Feedback Loop (MANDATORY)

After the initial build:
1. Take a screenshot of each major section of the built page
2. Place it side-by-side with the corresponding section from the reference page
3. Document discrepancies in: layout, spacing, typography scale, color usage, content density, CTA placement, social proof presentation
4. Fix every discrepancy
5. Repeat until the built page matches the reference page's quality level and structural intent (not pixel-for-pixel copying, but matching the conversion architecture)

This loop runs at least twice. The user can request additional rounds.

---

## Aesthetic Presets

Each preset defines palette, typography, identity, and image mood. These set the visual tone — the section structure and conversion architecture remain constant.

### Preset A — "Clean Clinical" (Health & Wellness DTC)
- **Identity:** Trust-forward, medical-adjacent. Like a premium supplement brand that takes itself seriously.
- **Palette:** Warm White `#FAF8F5` (Background), Forest `#1B4332` (Primary), Terracotta `#C1440E` (Accent/CTA), Charcoal `#1A1A1A` (Text), Cream `#F5F1EB` (Card surfaces)
- **Typography:** Headings: "Plus Jakarta Sans" 700 (tight tracking). Body: "Inter" 400. Accent/Drama: "Playfair Display" Italic. Data: `"IBM Plex Mono"`.
- **Image Mood:** warm lifestyle photography, natural ingredients on marble, soft directional lighting, earth tones.
- **Reference Vibe:** RYZE Superfoods, AG1, Seed.

### Preset B — "Bold Challenger" (High-Energy DTC)
- **Identity:** Loud, confident, unapologetic. The brand that calls out the industry. Feels like a movement, not a company.
- **Palette:** Deep Purple `#2D0A4E` (Primary), Hot Pink `#E91E8C` (Accent/CTA), Soft Lavender `#F4F0FF` (Background), White `#FFFFFF` (Card surfaces), Dark `#1A0A2E` (Footer)
- **Typography:** Headings: "Space Grotesk" 700 (tight tracking). Body: "DM Sans" 400. Drama: "DM Serif Display" Italic. Data: `"Space Mono"`.
- **Image Mood:** vibrant lifestyle, UGC-style photos, bold splashes of color, high contrast.
- **Reference Vibe:** Primal Queen, Onnit, Bloom Nutrition.

### Preset C — "Minimal Luxe" (Premium Single-Product)
- **Identity:** Less is more. The product speaks for itself. Quiet confidence with impeccable taste.
- **Palette:** Off-White `#FAFAFA` (Background), Black `#0A0A0A` (Primary/Text), Gold `#B8860B` (Accent), Light Gray `#F5F5F5` (Card surfaces), Charcoal `#333333` (Secondary text)
- **Typography:** Headings: "Sora" 600. Body: "Inter" 400. Drama: "Cormorant Garamond" Italic. Data: `"JetBrains Mono"`.
- **Image Mood:** studio product photography, white/marble backgrounds, editorial styling, luxury packaging shots.
- **Reference Vibe:** Aesop, Glossier, The Ordinary.

### Preset D — "Native Advertorial" (Long-Form Sales Page)
- **Identity:** Feels like reading an article or blog post, not shopping. Educate-first, sell-second. The content IS the funnel.
- **Palette:** White `#FFFFFF` (Background), Navy `#1B2A4A` (Primary/Text), Coral `#E85D4A` (Accent/CTA), Light Blue `#F0F4F8` (Section alternation), Cream `#FFF9F0` (Callout boxes)
- **Typography:** Headings: "Merriweather" 700. Body: "Source Sans Pro" 400. Callouts: "Georgia" Italic. Data: `"Fira Code"`.
- **Image Mood:** editorial photography, documentary-style, before/after, candid lifestyle.
- **Reference Vibe:** Casper advertorials, long-form DTC landers, native ad style.

---

## Fixed Design System (applies to ALL presets)

### Visual Polish
- Subtle CSS noise overlay using inline SVG `<feTurbulence>` filter at **0.03 opacity** on hero and dark sections only — keeps backgrounds from feeling flat without being distracting.
- Border radius system: `rounded-xl` (0.75rem) for buttons and small elements, `rounded-2xl` (1rem) for cards, `rounded-3xl` (1.5rem) for large containers. Consistent, never sharp.
- Generous whitespace between sections (`py-20` to `py-32`). Let the page breathe. Dense copy sections need more space around them, not less.

### Micro-Interactions
- CTA buttons: `scale(1.02)` on hover, `cubic-bezier(0.25, 0.46, 0.45, 0.94)` transition, `overflow-hidden` with a sliding background color layer.
- Cards: subtle `translateY(-2px)` lift on hover with soft shadow expansion.
- Accordion FAQs: smooth `max-height` transition with content fade-in, chevron rotation.
- Sticky CTA bar on mobile: slides up from bottom after scrolling past hero, with product name + price + "Add to Cart" button.

### Animation Philosophy
- Use `gsap.context()` within `useEffect` for all animations. Return `ctx.revert()` in cleanup.
- Default easing: `power3.out` for scroll-triggered entrances. `power2.inOut` for interactive state changes.
- Stagger: `0.08` for text lines, `0.12` for cards, `0.06` for badge/icon groups.
- ScrollTrigger for section entrances: `start: "top 85%"`, simple `opacity: 0 → 1` + `y: 30 → 0`. Nothing flashy — this is a sales page, not a portfolio. Animations should feel invisible-good, not distracting.
- Announcement bar marquee: CSS `@keyframes` infinite scroll, no JS needed.

### Typography Scale (responsive)
- Hero headline: `text-4xl md:text-6xl lg:text-7xl`, tight `leading-[1.05]`, `tracking-tight`
- Section headlines: `text-3xl md:text-4xl lg:text-5xl`
- Card headlines: `text-xl md:text-2xl`
- Body copy: `text-base md:text-lg`, `leading-relaxed`
- Small labels/badges: `text-xs uppercase tracking-widest`
- Monospace data points: preset's data font, `text-sm`

---

## Component Architecture — The Conversion Stack

These sections form the conversion architecture of the page. The order is intentional and based on direct response principles: grab attention → build desire → establish proof → explain mechanism → handle objections → present offer → close. Adapt section count and length based on reference analysis, but the persuasion sequence must remain intact.

### 1. ANNOUNCEMENT BAR
A slim, full-width bar pinned to the very top of the viewport.
- Contains: current offer text + optional countdown timer
- Countdown timer: `DD : HH : MM : SS` format with monospace font, ticking down in real-time via `setInterval`
- Background: accent color or primary dark. Text: white or high-contrast.
- Marquee variant: for "LIMITED TIME OFFER" or "FREE SHIPPING" repeating messages, use CSS `@keyframes` horizontal scroll.
- Height: `py-2` to `py-3`. Never taller than 48px.

### 2. NAVBAR
Sticky below announcement bar. Minimal for a single-product store.
- Contains: Logo (brand name as styled text or image), 1-2 links max (e.g., "Reviews", "FAQ"), Cart icon with item count badge.
- On mobile: hamburger menu is optional — for a single product page, often just Logo + Cart is enough.
- Background: transparent over hero, transitions to `bg-white/90 backdrop-blur-md` with subtle border-bottom on scroll.
- Cart icon opens a slide-out cart drawer (or redirects to Shopify checkout if using headless).

### 3. HERO SECTION — "The Opening Shot"
This is the most important section on the page. It must accomplish three things in under 3 seconds: communicate what the product is, who it's for, and why they should care.

**Layout:** Two-column on desktop (copy left, product image right). Single column stacked on mobile (image first, then copy).

**Content (top to bottom within the hero):**
- **Eyebrow tag:** Small label above headline — limited-time offer badge, or category label. e.g., `🔥 LIMITED TIME OFFER: GET 1 MONTH FREE`
- **Headline:** Benefit-driven, specific, speaks to the #1 pain point. NOT the product name. NOT a generic tagline. This is the biggest text on the page.
- **Subheadline:** 1-2 sentences expanding on the headline. Introduces the product as the solution.
- **Social proof micro-strip:** Immediately below subheadline. Star rating + review count + guarantee badge inline. e.g., `⭐⭐⭐⭐⭐ 276,053 Reviews · 30-Day Money Back Guarantee · Free Shipping`
- **Primary CTA button:** Large, accent-colored, action-oriented text. NOT "Learn More". Use "Shop Now", "Try It Today →", "Unlock Your True Power", etc.
- **Risk reversal micro-copy:** Below the CTA button. e.g., `✓ 365-Day Money Back Guarantee · ✓ Free Shipping`
- **Hero testimonial (optional):** Single short quote with name, "Verified Buyer" badge, and photo — creates immediate social proof in the hero area.

**Product Image:** High-quality hero product shot. Lifestyle context preferred over white-background studio shots in the hero. Show the product in use or in an aspirational setting.

**Animation:** GSAP staggered entrance — headline first, then subhead, then proof strip, then CTA. `y: 40 → 0, opacity: 0 → 1`, `stagger: 0.08`.

### 4. BENEFIT MARQUEE / TRUST STRIP
A horizontal scrolling strip immediately below the hero showing key product benefits with icons.
- 4-6 items: e.g., "ENERGY", "FOCUS", "GUT HEALTH", "IMMUNITY"
- Each item: icon + label, separated by dividers or generous spacing
- Can be static on desktop, auto-scrolling marquee on mobile
- Background: slight contrast from hero (use card surface color or primary with low opacity)

### 5. PRODUCT SHOWCASE — "What You're Getting"
The product explanation section. This replaces a traditional PDP (product detail page) since this is a single-product landing page.

**Layout:** Two-column. Product image(s) on one side with annotated callouts (arrows/labels pointing to features), copy on the other.

**Content:**
- Section eyebrow: Category label (e.g., "ENERGY | FOCUS | GUT HEALTH | IMMUNITY")
- Section headline: "Covering All Aspects Of [Desired Outcome]" — benefit-framed, not feature-framed
- Brief paragraph: 2-3 sentences on the core promise
- **Flavor/Feeling split (if applicable):** Two-column mini-block — what it tastes/feels like + what it does for you
- **Badge row:** Key product attributes as icon+label badges (e.g., "48mg Caffeine", "Gluten Free", "100% Vegan", "No Sugar", "Non-GMO")
- **Ingredients or Nutrition link:** Button or expandable section

### 6. SOCIAL PROOF SECTION #1 — "The Review Wall"
First dedicated social proof section. Placed early (before deep-dive content) to establish credibility while interest is high.

**Format options (match to reference):**
- **Carousel testimonials:** Large cards with photo, star rating, title, body text, name + "Verified Buyer" badge. Auto-rotating with manual navigation arrows.
- **UGC Screenshot Wall:** Actual screenshots of Facebook/Instagram/TikTok comments. Feels raw and authentic — not polished. This is extremely effective for DTC.
- **Video testimonials:** Embedded short-form video reviews.

**Key details:**
- Always include "Verified Buyer" or verification badges
- Lead with the most emotionally compelling review, not the most generic
- Include a review count header: "200K+ FIVE STAR REVIEWS" or "Join [X] Happy Customers"
- CTA button below reviews: repeat the primary CTA

### 7. INGREDIENT / MECHANISM DEEP-DIVE — "The Science Section"
This is where you explain WHY the product works. The unique mechanism. This section converts skeptics into believers.

**Structure:**
- Section headline: "Our [X] Blend" or "What's Inside" or "The Science Behind [Product]"
- Brief introductory paragraph explaining the formulation philosophy
- **Ingredient grid:** 3-6 cards in a 2x3 or 3x2 grid. Each card:
  - Ingredient category label (e.g., "FOR STAMINA", "FOR FOCUS")
  - Ingredient name (bold)
  - 1-2 sentence benefit description
  - Optional: ingredient image
- If applicable: **Comparison cards** showing your ingredients vs. common alternatives (e.g., "4.2X MORE Vitamin A than lettuce")

**CTA at bottom of section:** Repeat primary CTA + guarantee reminder.

### 8. FOUNDER STORY / BRAND ORIGIN — "The Human Behind The Product"
People buy from people. This section creates emotional connection and establishes why this product exists.

**Layout:** Image of founder(s) alongside story text.

**Content pattern:**
- "I struggled with [same problem as customer]"
- "I tried everything: [list of failed alternatives]"
- "Then I discovered [insight that led to product]"
- "That's why I created [brand]"
- Brief mention of mission/community

Keep this section concise — 150-250 words max. It's a trust builder, not an autobiography.

### 9. HOW TO USE — "The Simple Protocol"
Reduce perceived friction. Show how easy the product is to use.

**Format:** 3-step visual guide with numbered circles, product-in-use images, and short captions.
- Step 1: [Unboxing/preparation action]
- Step 2: [Usage action]
- Step 3: [Enjoy result]

### 10. COMPARISON TABLE — "Why This Beats The Alternative"
Position the product against the most common alternative the customer is currently using or considering.

**Format:** Two-column comparison table.
- Left column: Your product (with check marks in accent color)
- Right column: The alternative (with X marks in muted/red)
- Rows: 6-10 specific comparison points
- Bottom row (optional/humorous): "False Hype ✗" on your side, "✓" on theirs

### 11. RESULTS TIMELINE (optional) — "What To Expect"
For supplements, skincare, or any product with cumulative benefits:
- Visual timeline: 1 Week → 1 Month → 2 Months → 3 Months → 6 Months → 12 Months
- Each milestone: brief description of expected benefits
- Layout: alternating left-right timeline or vertical stepping cards

### 12. SOCIAL PROOF SECTION #2 — "The Deep Review Feed"
A second, more substantial social proof section closer to the offer. This one is for the visitor who has scrolled this far and needs final reassurance.

**Format:**
- Full review feed with star breakdown (overall rating + bar chart of 5-star to 1-star distribution)
- "Reviews [count]" header with "With Photos" filter option
- Individual review cards: name, verified badge, date, star rating, title, body, optional photo
- "Load More Reviews" button

### 13. WHO IS THIS FOR / NOT FOR
Powerful qualifying section that increases conversion by making the right customer feel seen.

**"Who is [Product] for?"** — 3-4 customer archetypes with icons and brief descriptions.
**"Who is [Product] NOT for?"** — 1-2 disqualifiers (with humor if brand-appropriate). e.g., "Dudes" and "Vegans" with crossed-out icons.

### 14. URGENCY + SCARCITY BLOCK
A visual break that creates buying pressure before the offer section.
- Stock warning: "Due to high demand, [Month] has a very high risk of selling out ⚠️"
- Or: purchase counter: "[X] purchases made today"
- Or: countdown timer repeat with offer reminder

### 15. THE OFFER SECTION — "Join [Brand] Today"
The pricing/purchase section. This is the conversion event. Everything above has built to this moment.

**Structure:**
- Section headline: "Join [Brand] Today" or "Choose Your Plan"
- Countdown timer repeat (if using urgency)
- **Pricing cards:** 1-3 options. For subscription products:
  - **Hero option (emphasized):** Best-value bundle. Highlighted with primary color background, "BEST VALUE" badge, original price crossed out, sale price prominent. Itemized value stack showing free gifts and their dollar values.
  - **Secondary option:** Monthly/smaller option. Standard card, less visual emphasis.
- Each card: product images, itemized value list, quantity selector, "ADD TO CART" button, trust badges below (guarantee, shipping, cancel anytime)
- "Ships today if ordered within [countdown]" urgency element
- Below cards: scrolling marquee repeating the offer

**Shopify Integration:**
- Product data (title, price, variants, images) pulled from Shopify Storefront API
- "Add to Cart" creates a cart via the Storefront API `cartCreate` mutation
- Cart redirects to Shopify checkout URL (`cart.checkoutUrl`)
- Variant selection (size, quantity) updates the cart line items

### 16. FAQ SECTION
Accordion-style FAQ addressing the top 8-15 questions. Derive these from:
- Common objections identified in research
- Questions the reference pages answer
- Shipping, returns, ingredients, usage, safety

Each FAQ: bold question text, expandable answer panel with smooth animation. Chevron icon rotates on expand.

### 17. FOOTER
Full-width dark background with generous top border-radius.

**Content:**
- Brand logo + brief tagline
- Navigation links: Privacy Policy, Terms, Contact, Manage Subscription
- FDA/Legal disclaimer (for supplements/health products)
- Social media icons
- Copyright line

---

## Headless Shopify Integration

This site is a headless storefront: React frontend hosted on Netlify, Shopify as the backend for products, cart, and checkout.

### Setup
The Shopify Storefront API credentials are in `/shopify/`:
- `SHOPIFY_DOMAIN` — e.g., `your-store.myshopify.com`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — the private access token

### API Client
Create a utility module (`src/lib/shopify.js`) that wraps the Storefront API:

```javascript
const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

export async function shopifyFetch(query, variables = {}) {
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}
```

### Key Queries/Mutations
- **Fetch product:** Query `product(handle: "...")` for title, description, variants, prices, images
- **Create cart:** `cartCreate` mutation with selected variant ID and quantity
- **Get checkout URL:** Read `cart.checkoutUrl` from the cart response and redirect the user there on "Checkout" action

### Environment Variables
Store credentials in `.env`:
```
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-token-here
```

---

## Technical Stack

- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS v3.4+
- **Animations:** GSAP 3 with ScrollTrigger plugin
- **Icons:** Lucide React
- **Fonts:** Google Fonts via `<link>` tags based on selected preset
- **Images:** Real product images from `/assets/`. Supplement with Unsplash for lifestyle/background imagery matching preset's image mood. Never use placeholder URLs.
- **Hosting:** Netlify (static site deployment)
- **Backend:** Headless Shopify via Storefront API
- **File structure:**
  - `src/App.jsx` — Main page component composing all sections
  - `src/components/` — Individual section components
  - `src/lib/shopify.js` — Shopify API client
  - `src/index.css` — Tailwind directives + custom utilities + noise overlay
  - `.env` — Shopify credentials (gitignored)

### Responsive Requirements
- Mobile-first. All sections must work beautifully on 375px width.
- Hero: stack to single column on mobile, image above copy.
- Cards: stack vertically on mobile with full-width.
- Sticky mobile CTA bar: appears after scrolling past hero, persists at bottom of viewport.
- Pricing cards: stack vertically on mobile, hero card on top.
- Touch targets: minimum 44px tap targets for all interactive elements.
- No horizontal scroll anywhere. Ever.

---

## Copywriting Principles

This is not a brochure. This is a direct response sales page. Every word must move the reader toward purchase.

### Headline Formula
Lead with the BIGGEST SPECIFIC BENEFIT, framed around the customer's #1 pain point. Not clever. Not cute. Clear and compelling.
- Bad: "The Future of Nutrition"
- Good: "Here's Why Beef Organ Superfoods Are The Secret to Healthy Hormones & Energy"
- Bad: "Premium Dog Dental Care"
- Good: "The 10-Second Ritual That Eliminates Dog Plaque Without Brushing"

### Copy Voice
- Write at a 6th-8th grade reading level. Short sentences. Short paragraphs.
- Use the customer's language from reviews and forums, not clinical marketing-speak.
- Bold key phrases for scanners (most visitors scan, not read).
- Every section headline should be a standalone selling argument.

### CTA Button Rules
- Always action-oriented: "Try [Brand] Today →", "Add to Cart", "Unlock Your True Power"
- Never: "Submit", "Learn More", "Click Here"
- Below every CTA: risk-reversal micro-copy (guarantee + shipping)
- Repeat the CTA every 2-3 sections. A visitor should never need to scroll more than one viewport to find a way to buy.

### Emotional Arc of the Page
1. **HOOK** (Hero): "This is exactly what I've been looking for"
2. **PROOF** (Social proof #1): "Other people like me love this"
3. **EDUCATE** (Mechanism): "Now I understand WHY it works"
4. **TRUST** (Founder + credentials): "These are real people, not a faceless corporation"
5. **SIMPLIFY** (How to use): "This is actually easy"
6. **DIFFERENTIATE** (Comparison): "This is clearly better than what I'm using now"
7. **REASSURE** (Social proof #2 + FAQ): "My remaining doubts are answered"
8. **ACT** (Offer section): "I'd be crazy NOT to try this at this price with this guarantee"

---

## Screenshot Feedback Loop Protocol

After each build iteration:

1. **Capture:** Take full-page screenshots of the built site, sectioned into viewport-height chunks.
2. **Compare:** Place each chunk next to the corresponding section of the primary reference page.
3. **Audit checklist for each section:**
   - [ ] Content density match (is there a similar amount of text/imagery?)
   - [ ] Visual hierarchy match (are size relationships between elements similar?)
   - [ ] Spacing and breathing room match
   - [ ] CTA prominence and placement match
   - [ ] Social proof weight and format match
   - [ ] Color and contrast usage match
   - [ ] Mobile layout and readability match
4. **Fix:** Address every discrepancy that impacts conversion potential.
5. **Re-capture and verify.**

Run this loop a minimum of 2 times. The goal is not pixel-for-pixel copying — it's matching the conversion architecture and design quality bar of pages that are already proven to convert at scale.

---

## Build Sequence Summary

1. ✅ Read `/references/` → produce Reference Analysis for each page
2. ✅ Synthesize winning patterns across references
3. ✅ Ask user the 6 questions (single call)
4. ✅ Read `/research/` → extract copy angles, customer language, proof points
5. ✅ Write complete copy document for every section
6. ✅ Map selected preset to design tokens
7. ✅ Scaffold project: Vite + React + Tailwind + GSAP + Shopify client
8. ✅ Build all components following the Component Architecture
9. ✅ Wire Shopify integration (product data, cart, checkout redirect)
10. ✅ Screenshot Feedback Loop (minimum 2 rounds)
11. ✅ Final responsive QA pass (mobile, tablet, desktop)
12. ✅ Deliver production-ready code

**Execution Directive:** "You are not building a website. You are building a conversion machine that happens to be beautiful. Every section either moves the visitor toward purchase or it gets cut. Every pixel either builds trust or it's wasted space. The reference pages you're matching are backed by millions in ad spend and have been tested to convert at scale — respect their structure, then elevate the execution."
