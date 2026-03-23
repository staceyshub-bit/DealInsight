# Deal Insight Brain Drain

*Last updated: March 23, 2026 (v7)*

---

## Code Upgrades

1. Sticky summary panel (quota bar + forecast boxes stay pinned with title bar while scrolling)
2. Flip quota display, label on top, number below (FULL YEAR QUOTA then $555,000)
3. Rename "Not Forecasted" to "Unforecasted"
4. Simplify labels: TARGET CLOSE MONTH to Close Month, CLOSED LOST FLAG to Loss Reason, FORECAST to Forecast. Less Salesforce, more human.
5. Deal Intelligence signals on cards, surface risk, missing stakeholders, stage age, forecast confidence automatically
6. Build Signals framework (our own IP, replaces MEDDPICC). 4 signals mapped to 4 brand colors: The Pain (pink), The Edge (amber), The People (purple), The Process (teal). The logo IS the methodology.
7. Calendar integration
8. % chance prediction by category: will close, push, ghost, closed/lost
9. Reconfigure plan period dropdown and how it displays on title bar
10. Fix history LOG button firing multiple times/duplicating entries
11. Edit account name functionality
12. Build Value dual bar on SIGNALS tab (solid amber = deal value, ghost amber = total ARR, dollar amounts on bars)

---

## Ideas

1. Color picker for header
2. Colored expandable cards
3. Logo bars animation (left to right flash, like loading)
4. Personalization philosophy
5. Mood cards (Zen/Teal, Bold/Pink, Warm/Amber, Chill/Purple)
6. Mobile app mockup with signal bars as help/FAB button
7. Mood-to-button colors (primary action buttons change per user mood)
8. Light and dark version of header

---

## Signals Framework (confirmed March 21, 2026)

