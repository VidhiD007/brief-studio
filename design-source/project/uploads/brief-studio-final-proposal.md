# Brief Studio — Final Product Proposal
**A Design Strategy Compiler for interior designers**

Version 2 — revised after honest critique of the original plan

---

## What changed from Version 1 and why

The original plan promised "3 floor layout options" and a "mood board." After a hard look at what AI can and cannot do, and what a 20-year interior design professional actually needs, the product has been reframed:

- "3 floor layout options" → "Design strategy document with 3 spatial approaches"
- "Mood board" → "Visual direction brief"
- Pinterest/Cosmos API integration → removed from V1, replaced with a stronger image upload zone
- Vastu checkbox → replaced with a short dedicated Vastu/Feng Shui questionnaire
- Generate-and-done → Generate + refine loop

The product is now honestly positioned as a **brief compiler with spatial intelligence**. It does not draw floor plans. It does not produce visual collages. What it does produce is a structured, exportable, professionally formatted document that a designer walks into SketchUp or AutoCAD with — instead of a pile of meeting notes.

---

## What this product is (honest version)

A designer finishes her client meeting with a floor plan image, a set of space photos, and notes from the conversation. Currently she spends the next 4-6 hours turning those inputs into a structured design approach: analyzing the floor plan, shortlisting spatial strategies, pulling a visual direction together.

Brief Studio automates that analysis and structuring. The designer inputs everything from the meeting. The AI returns a **Design Strategy Document** — a professional brief with spatial analysis, three spatial approach descriptions, a visual direction brief, and a designer's action sheet. The designer reviews this, refines it, and walks into her next client meeting with her thinking already organized.

What the AI does not do: draw new floor plans, generate mood board images, or make structural engineering judgments. These are clearly communicated in the interface before the user generates anything.

---

## Who uses it, when, and in what mindset

**User:** The interior designer
**When:** After the client meeting (Step 1), before returning to the client (Step 3)
**Device:** Desktop primarily. Laptop acceptable.
**State of mind:** Tired from the meeting, holding a lot of information in her head, wants to offload the initial thinking so she can focus on refinement and execution
**What she needs most:** Structure and a starting point, not another blank screen

---

## The five actual problems this solves

1. Meeting notes are scattered — organizing them into a design brief takes an hour by itself
2. Floor plan analysis (spotting circulation problems, light issues, zone relationships) happens in the designer's head with no record of the reasoning
3. Coming up with 3 spatial alternatives requires significant solo thinking time
4. Visual direction research (pulling images, building the mood board scaffold) is repetitive sourcing work
5. Client taste captured in conversation is easy to misremember or misinterpret by the next meeting

---

## Screen structure — 5 steps (not 4)

A new Step 1.5 — Space Calibration — is added between uploading the floor plan and entering requirements. This is the most important change from the original plan.

**Why Step 1.5 exists:**
The AI reads the floor plan and immediately tells the designer what it understood. The designer confirms or corrects this before putting in 30 more minutes of input. This prevents the worst failure mode: AI misreading the floor plan and producing useless output at the end.

---

### Global UI elements

- **Top bar:** Tool name left | Step progress (5 labeled dots) center | "Save draft" right
- **Left panel:** Active input (~60% width)
- **Right panel:** Running summary sidebar, collapsible (~40% width)
- **Bottom:** Back | Step X of 5 | Continue
- **Aesthetic:** Dark neutral — deep charcoal background, off-white text, single warm accent. Architecture studio, not startup. No rounded pastel cards. No illustrations.
- **Before any generation, a clear expectations panel appears:** "Here's exactly what you'll receive:" with a plain list of the output sections. No surprises.

---

### Step 1 — Space documentation

**Project basics:**
- Project name (text input)
- Space type: Residential / Commercial office / Retail / Restaurant / Studio / Other
- Project phase: New design / Redesign of existing space

