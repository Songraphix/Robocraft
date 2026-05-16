# Robocraft Club — Brand & Website Blueprint

> **For the AI dev:** This is a single-page application (long-form landing page). Use this document as your source of truth for brand, design system, content, and build requirements.

---

## 1. Project Overview

| Property | Value |
|---|---|
| Brand Name | Robocraft Club |
| Tagline | Build. Code. Lead. / "Future-Proofing Your Child." |
| Architecture | Single-Page Application (SPA) |
| Location | Mataheko, Accra, Ghana |
| Contact | WhatsApp: 054 078 2754 |

**Value Proposition:**
We transform screen time into skill-building time. We equip children with hands-on robotics, 3D design, and coding that foster creative problem-solving and critical thinking.

**Brand Archetype:** The Creator & The Sage — Empowering, educational, innovative, and deeply trustworthy.

---

## 2. Target Audience

### Primary Buyer — Parents/Guardians (Ages 30–55)
- **Pain Point:** Kids consuming too much passive content; anxiety about tech-driven future careers.
- **Desire:** Smart, capable, future-ready children.
- **Conversion Triggers:** Safety, structured learning, visible outcomes (certifications, built projects), clear schedules.

### End User — Kids (Ages 7–15)
- **Desire:** Fun, building cool things (robots, games, automations), sense of achievement.
- **Visual Triggers:** Bright colors, other kids having fun, cool tech (3D printers, robots, Arduino boards).

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | React (preferred) or plain HTML/JS |
| Styling | Tailwind CSS |
| Animations | Framer Motion (React) or GSAP / CSS Keyframes |
| Responsiveness | Mobile-first — 70%+ of parents view on phone |

---

## 3. Design System

### Typography

| Role | Font | Usage |
|---|---|---|
| Headlines | Outfit or Fredoka | Friendly, rounded, geometric, modern |
| Accents / Tags | Space Mono or Fira Code | Subheadings, dates, small UI tags (e.g., `<Code />`) |
| Body Copy | Sora or Inter | Clean, highly readable for parents |

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Dark Navy | `#0E1C36` | Primary deep background — authority and trust |
| Midnight Black | `#070B18` | Primary typography, solid footers |
| Clean White | `#FBFCFB` | Content area backgrounds, card bases |
| Tech Blue | `#3098D9` | Structural elements, buttons, active states |
| Electric Cyan | `#38E0F2` | Hover states, glowing particles, neon accents |
| Growth Green | `#0BD99E` | Success indicators, checkmarks, secondary tags |
| Authority Gold | `#D9A84E` | **CTA ONLY** — pricing blocks, "Register Now" buttons, trust badges |
| Action Coral | `#F25252` | Urgency markers, limited-seat alerts, geometric background shapes |
| Energy Yellow | `#FFD115` | Floating 3D elements, attention highlights for kids |

> **Rule:** Authority Gold (`#D9A84E`) is strictly reserved for primary conversion elements. Do not use it decoratively.

### Visual Elements

- Floating background shapes: circles, plus signs `+`, curly brackets `{ }`, hollow triangles.
- All cards and image containers: `rounded-2xl` or `rounded-3xl`.
- Imagery: **No stock photos.** Use authentic photos of kids actively building, staring at code, or smiling with completed robots. Capture the "Aha!" moment.

---

## 4. Animations & Interactions

### Hero Mascot (Floating Robot)
- SVG or lightweight CSS/3D robot in the hero.
- "Breathing" animation: subtle vertical float loop.
- Robot eyes or head should **track mouse movement** slightly.

### Micro-interactions
- **Curriculum cards:** 3D tilt effect or upward float with a glowing Cyan drop-shadow on hover.
- **Buttons:** Magnetic pull effect or scale-down on click.

### Scroll Transitions
- Elements slide up smoothly on scroll entry.
- Background geometric shapes rotate slowly as the user scrolls down.

---

## 5. Page Architecture (Top-to-Bottom Funnel)

### Section 1 — Hero (The Hook)

