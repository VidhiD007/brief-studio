import type { Brief, CalibrateRequest } from "./schema.js";

const isResidential = (spaceType: string) =>
  !spaceType || spaceType === "Residential" || spaceType === "Studio";

const timelineLabel = (t: string) =>
  t === "none"
    ? "No pressure"
    : t === "2weeks"
      ? "2 weeks"
      : t === "thisweek"
        ? "This week"
        : "Not specified";

export function buildPrompt(s: Brief): string {
  const cal = s.calibration || {};
  const isRes = isResidential(s.spaceType);

  const lines = [
    `PROJECT: ${s.projectName || "Untitled"}`,
    `SPACE TYPE: ${s.spaceType || "Not specified"}`,
    `PHASE: ${s.projectPhase === "new" ? "New design" : "Redesign of existing space"}`,
    `AREA: ${s.totalArea || "Unknown"} ${s.areaUnit === "sqft" ? "sq ft" : "sq m"}`,
    `CEILING HEIGHT: ${s.ceilingHeight ? s.ceilingHeight + " ft" : "Not specified"}`,
    `LEVELS: ${s.numLevels}`,
    `ENTRANCE FACES: ${s.northDirection || "Not specified"}`,
    `RENOVATION SCOPE: ${s.renovationScope || "Not specified"}`,
    `WET WALLS: ${s.wetWalls || "Not specified"}`,
    `IMMOVABLE WALLS: ${s.immovableWalls || "Not specified"}`,
    `FLOOR PLAN: ${s.hasFloorPlan ? "Uploaded" : "Not uploaded"}`,
    `PHOTOS: ${s.photoCount} uploaded`,
    "",
    "--- CALIBRATION (designer-confirmed) ---",
    `Rooms: ${cal.roomCount || "Unknown"}`,
    `Light: ${cal.lightDirection || "Unknown"}`,
    `Elements: ${cal.elements || "Unknown"}`,
    `Circulation: ${cal.circulation || "Unknown"}`,
    `Flags: ${cal.unclear || "None"}`,
    "",
    "--- CLIENT REQUIREMENTS ---",
    `OCCUPANT TYPE: ${s.occupantType || "Not specified"}`,
    isRes
      ? `NUMBER OF PEOPLE: ${s.numPeople || "Not specified"}`
      : `STAFF: ${s.staffCount || "?"}, CAPACITY: ${s.seatCapacity || "?"}`,
    `SPECIFIC NEEDS: ${s.specificNeeds.length ? s.specificNeeds.join(", ") : "None selected"}`,
    `WHAT STAYS: ${s.whatStays || "Not specified"}`,
    `WHAT MUST GO: ${s.whatGoes || "Not specified"}`,
    `BUDGET: $${(s.budget / 1000).toFixed(0)}K USD`,
    `PAIN POINTS: ${s.painPoints || "Not specified"}`,
    `MUST-HAVES: ${s.mustHaves.length ? s.mustHaves.join(", ") : "None"}`,
    `MAINTENANCE LEVEL: ${s.maintenanceLevel || "Not specified"}`,
    s.growthNotes ? `GROWTH PROJECTION: ${s.growthNotes}` : "",
    `TIMELINE: ${timelineLabel(s.timeline)}`,
    "",
    "--- VASTU / FENG SHUI ---",
    `CHOICE: ${s.vastuChoice || "Not specified"}`,
    s.vastuChoice === "vastu"
      ? [
          `Entrance: ${s.vastuEntrance || "?"}`,
          `Rooms with requirements: ${s.vastuRooms.join(", ") || "None"}`,
          `Basement: ${s.vastuBasement || "?"}, Borewell: ${s.vastuBorewell || "?"}, Tank: ${s.vastuTank || "?"}`,
          `Concerns: ${s.vastuConcerns || "None"}`,
        ].join("\n")
      : "",
    s.vastuChoice === "fengshui"
      ? [
          `Bagua areas: ${s.fsBagua.join(", ") || "None"}`,
          `School: ${s.fsSchool || "?"}`,
          `Concerns: ${s.fsConcerns || "None"}`,
        ].join("\n")
      : "",
    "",
    "--- VISUAL DIRECTION ---",
    `STYLES: ${s.styleDirections.length ? s.styleDirections.join(", ") : "Not specified"}`,
    `COLOUR MOOD: ${s.colorMood || "Not specified"}`,
    `LIGHTING PREFERENCE: ${s.lightingPref || "Not specified"}`,
    `DEAL-BREAKERS: ${s.dealBreakers || "None"}`,
    `REFERENCE IMAGES: ${s.referenceImageCount} uploaded`,
    `TASTE NOTES: ${s.tasteNotes || "None"}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export const SYSTEM_PROMPT = `You are a senior interior designer generating a design strategy document from a client brief. Follow the requested output schema exactly.

Rules:
- "analysis" should have 4-5 items summarizing the space reading
- "flags" should list 2-3 confidence warnings or things to verify
- "params" should summarize all key design parameters (6-8 items)
- Generate exactly 3 spatial approaches, each with 3-5 zones, 2-3 pros, 2-3 constraints
- "palette" should have 5-7 colors with valid hex codes matching the style direction
- "materials" should list 4-6 materials with rationale tied to the brief
- "lighting" should be a 2-3 sentence lighting strategy
- "moodSummary" should be 2-3 sentences capturing the intended feel
- "actions" should be 6-10 prioritized next steps for the designer's CAD session, numbered sequentially starting at 1
- Be specific to THIS project — reference actual rooms, dimensions, constraints from the brief
- If Vastu or Feng Shui is selected, incorporate those principles into approaches and flag any conflicts
- Tailor approaches to the renovation scope (cosmetic = no wall changes, light = non-structural only, full = anything goes)
- Match palette and materials to the selected style directions and colour mood
- Factor in maintenance level when recommending materials
- For non-residential spaces, address staff workflow and customer experience separately
- You cannot determine with certainty which walls are structural — flag any approach that requires wall removal
- Vastu/Feng Shui outputs apply common principles only; note this is not a certified consultation`;

export const REFINE_SYSTEM_PROMPT = `You are a senior interior designer refining a design strategy document. The designer has reviewed the initial output and wants changes. Follow the same output schema as the original. Incorporate the refinement feedback while keeping the parts that weren't criticized.`;

export function buildCalibrationPrompt(req: Omit<CalibrateRequest, "floorPlanImage" | "spacePhotos">, hasFloorPlan: boolean, photoCount: number): string {
  const roomLines = req.rooms
    .filter((r) => r.name.trim())
    .map((r) => `${r.name.trim()}${r.l || r.w ? ` (approx ${r.l || "?"} x ${r.w || "?"} ft)` : ""}`);

  const lines = [
    hasFloorPlan
      ? "A floor plan image is attached — read it carefully."
      : "No floor plan was uploaded. Base your reading entirely on the manual fields below and say so explicitly.",
    photoCount > 0 ? `${photoCount} space photo(s) are also attached — use them for light, ceiling height, and fixture details.` : "",
    "",
    "--- MANUAL FIELDS THE DESIGNER ENTERED ---",
    `Rooms named by designer: ${roomLines.length ? roomLines.join("; ") : "None entered"}`,
    `Total area: ${req.totalArea || "Not specified"} ${req.areaUnit === "sqft" ? "sq ft" : "sq m"}`,
    `Ceiling height: ${req.ceilingHeight ? req.ceilingHeight + " ft" : "Not specified"}`,
    `Levels: ${req.numLevels}`,
    `Main entrance faces: ${req.northDirection || "Not specified"}`,
    `Renovation scope: ${req.renovationScope || "Not specified"}`,
    `Wet wall locations (designer-provided): ${req.wetWalls || "Not specified"}`,
    `Walls that cannot move (designer-provided): ${req.immovableWalls || "Not specified"}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export const CALIBRATION_SYSTEM_PROMPT = `You are a senior interior designer doing the first read of a client's space, before writing the full design brief. You've been given an upload the designer labeled as their floor plan (and possibly space photos) plus a few manual fields they already typed in.

FIRST — check whether the upload attached as the floor plan actually is one. Accept anything that functions as a floor plan: hand-drawn sketches, architect's blueprints, CAD/vector exports, annotated or messy phone photos of a printed plan, even a rough napkin drawing — as long as it's a top-down/plan-view layout of a space. Reject it only if it's clearly NOT a floor plan: a photo taken standing in a room (eye-level/perspective view), a selfie or photo of a person, an unrelated document or screenshot, a blank/corrupted file, or any image with no plausible relationship to a room layout.

Set:
- isFloorPlan: true if the upload is a usable floor plan by the lenient standard above, false otherwise
- floorPlanIssue: if isFloorPlan is false, one short plain-language sentence a non-technical designer would understand, e.g. "This looks like a photo of a room, not an overhead floor plan drawing." If isFloorPlan is true, leave this as an empty string.

If isFloorPlan is false, you may leave the remaining fields as brief placeholders like "N/A — no valid floor plan to read" since there's nothing to analyze. If isFloorPlan is true (or no floor plan was uploaded at all — check the manual fields for that case), produce a short "space reading summary" as five more fields:
- roomCount: how many rooms/zones you can identify, named specifically (not "3 rooms" — name them, e.g. "4 rooms identified: living room, two bedrooms, kitchen")
- lightDirection: what you can tell about natural light from the floor plan's window placements and the stated entrance direction — be specific about which side light likely enters from, or say clearly if you cannot tell
- elements: notable spatial elements you can actually see (open-plan areas, corridors, balconies, single vs. multiple entry points) — reference what's really in the image, not generic boilerplate
- circulation: any traffic-flow observations — bottlenecks, awkward adjacencies, dead-end corridors — based on the actual layout, or note if circulation looks fine
- unclear: what you genuinely could not read clearly from the image (obscured dimensions, ambiguous wall thickness, unclear room boundaries) — if nothing is unclear, say so; if no floor plan was provided at all, say that plainly here instead of guessing

Ground every field in what is actually visible or actually stated — never invent room names, directions, or issues that aren't supported by the image or the manual fields. If the floor plan is genuinely illegible, say that honestly in the relevant fields rather than fabricating specifics. Keep each field to 1-2 sentences.`;