**Floor plan upload (required):**
- Large drag-and-drop zone
- Accepts JPG, PNG, PDF
- After upload: large thumbnail + note: "Mark north direction on your floor plan before uploading — even a written N with an arrow on the image helps the AI significantly."

**Space photos (recommended, up to 10):**
- Grid upload zone
- Helper text: "Photos help the AI understand ceiling height, existing fixtures, natural light, and depth. Minimum 2, ideally from corners and the center of each main room."

**Manual space data (this is critical — do not skip):**
A short set of fields the designer fills manually to give the AI what it cannot reliably read from an image:

- Approximate total area: [number] sq ft / sq m
- Key room dimensions (optional but recommended): 3-4 fields e.g. "Living room approx [L] × [W]"
- North direction: [dropdown: Main entrance faces North / South / East / West / I'm not sure]
- Renovation scope: [radio]
  - Cosmetic only (paint, furniture, fixtures — no wall changes)
  - Light structural (can move non-load-bearing walls)
  - Full structural (full renovation possible)
- Wet wall locations (where plumbing exists): [text — "Kitchen is on the north wall, bathroom is adjacent to bedroom 1"] — optional but important
- Any walls that absolutely cannot move: [text field, optional]

**Why this manual data matters:**
Without these fields, the AI is guessing at the most fundamental inputs. This short section takes 5 minutes and dramatically improves output quality.

---

### Step 1.5 — Floor plan calibration (NEW)

This step happens automatically after the designer clicks Continue on Step 1.

**What happens:**
The AI reads the uploaded floor plan and photos and immediately generates a short "space reading summary":

- "I can see approximately [X] rooms"
- "The space appears to have natural light entering from [direction]"
- "I can identify [elements]: corridor, open kitchen-living, closed bedroom, balcony"
- "Circulation bottlenecks I notice: [observations]"
- "Anything on the floor plan I could not read clearly: [flags]"

**What the designer does:**
She reads this summary and either:
- Confirms: "Yes, that's correct" → proceeds to Step 2
- Corrects: Edits the summary inline (short text fields, not re-uploading) → proceeds to Step 2

This calibration step is shown as a distinct visual moment — not buried in a progress bar. It's the "did the AI understand your space?" checkpoint. If the AI says something wrong here, the designer catches it before it contaminates the entire output.

**Design note:** This step typically takes 2-3 minutes. Frame it as "Let's make sure we're aligned before we go further."

---

### Step 2 — Client requirements

**Who is this space for:**
- Occupant type: Individual / Couple / Family / Team / Business with clients
- Number of people: [number]
- Specific needs (chips): Work from home / Young children / Elderly occupant / Pet owners / Frequent guests / Accessibility requirements / Prayer or meditation space

**What stays (NEW — critical field):**
- Textarea label: "List any furniture, fixtures, or elements the client wants to keep."
- Placeholder: "e.g. White L-shaped sofa, approx 3m wide. Dining table for 8. Built-in wardrobe in bedroom 1."
- Helper text: "The AI will factor these into every spatial approach it suggests."

**Budget:**
- Slider with ranges (toggle INR / USD)
- Budget implication note: Automatically flagged below slider based on renovation scope from Step 1. e.g. "At this budget with cosmetic-only scope, the AI will only suggest furniture and zone arrangements, not wall changes."

**Pain points:**
- Textarea — largest field on this step
- Label: "What is not working? What did the client tell you bothers them about the current layout?"
- No character limit. Designer should paste raw meeting notes if needed.

**Must-haves:**
- Tag chips: home office / open kitchen / guest bedroom / natural light priority / storage-first / walk-in wardrobe / reading nook / hidden storage / indoor plants / etc.
- Plus a text field: "Add your own" → becomes a chip

**Timeline:**
- Radio: No pressure / Need to present within 2 weeks / Presenting this week

---

### Step 3 — Vastu & Feng Shui (standalone step, not a checkbox)

This used to be a checkbox in Step 2. It is now its own step because it requires real input to be useful.

**Opening choice:**
- "Will this project follow Vastu Shastra, Feng Shui, or neither?"
  - Vastu Shastra → shows Vastu questions
  - Feng Shui → shows Feng Shui questions
  - Neither / not applicable → skip this step entirely

**If Vastu selected:**
- Main entrance faces: [8 directions — N, NE, E, SE, S, SW, W, NW]
- Any rooms with specific Vastu requirements the client mentioned: [chips: Kitchen / Master bedroom / Prayer room / Bathroom / Children's room]
- Is there a basement or underground space? [yes/no]
- Is there a well, borewell, or overhead tank? [yes/no + direction if yes]
- Any specific Vastu concerns the client raised: [text field]

**Honest disclaimer shown above this section:**
"AI can apply common Vastu principles based on your inputs. It is not a replacement for a full Vastu consultation by a certified Vastu expert. For clients with deep Vastu requirements, use this output as a starting filter and verify critical placements manually."

**If Feng Shui selected:**
- Bagua area of concern: [chips: Health / Wealth / Career / Relationships / etc.]
- Compass school or Black Hat school preference: [radio or "I'm not sure"]
- Any specific Feng Shui concerns the client mentioned: [text field]

Same disclaimer as above but for Feng Shui.

---

### Step 4 — Visual direction

**Style direction:**
- Tag chips (pick up to 3): Minimalist / Warm earthy / Maximalist / Industrial / Contemporary / Traditional Indian / Transitional / Japandi / Scandinavian / Eclectic / Rustic / Coastal / Mid-century modern

**Colour mood:**
- Visual swatch grid (single select): Neutral/warm / Cool and calm / Bold and contrasting / Monochromatic / All-white and airy

**Reference images:**
One unified upload zone — no Pinterest or Cosmos tabs in V1.

- Drag-and-drop multi-image zone (up to 20 images)
- Label: "Upload any inspiration images — screenshots from Pinterest, Cosmos, Instagram, magazines, anywhere."
- Helper text: "Export images from any platform and upload here. The AI will analyze what visual qualities they share to understand the client's taste."
- After upload: thumbnail grid. Designer can label each image optionally: "Liked for lighting" / "Liked for palette" / "Liked for furniture style" — these labels help the AI weight differently.

**Why no Pinterest API:**
Pinterest actively blocks automated image fetching and their API requires extended OAuth approval. Rather than build a fragile integration that will fail unpredictably, this version makes the upload experience excellent and fast. A designer can export 20 Pinterest screenshots in 3 minutes. Same result, zero dependency.

**Designer taste notes:**
- Short textarea: "Anything about the client's visual taste that the images don't capture?"
- Placeholder: "e.g. Client loves texture but hates pattern. Wants it to feel expensive but understated. Specifically said no to anything 'too modern.'"

---

### Step 5 — Review and generate

**Left panel — Confirm your inputs:**
Expandable summary cards for each step. Each has an "Edit" link that returns to that step without losing other data.

- Step 1: Space type, floor plan thumbnail, photo count, area, renovation scope, wet walls/structural notes
- Step 1.5: AI calibration summary (confirmed/corrected version)
- Step 2: Occupant type, budget, pain points excerpt, must-haves, what stays
- Step 3: Vastu/Feng Shui selections (or "Not applicable")
- Step 4: Style tags, colour mood, image count, taste notes

**Right panel — What you're about to receive:**
A clear, non-promotional list. Shown before the generate button. Not a marketing pitch — a factual list.

```
Your Design Strategy Document will include:

✓ Space analysis — what the AI read from your floor plan and photos, 
  confirmed against your corrections in Step 1.5

✓ Design parameters — a structured summary of all requirements, 
  constraints, and what-stays items

✓ Three spatial approaches — text descriptions of three different ways to 
  organize this space, each with reasoning, zone placements, traffic flow 
  notes, and Vastu/Feng Shui alignment where applicable

  NOTE: These are spatial strategy descriptions, not visual floor plan 
  drawings. You will use these as your starting brief when drawing in 
  SketchUp, AutoCAD, or your preferred tool.

✓ Visual direction brief — colour palette with hex codes, material and 
  texture vocabulary, lighting recommendations, and your reference images 
  organized by visual quality

  NOTE: This is a reference document for building your mood board, not 
  a finished mood board. The collage is yours to create.

✓ Action sheet — a prioritized checklist of what to draw, model, and 
  source based on everything above
```

**Generate button:**
Full width. Label: "Generate my design strategy →"

**Loading state:**
Do not show a spinner and leave the user waiting. Show a live progress feed:
- "Reading your floor plan..."
- "Analyzing space and light conditions..."
- "Processing client requirements..."
- "Generating spatial approaches..."
- "Building visual direction brief..."
- "Compiling your action sheet..."

Typically 30-60 seconds. Show estimated time at the start.

---

### Output — Design Strategy Document

This is a single page, not a multi-panel layout. It reads like a professional design brief, not a dashboard.

**Section 0 — Project header:**
Project name | Space type | Date generated | Designer name (pre-filled if set in preferences)

**Section 1 — Space analysis:**
Two-column layout:
- Left: The confirmed floor plan thumbnail (image)
- Right: The AI's spatial reading — rooms identified, light conditions, circulation paths observed, problem areas flagged

A highlighted "Confidence flags" box below: anything the AI is uncertain about. e.g. "Could not confirm the width of the corridor — this affects whether a double-door swing is possible in Approach 2." This is not hidden. It is shown prominently so the designer knows where to verify manually.

**Section 2 — Design parameters:**
A formatted version of all requirements, organized and cleaned up by the AI:
- Occupants and how they use the space
- What must stay and its approximate position/dimensions
- Budget implication
- Non-negotiables from client requirements
- Vastu/Feng Shui principles that will be applied (if selected), listed explicitly

**Section 3 — Three spatial approaches:**

Each approach is a card with:
- Approach name (descriptive, AI-generated — e.g. "Open south axis — kitchen-dining unified")
- Summary: one sentence on the core idea
- Zone placements: bulleted list — where each functional zone sits and why
- Traffic flow: how movement works through the space
- What stays: how the existing furniture/fixtures are accommodated
- Vastu/Feng Shui alignment: specific principles followed (or note that this approach has a conflict)
- Budget compatibility: "Compatible with cosmetic-only scope" / "Requires one non-structural wall removal" / etc.
- Pros: 3-4 points
- Constraints to be aware of: 2-3 points (honest — not called "cons" because these are professional considerations, not failures)

**Refinement input (NEW — critical addition):**
Below the three approaches, a textarea:
"Want to modify or combine any of these approaches? Describe what you'd change."
Example: "I like Approach 2 but the kitchen needs to stay on the north wall due to the wet wall location."
Button: "Regenerate with this direction →"

This replaces the generate-once model. The designer can iterate. Each refinement replaces only the spatial approaches section, not the entire document.

**Section 4 — Visual direction brief:**

Clear heading: "Visual Direction Brief — use this as your reference when building the client's mood board."

- Colour palette: 5-6 swatches with hex codes and descriptive names ("warm plaster," "aged brass," "deep teal accent")
- Material vocabulary: 5-6 material/finish cards with descriptive rationale
- Lighting direction: natural light priorities + artificial lighting layer recommendations
- Reference image grid: designer's uploaded images, organized into "Strongly aligned with client taste" / "Partially aligned" / "Less aligned" — helps the designer choose which images to use in the actual mood board
- Mood summary: one paragraph describing the overall visual identity in language the designer can share with a client

**Section 5 — Action sheet:**

A prioritized checklist the designer uses when she opens her CAD tool:

1. Confirm structural status of [wall between kitchen and living] with engineer before committing to Approach 2
2. Verify wet wall position allows for kitchen to stay north-facing
3. Measure [corridor width] to confirm double-swing door clearance
4. Source [specific material] in [budget range] — 3 suggested categories to search
5. Begin floor plan drafting with Approach [X] as primary direction — key zone positions noted
6. Check Vastu compliance for prayer room position before finalizing bedroom 2 placement

This is what makes the tool earn its keep every single time. The action sheet is a professional to-do list that the designer did not have to build herself.

**Export:**
"Download as PDF" → a formatted, printable document the designer can annotate, reference offline, or share with a junior designer or contractor
"Start new project" → returns to Step 1

---

## What this tool honestly is and isn't

| What it IS | What it is NOT |
|---|---|
| A brief compiler and spatial analysis tool | A floor plan generator |
| A structured starting point for Step 2 | A replacement for the designer's spatial judgment |
| A visual direction reference document | A finished mood board |
| A Vastu/Feng Shui filter based on common principles | A certified Vastu or Feng Shui consultation |
| A refinable document with an iteration loop | A one-shot AI oracle |
| A professional PDF you walk into your CAD session with | A client-facing presentation |

---

## Technical stack

**V1 (one-day MVP):**
- Single HTML file
- Claude Vision API (claude-sonnet-4-6 — vision model)
- Vanilla JS — no framework
- All images base64 in browser memory — no server, no database
- Output rendered as HTML with browser print-to-PDF
- No external integrations (Pinterest, Cosmos removed from V1)

**V2 (week 2-3):**
- React frontend
- Node.js/Express backend
- Persistent storage: Cloudinary for images, Postgres for project data
- User login: email or Google OAuth
- PDF generation: Puppeteer (server-side, better formatting)
- Pinterest integration (if OAuth approval obtained)

**V3 (month 2+):**
- Connect to RoomSketcher or Planner5D API to convert spatial approach descriptions into actual visual floor plan sketches
- Contractor share mode: limited view PDF for handoff
- Team accounts: multiple designers on one project
- Client share link: client views the visual direction brief and can react to it

---

## System prompt for the generation step

```
You are an expert interior designer and spatial planning consultant. 
You produce structured, professional design strategy documents.

You have received:
- A floor plan image of a space (analyze carefully)
- Photos of the existing space
- A confirmed space calibration summary (designer has verified what you read)
- Client requirements: occupants, budget, pain points, must-haves, what stays
- Vastu/Feng Shui requirements (if applicable)
- Visual taste references: style tags, colour mood, inspiration images

IMPORTANT CONSTRAINTS — be honest about these in your output:
- You cannot determine with certainty which walls are structural. Flag any 
  approach that requires wall removal with: "Verify structural status before 
  committing to this approach."
- You cannot read dimension lines reliably from images. Use the designer's 
  manually entered dimensions. Where dimensions were not provided, note this 
  as a confidence flag.
- Vastu/Feng Shui outputs apply common principles only. Note this clearly.
- If anything in the floor plan is unclear or ambiguous, flag it explicitly 
  in the Space Analysis section.

OUTPUT STRUCTURE — respond in structured JSON:
{
  "space_analysis": {
    "rooms_identified": [],
    "light_conditions": "",
    "circulation_observations": "",
    "problem_areas": [],
    "confidence_flags": []
  },
  "design_parameters": {
    "occupant_summary": "",
    "what_stays": [],
    "budget_implications": "",
    "non_negotiables": [],
    "vastu_feng_shui_principles": []
  },
  "spatial_approaches": [
    {
      "name": "",
      "summary": "",
      "zone_placements": [],
      "traffic_flow": "",
      "what_stays_accommodation": "",
      "vastu_alignment": "",
      "budget_compatibility": "",
      "pros": [],
      "constraints": []
    }
  ],
  "visual_direction_brief": {
    "colour_palette": [],
    "material_vocabulary": [],
    "lighting_direction": "",
    "reference_image_alignment": {},
    "mood_summary": ""
  },
  "action_sheet": []
}

Every output section should be specific to THIS project. No generic 
design advice. No placeholder language. If you cannot generate a 
meaningful response for a section due to missing data, say so explicitly 
— do not fill it with vague suggestions.
```

---

## Prompting sequence for Claude Design

Give these to Claude Design one at a time. Do not paste the whole document.

**Prompt 1:**
"Build a 5-step wizard tool for interior designers. Dark professional aesthetic — deep charcoal background, off-white text, single warm amber accent color. Feels like a design studio tool, not a SaaS product. Step 1 is Space Documentation: project name, space type dropdown, project phase radio, floor plan image upload zone (large, drag-and-drop), space photos upload (grid, up to 10), and a manual data section with fields for: total area, 3 key room dimensions, north direction dropdown (8 compass points), renovation scope (3 radio options), wet wall text field, walls that cannot move text field. Show a 5-dot progress indicator at the top. Right sidebar shows a running summary of what's been filled. Back and Continue buttons at the bottom."

**Prompt 2:**
"Add Step 1.5 — Floor Plan Calibration. This step appears automatically after Step 1. It shows a 'Space Reading Summary' panel — a structured summary of what the AI observed in the floor plan, formatted as short labeled fields. Each field has an inline edit button. Below the summary, a confirmation section: 'Does this look correct?' with a Confirm button and a 'Edit anything above' link. Include a brief header: 'Before we continue — let us confirm we understood your space correctly.' Same dark aesthetic."

**Prompt 3:**
"Add Step 2 — Client Requirements. Fields: occupant type radio, number of people, specific needs chips (multi-select), a 'What stays' textarea with placeholder text about existing furniture, budget slider (INR, toggleable to USD) with a budget implication note that updates dynamically based on the renovation scope from Step 1, a large pain points textarea (most important field — give it dominant visual weight), must-have tag chips with add-your-own input, and a timeline radio. Same aesthetic."

**Prompt 4:**
"Add Step 3 — Vastu and Feng Shui. Opens with a choice: Vastu Shastra / Feng Shui / Neither. 'Neither' skips the step. Vastu selection reveals: main entrance direction (8-direction compass UI, not a dropdown — show a simple directional grid), room concern chips, and three yes/no toggles with direction fields. Above the whole section, a clearly styled disclaimer box (amber-bordered, muted text): 'AI applies common principles only — not a replacement for certified consultation.' Same for Feng Shui selection. Add Step 4 — Visual Direction: style tags chips (pick up to 3), colour mood swatch grid (5 options, visual swatches not text), one unified image upload zone (up to 20 images with optional label tags per image), and a taste notes textarea."

**Prompt 5:**
"Add Step 5 — Review and Generate. Left side: expandable summary cards for all previous steps, each with an Edit link. Right side: a formatted 'What you will receive' list in a bordered box — use plain factual language, include the two NOTE lines about spatial approaches and visual brief. Full-width Generate button at the bottom. Then build the output page. Show it as a single-column professional brief document: Section 1 Space Analysis (floor plan thumbnail left, AI reading right, confidence flags below), Section 2 Design Parameters (formatted requirements), Section 3 Three Spatial Approaches (cards, each with all listed fields including the Refinement input textarea at the bottom), Section 4 Visual Direction Brief (colour swatches with hex codes, material cards, reference image grid with alignment labels, mood summary), Section 5 Action Sheet (numbered checklist). PDF export button at the top right of the output page."

**Prompt 6 (after all UI is built):**
"Connect the Generate button to the Claude Vision API. Pass all inputs including images as base64. Use this system prompt: [paste the system prompt from above]. Parse the JSON response and render each section into its designated output panel. Show a live progress feed during generation with these labels: Reading your floor plan / Analyzing space conditions / Processing requirements / Generating spatial approaches / Building visual direction / Compiling action sheet. Add the Regenerate button after the spatial approaches section — it sends the refinement textarea input plus the original context back to the API and updates only the spatial approaches section on response."