- **Background:** Dark Navy (`#0B1F3B`) with slow-moving Cyan grid lines and floating Coral/Green geometric shapes.
- **Layout:** Two-column on desktop, stacked on mobile.

**Left Column:**
```
Tag (Space Mono):   // ACCRA'S PREMIER TECH CLUB
Headline (Outfit):  "Turn Screen Time Into Skill Time."
Subheadline (Sora): "Equip your child with hands-on robotics, 3D design,
                     and coding skills that foster creative problem-solving."
CTA Button:         Action Gold | Bold | "Register For June Bootcamp"
                    On hover: arrow → slides in from right
```

**Right Column:**
- Floating friendly robot graphic (SVG preferred).
- Bobs up and down; antenna glows or blinks.

---

### Section 2 — Social Proof Bar

- **Style:** Cyan background, Dark Navy text.
- **Layout:** Continuous slow-scrolling marquee.
- **Content:**
  ```
  "Trusted by 500+ Parents"  •  "Ages 7–15"  •  "Hands-On Arduino"
  •  "3D Printing"  •  "Creative Problem Solving"
  ```
  Mix techy icons between items.

---

### Section 3 — Problem vs. Solution (Agitation)

- **Background:** Clean White.
- **Headline:** "Is your child just *consuming* technology, or *creating* it?"
- **Visual:** Split layout.
  - Left: Faded static icon of a child staring at a tablet.
  - Right: Bright, vibrant floating icons — gears, `< >`, 3D printer.

---

### Section 4 — Curriculum Cards

- **Headline:** "What They Will Build & Learn"
- **Layout:** 3-column grid on desktop.

| Card | Icon |
|---|---|
| 3D Printing & Design | Floating 3D Cube |
| Arduino Coding | Glowing Microchip |
| Robotics Engineering | Moving Gears |

- **Animation:** On hover — card pops up + subtle tech pattern reveals on card background.

---

### Section 5 — Gallery (Visual Proof)

- **Headline:** "Built by Our Students"
- **Layout:** Asymmetrical masonry grid.
- **Style:** Slightly rotated Polaroid-style frames with playful geometric borders.
- **Hover state:** Frames straighten out.
- **Content:** Real photos of kids building and smiling (`289952_2.jpg` from flyer).

---

### Section 6 — Registration & FAQ (The Close)

- **Background:** Dark Navy with floating Gold and Cyan geometric dots.
- **Layout:** Two-column on desktop.

**Left Column — FAQ Accordion:**
```
Q: Does my kid need prior experience?
A: No, we start from scratch!

Q: Do I need to bring a laptop?

Q: What is the schedule?
```

**Right Column — Offer & CTA:**
```
Cohort Info Card:
  "June 15th – July 10th  |  Mataheko  |  500 GHC"

Primary CTA (pulsating, Authority Gold):
  "Secure Your Child's Spot Now"

Below CTA:
  "Or WhatsApp us at 054 078 2754"
  [floating WhatsApp icon]
```

---

### Section 7 — Footer

- Minimal and clean.
- Logo + contact info + copyright.
- Tagline in techy font at the bottom:
  ```
  BUILD. CODE. LEAD.
  ```

---

## 6. Required Functionality

| Feature | Spec |
|---|---|
| Mobile Responsiveness | Fully optimized; all interactive elements must work on mobile |
| WhatsApp Button | Floating fixed button — links to `wa.me/233540782754` |
| Registration Form | Fields: Name, Kid's Age, Program Selected |
| Form Action | Integrate with payment gateway OR redirect to manual payment instructions page |

---

## 7. Programs Offered

1. **3D Printing & Design**
2. **Arduino Coding**
3. **Robotics Engineering**

Each program page/section should include: curriculum breakdown, pricing, dates, location, and an accordion for syllabus details.

---

## 8. Key Copywriting Notes

- Speak to **parents** with professionalism.
- Speak to **kids** with excitement and friendliness.
- Lead with outcomes, not features.
- Testimonials should highlight results, e.g., *"My son won't stop talking about his Arduino project."*
- Always frame passive screen time as the problem and Robocraft as the solution.