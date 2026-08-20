import type { BriefOutput, Calibration, WizardState } from "./types";

function toBriefPayload(s: WizardState) {
  const cal: Record<string, string> = {};
  if (s.calibration) {
    (Object.keys(s.calibration) as (keyof Calibration)[]).forEach((k) => {
      cal[k] = s.calibrationEdits[k] ?? s.calibration![k];
    });
  }
  return {
    projectName: s.projectName,
    spaceType: s.spaceType,
    projectPhase: s.projectPhase,
    totalArea: s.totalArea,
    areaUnit: s.areaUnit,
    ceilingHeight: s.ceilingHeight,
    numLevels: s.numLevels,
    northDirection: s.northDirection,
    renovationScope: s.renovationScope,
    wetWalls: s.wetWalls,
    immovableWalls: s.immovableWalls,
    hasFloorPlan: !!s.floorPlan,
    photoCount: s.spacePhotos.length,
    calibration: s.calibration ? cal : null,
    occupantType: s.occupantType,
    numPeople: s.numPeople,
    staffCount: s.staffCount,
    seatCapacity: s.seatCapacity,
    specificNeeds: s.specificNeeds,
    whatStays: s.whatStays,
    whatGoes: s.whatGoes,
    budget: s.budget,
    painPoints: s.painPoints,
    mustHaves: s.mustHaves,
    maintenanceLevel: s.maintenanceLevel,
    growthNotes: s.growthNotes,
    timeline: s.timeline,
    vastuChoice: s.vastuChoice,
    vastuEntrance: s.vastuEntrance,
    vastuRooms: s.vastuRooms,
    vastuBasement: s.vastuBasement,
    vastuBorewell: s.vastuBorewell,
    vastuTank: s.vastuTank,
    vastuConcerns: s.vastuConcerns,
    fsBagua: s.fsBagua,
    fsSchool: s.fsSchool,
    fsConcerns: s.fsConcerns,
    styleDirections: s.styleDirections,
    colorMood: s.colorMood,
    lightingPref: s.lightingPref,
    dealBreakers: s.dealBreakers,
    referenceImageCount: s.referenceImages.length,
    tasteNotes: s.tasteNotes,
  };
}

export async function generateOutput(state: WizardState): Promise<BriefOutput> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brief: toBriefPayload(state) }),
  });
  if (!res.ok) throw new Error(`Generate failed: ${res.status}`);
  const data = await res.json();
  return data.output as BriefOutput;
}

export async function refineOutput(
  state: WizardState,
  previousOutput: BriefOutput,
  refinement: string,
): Promise<BriefOutput> {
  const res = await fetch("/api/refine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brief: toBriefPayload(state), previousOutput, refinement }),
  });
  if (!res.ok) throw new Error(`Refine failed: ${res.status}`);
  const data = await res.json();
  return data.output as BriefOutput;
}