### 4 Signals = 4 Bars = 4 Colors
1. The Pain (pink #D4537E) - Why would they buy?
2. The Edge (amber #EF9F27) - Why us and not them? (combines Value + Competition into one section)
3. The People (purple #7F77DD) - Who matters?
4. The Process (teal #1D9E75) - How do they buy?

Value and Competition were combined because they're the same conversation. A rep prepping for a follow-up thinks "what do they care about, how are we better at it, and where are we not." One thought, one section.

### The Waterfall (AI generates all of this, rep touches none)
4 Signals -> Deal Score (0-100) -> + Velocity -> Confidence (0-100%) -> x ARR -> Value

- Deal Score: How well do you know this deal? The grade.
- Velocity: Is this deal alive or dying? System watches it (days since contact, close date movement, meeting cadence, who initiated). Rep never writes this.
- Confidence: How likely to close? Score + Velocity + external factors.
- Deal Value: ARR x Confidence%. Displayed as dual bar (solid amber = value, ghost amber = total ARR). The gap between bars shows the cost of low confidence. Drives time allocation ("this deal is worth $24K of your time").

### Stage-Weighted Scoring
AI grades what's missing relative to where you are in the deal. First call? Don't know the decision process yet. Nobody does. No ding. Third call and you still don't know the economic buyer? Now People gets flagged. Late stage with no paper process mapped? Pink alert. Rescue coaching attaches to the specific signal that's weak for this stage.

### Evidence Scoring Hierarchy (4 levels)
- Rep Assertion (0.25x)
- Prospect Quote (0.50x)
- Quantified Consequence (0.75x)
- Dollar Impact (1.0x)

### Deal Card Architecture
Two peer-level tabs at the top of each deal card:
- DEAL tab: The data. 4 Signals input boxes, contacts, meetings, notes, deal info. Anyone or anything fills this in: the rep, AI from a Gong transcript, email thread parsing, CRM import. It's the deal, not the rep.
- SIGNALS tab: The intelligence. Deal Score, Velocity, Confidence, Value, and per-signal rescue coaching. Everything AI-generated. Equal weight, equal real estate.

SIGNALS tab uses darker purple #3C3489 for tab text and underline (not #7F77DD).

### SIGNALS Tab Visual Design (approved March 22, 2026)

**Layout (top to bottom):**
1. Card header: Account name left, ARR right (neutral dark gray, not colored), stage label
2. DEAL / SIGNALS peer tabs
3. Four metric cards in a row
4. Four signal bars (clickable accordion, one open at a time)
5. Plain English verdict at bottom (pink left border)

**Metric Cards (4 across, each unique visualization):**

1. DEAL SCORE: Pink donut ring. Conic gradient fill showing 0-100. Number centered inside. Ring = the grade.
2. VELOCITY: Pulse line (SVG polyline). Teal when alive, amber when shifting, pink when dying. Six states: Surging (steep upward pulse), Active (healthy pulse), Cooling (flattening out), Flatline (straight pink line, dead/ghosted), Slipping (was alive, trending down), Reviving (was flat, signs of life). The line shape tells the story before you read the word. Signature feature, no competitor has this.
3. CONFIDENCE: Purple gradient bar underneath the percentage number. Bar fill = confidence level. Matches signal bar visual language.
4. VALUE: Dual bar. Two side-by-side amber bars. Left bar (solid gradient, #F4D19C to #EF9F27) = Deal Value (ARR x Confidence%). Right bar (ghost amber, same gradient at 25% opacity, dashed border) = Total ARR. Dollar amounts on each bar. The gap between bar heights IS the visual. Vertex at 15% confidence? Tiny solid stub next to a tall ghost. Apex at 95%? Bars nearly match. Visceral.

**ARR in card header:** Displayed at 18px bold, neutral dark #333 (never colored, signal colors never decorate). Positioned right side of header, pulled in ~36px from edge to align roughly over the Value metric card below.

**Signal Bars:**
- Layout: Signal name (12px, dark gray #444) left, gradient bar center, score number (17px bold, dark gray #444) right
- No health labels ("Gaps", "Needs work", "In progress" removed). The bar length says it. Don't treat reps like idiots.
- Bar: 7px tall, rounded, gradient from light to saturated in the signal's own brand color
  - The Pain: #F2BACC to #D4537E
  - The Edge: #F4D19C to #EF9F27
  - The People: #BDB8E9 to #7F77DD
  - The Process: #92CFB2 to #1D9E75
- "The bar is the brand. The length is the grade."
- Background: #F8F7F4 card on white, #E8E8E4 bar track

**Signal Color Rule (resolved March 22):**
Two color systems, two jobs, no confusion. The signal's brand color lives ONLY on the gradient bar and the signal name in the coaching section. Health status colors (pink=bad, amber=gaps, purple=progress, teal=strong) are NOT used on the signal bars. One color system per element. The bar handles identity. The length handles severity.

**Coaching Accordion:**
- One signal open at a time. Opening one closes the others. Card is already dense.
- Expanded section has two parts:
  - "WHY THIS SCORE" (8px label, gray #999) with narrative in 11px gray
  - "WHAT TO DO" (8px label, in the signal's own brand color) with specific words to say in 11px dark gray
- Collapsed by default. Scan the bars, spot the short ones, click to find out why and what to fix.

**Plain English Verdict:**
- Pink (#D4537E) left border, 3px
- "PLAIN ENGLISH" label in pink, 8px bold
- AI summary in 11px, #555
- Always at the bottom of the SIGNALS tab

### ACTIVE/PROSPECTS Dividers (approved March 21)
- Centered text, midnight #1B1F3B horizontal lines on both sides
- No box, no gradient, no rainbow (header rainbow bar owns that moment)
- Text: 13px bold, letter-spacing 0.12em, color #1B1F3B

---

## Future Product Vision

### Enterprise Knowledge Base (set once by manager)
Upload pricing, product info, case studies, competitive intel, brand guidelines, and assets into Signals. Every rep gets this as their foundation. Done once at the enterprise level.

### Three AI Modes Per Deal

**PRECALL** - Before the meeting
AI reads the deal's Signals tab, checks what's weak for this stage, pulls relevant case studies and competitive facts, and gives the rep a prep sheet. "Here's what you need to find out. Here's a case study about a company like theirs. Here's where MITTS falls short on the thing they care about."

**POSTCALL** - After the call
From Gong transcript or email thread, AI scores what the rep actually did. "You uncovered the budget holder. You never asked about timeline. You let them control the demo and skipped the ROI conversation." Performance score plus specific coaching on how to recover in the follow-up.

**DRAFTING** - AI generates deliverables
Follow-up email referencing what was actually discussed. Proposal deck with correct pricing, relevant case study, targeted competitive positioning. Not generic templates. Built from the deal's actual evidence and the enterprise knowledge base.

### The Thesis
The Signals tab becomes the living brain of each deal. Rep writes the story, AI scores it, coaches before and after every interaction, and generates the deliverables. The rep's only job is to sell. Everything else is a side effect. Gong records calls. Clari forecasts. Neither one coaches the rep in the moment and then writes the follow-up using their actual deal context.

---

## Stacey To-Do

1. Review lost, stuck, and ghosted accounts
2. Meet with 10 sales people to understand current pain, current shadow systems, and wish list
3. Score Hi-Line, they went south
4. Apply DI design upgrades to Phocas tracker
5. Sync all DI production features to Phocas tracker (everything except logo)
6. File trademarks: "Deal Insight", "Signals", "The Edge"
7. Find trademark attorney

---

## Design Decisions Log

### March 17, 2026: DealInsight Header v8 (approved direction)

**Top bar (above rainbow):**
- Logo left: 52px signal bars, 22px Nunito wordmark
- DI branding: "deal insight" + "Pipeline Intelligence" (Phocas version: "Pipeline Tracker" + "Phocas Software")
- Search centered, 300px wide
- Period dropdown right, no label (minimalism)
- Light/dark toggle pill
- No date display
- Keep Export/Import buttons (needed for backups)

**Rainbow bar:**
- Static, decorative, 8px thick
- Order: amber, pink, purple, teal
- Midnight mode uses dark palette colors

**Summary panel (below rainbow):**
- Name/AE left, Quota right, same line
- Quota abbreviated ($1.2M not $1,200,000)
- White bucket cards with colored text (both light and dark modes)
- Bucket info: label, abbreviated dollar amount, "% to plan"
- Midnight mode: white cards pop against dark background
- Midnight mode gets +6px padding on top bar to compensate for dark bg visual compression
- Proportions: top bar ~40%, summary ~60%

### Design Rules (permanent)
- Keep subtle colored left-border shading on collapsed deal cards (from Phocas tracker)
- Target close date field only shows on Open and Won stages, hidden on all others
- Both trackers get DI header with light/dark toggle
- Keep Phocas and DI trackers legally separate
- Summary panel (name/quota/buckets) should also go dark in midnight mode

### Core Principles
- Minimalism is law. Fewer words, less corporate speak, simpler UI = higher adoption
- If a label can be removed and the UI still makes sense, remove it
- If a word can be cut, cut it. The product should feel obvious, not explained
- Sales is hard enough. Why overcomplicate it.
- "Reps aren't stupid. You just gave them the wrong tools."

---

## Completed

- MEDDPICC removed from product entirely. Signals is the framework. (March 21, 2026)
- ACTIVE/PROSPECTS dividers: centered text with midnight lines, no box (March 21, 2026)
- Summary buckets: "% to plan" added (March 21, 2026)
- Default collapsed sections: only Open starts expanded (March 21, 2026)
- Company Notes renamed to Company Intelligence, Company Intelligence renamed to Deal Notes (gray border) (March 21, 2026)
- Stage section dividers: removed SHOW/HIDE text and arrows (March 21, 2026)
- Bible Section 17 rebuilt: Legal, IP & Defensibility. Trademarks, patents, copyrights, trade secrets, SOC2/GDPR/SSO, pre-launch checklist. (March 23, 2026)
- "Why Methodologies Fail Without Deal Insight" added to legal section. First date analogy, smoke alarm with no floorplan + glow-in-the-dark exit signs, manager quality lottery, multi-dimensional scoring. (March 23, 2026)
- Examine. Diagnose. Coach. engine added. Replaces Detect/Diagnose/Prescribe. 4 coaching sections (Pain, Edge, People, Process). Velocity is a symptom, not a root cause. (March 23, 2026)
- "What the Rep Sees vs What the AI Scores" section added. 4 signals visible, 15+ checkpoints scored underneath. (March 23, 2026)
- Color Discipline system approved. Colors earned by score, not assigned by identity. Teal=80-100, Purple=60-79, Amber=40-59, Pink=0-39. Replaces old 5-jobs-per-color system. (March 23, 2026)
- Deal card redesign approved. Collapsed: tinted background + ARR + score number. Expanded: score hides, metrics take over. (March 23, 2026)
- Metric boxes finalized. Deal Score = number in circle. Velocity = pulse line. Confidence = half gauge. Value/ARR = stacked boxes. Each metric unique visual. All scored outputs earn their color. ARR stays gray. No dollar signs with K. (March 23, 2026)
- Signal bars: flat solid, 8px tall, no gradient, gray numbers, earned colors. White clickable cards with chevrons. (March 23, 2026)
- Signal interior: three zones, three shades. Summary (lightest) > Evidence (medium) > Coaching (darkest). Bold labels. (March 23, 2026)
- DEAL tab is default (rep's workspace). SIGNALS tab is second (AI output). (March 23, 2026)
- Old health labels killed (Warning/Emergency/Working/Winning colored dots). Deal Score number IS the health. (March 23, 2026)
- Extended Signal Palette (12 shades) and Stage Rebrand Mapping removed from Bible. Replaced by Color Discipline. (March 23, 2026)
