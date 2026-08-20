import { isResidentialType, timelineLabel } from "./constants";
import type { WizardState } from "./types";

export interface StepValidation { valid: boolean; message: string }

// What must be filled in before the wizard lets you continue past each step.
// Fields not listed here (e.g. room dimensions, wet walls, taste notes) stay optional,
// matching the "recommended" vs "required" language already shown in the form itself.
export function validateStep(s: WizardState): StepValidation {
  const missing: string[] = [];

  if (s.step === 1) {
    if (!s.projectName.trim()) missing.push("project name");
    if (!s.spaceType) missing.push("space type");
    if (!s.projectPhase) missing.push("project phase");
    if (!s.floorPlan) missing.push("floor plan upload");
  } else if (s.step === 2) {
    if (!s.occupantType) missing.push("who this space is for");
    if (isResidentialType(s.spaceType)) {
      if (!s.numPeople.trim()) missing.push("number of people");
    } else {
      if (!s.staffCount.trim()) missing.push("staff count");
      if (!s.seatCapacity.trim()) missing.push("capacity");
    }
    if (!s.painPoints.trim()) missing.push("pain points");
    if (!s.timeline) missing.push("timeline");
  } else if (s.step === 3) {
    if (!s.vastuChoice) missing.push("a Vastu / Feng Shui / Neither selection");
  } else if (s.step === 4) {
    if (s.styleDirections.length === 0) missing.push("at least one style direction");
    if (!s.colorMood) missing.push("colour mood");
    if (!s.lightingPref) missing.push("lighting preference");
  }

  if (missing.length === 0) return { valid: true, message: "" };
  return { valid: false, message: `Please fill in: ${missing.join(", ")}` };
}

export interface SummaryItem { label: string; value: string }

export function summaryItems(s: WizardState): SummaryItem[] {
  const items: SummaryItem[] = [];
  if (s.projectName) items.push({ label: "Project", value: s.projectName });
  if (s.spaceType) items.push({ label: "Type", value: s.spaceType });
  if (s.projectPhase) items.push({ label: "Phase", value: s.projectPhase === "new" ? "New design" : "Redesign" });
  if (s.floorPlan) items.push({ label: "Floor plan", value: s.floorPlan.name });
  if (s.spacePhotos.length) items.push({ label: "Photos", value: `${s.spacePhotos.length} uploaded` });
  if (s.totalArea) items.push({ label: "Area", value: `${s.totalArea} ${s.areaUnit === "sqft" ? "sq ft" : "sq m"}` });
  if (s.northDirection) items.push({ label: "Entrance", value: s.northDirection });
  if (s.ceilingHeight) items.push({ label: "Ceiling", value: `${s.ceilingHeight} ft` });
  if (s.renovationScope) items.push({ label: "Scope", value: s.renovationScope.charAt(0).toUpperCase() + s.renovationScope.slice(1) });
  if (s.occupantType) items.push({ label: "Occupants", value: s.occupantType });
  if (s.numPeople) items.push({ label: "People", value: s.numPeople });
  if (s.mustHaves.length) items.push({ label: "Must-haves", value: s.mustHaves.join(", ") });
  if (s.maintenanceLevel) items.push({ label: "Maintenance", value: s.maintenanceLevel.charAt(0).toUpperCase() + s.maintenanceLevel.slice(1) });
  if (s.vastuChoice) items.push({ label: "Vastu/FS", value: s.vastuChoice === "neither" ? "None" : s.vastuChoice.charAt(0).toUpperCase() + s.vastuChoice.slice(1) });
  if (s.styleDirections.length) items.push({ label: "Style", value: s.styleDirections.join(", ") });
  if (s.colorMood) items.push({ label: "Colour", value: s.colorMood });
  if (s.lightingPref) items.push({ label: "Lighting", value: s.lightingPref.charAt(0).toUpperCase() + s.lightingPref.slice(1) });
  if (s.referenceImages.length) items.push({ label: "Ref images", value: `${s.referenceImages.length} uploaded` });
  return items;
}

export interface ReviewItem { k: string; v: string }
export interface ReviewSection {
  key: string;
  label: string;
  stepNum: number;
  summary: string;
  items: ReviewItem[];
}

