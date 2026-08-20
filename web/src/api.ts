import type { BriefOutput, Calibration, UploadedImage, WizardState } from "./types";

// In dev, Vite proxies /api to the local backend (see vite.config.ts).
// In production, the frontend and backend are usually deployed separately
// (e.g. Vercel + Render), so VITE_API_URL must point at the backend's URL.
const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

// UploadedImage.url is a data: URL (from FileReader) — split it into the
// {mediaType, dataBase64} shape the server expects.
function toImagePayload(img: UploadedImage): { mediaType: string; dataBase64: string } {
  const match = /^data:([^;]+);base64,(.*)$/s.exec(img.url);
  if (!match) throw new Error(`Unexpected image data URL for ${img.name}`);
  return { mediaType: match[1], dataBase64: match[2] };
}

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
  const res = await fetch(`${API_BASE}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brief: toBriefPayload(state) }),
  });
  if (!res.ok) throw new Error(`Generate failed: ${res.status}`);
  const data = await res.json();
  return data.output as BriefOutput;
}

export async function calibrateSpace(state: WizardState): Promise<Calibration> {
  const body = {
    floorPlanImage: state.floorPlan ? toImagePayload(state.floorPlan) : null,
    spacePhotos: state.spacePhotos.slice(0, 3).map(toImagePayload),
    rooms: state.rooms,
    totalArea: state.totalArea,
    areaUnit: state.areaUnit,
    ceilingHeight: state.ceilingHeight,
    numLevels: state.numLevels,
    northDirection: state.northDirection,
    renovationScope: state.renovationScope,
    wetWalls: state.wetWalls,
    immovableWalls: state.immovableWalls,
  };
  const res = await fetch(`${API_BASE}/api/calibrate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Calibration failed: ${res.status}`);
  const data = await res.json();
  return data.calibration as Calibration;
}

export async function refineOutput(
  state: WizardState,
  previousOutput: BriefOutput,
  refinement: string,
): Promise<BriefOutput> {
  const res = await fetch(`${API_BASE}/api/refine`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brief: toBriefPayload(state), previousOutput, refinement }),
  });
  if (!res.ok) throw new Error(`Refine failed: ${res.status}`);
  const data = await res.json();
  return data.output as BriefOutput;
}