export function reviewSections(s: WizardState): ReviewSection[] {
  const budgetDisplay = `$${(s.budget / 1000).toFixed(0)}K`;
  return [
    {
      key: "s1",
      label: "Space documentation",
      stepNum: 1,
      items: [
        { k: "Project", v: s.projectName || "—" },
        { k: "Type", v: s.spaceType || "—" },
        { k: "Floor plan", v: s.floorPlan ? s.floorPlan.name : "Not uploaded" },
        { k: "Photos", v: `${s.spacePhotos.length} uploaded` },
        { k: "Area", v: s.totalArea ? `${s.totalArea} ${s.areaUnit === "sqft" ? "sq ft" : "sq m"}` : "—" },
        { k: "Ceiling", v: s.ceilingHeight ? `${s.ceilingHeight} ft` : "—" },
        { k: "Levels", v: s.numLevels === "1" ? "Single" : s.numLevels },
        { k: "Scope", v: s.renovationScope || "—" },
      ],
      summary: [s.spaceType, s.totalArea ? `${s.totalArea}${s.areaUnit === "sqft" ? " sq ft" : " sq m"}` : "", s.floorPlan ? "Floor plan ✓" : ""]
        .filter(Boolean)
        .join(" · ") || "Not started",
    },
    {
      key: "s15",
      label: "Floor plan calibration",
      stepNum: 1.5,
      items: [{ k: "Status", v: s.calibration ? "Confirmed" : "Pending" }],
      summary: s.calibration ? "AI reading confirmed" : "Pending",
    },
    {
      key: "s2",
      label: "Client requirements",
      stepNum: 2,
      items: [
        { k: "Occupant", v: s.occupantType || "—" },
        { k: "People", v: s.numPeople || "—" },
        { k: "Budget", v: budgetDisplay },
        { k: "Must-haves", v: s.mustHaves.length ? s.mustHaves.join(", ") : "—" },
        { k: "What must go", v: s.whatGoes || "—" },
        { k: "Maintenance", v: s.maintenanceLevel || "—" },
        { k: "Timeline", v: timelineLabel(s.timeline) },
      ],
      summary: [s.occupantType, s.numPeople ? `${s.numPeople} people` : "", budgetDisplay].filter(Boolean).join(" · ") || "Not started",
    },
    {
      key: "s3",
      label: "Vastu & Feng Shui",
      stepNum: 3,
      items: [
        { k: "Selection", v: s.vastuChoice === "vastu" ? "Vastu Shastra" : s.vastuChoice === "fengshui" ? "Feng Shui" : s.vastuChoice === "neither" ? "Neither" : "—" },
        { k: "Entrance", v: s.vastuEntrance || "—" },
      ],
      summary: s.vastuChoice ? (s.vastuChoice === "neither" ? "Not applicable" : s.vastuChoice.charAt(0).toUpperCase() + s.vastuChoice.slice(1)) : "Not started",
    },
    {
      key: "s4",
      label: "Visual direction",
      stepNum: 4,
      items: [
        { k: "Styles", v: s.styleDirections.length ? s.styleDirections.join(", ") : "—" },
        { k: "Colour mood", v: s.colorMood || "—" },
        { k: "Lighting", v: s.lightingPref || "—" },
        { k: "Deal-breakers", v: s.dealBreakers || "—" },
        { k: "Ref images", v: `${s.referenceImages.length} uploaded` },
      ],
      summary: s.styleDirections.length ? s.styleDirections.join(", ") : "Not started",
    },
  ];
}

// Whether there's real, meaningful entered data worth warning about losing
// on an accidental reload/close. A handful of representative fields rather
// than a full deep-diff against the initial state — cheap to read, easy to
// reason about, and reaching step 2+ already implies Step 1's required
// fields were filled in (see validateStep).
export function hasMeaningfulData(s: WizardState): boolean {
  return (
    s.step > 1 ||
    s.projectName.trim() !== "" ||
    s.spaceType !== "" ||
    s.floorPlan !== null ||
    s.spacePhotos.length > 0
  );
}
