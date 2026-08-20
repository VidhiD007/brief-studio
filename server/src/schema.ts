import { z } from "zod/v4";

export const OutputSchema = z.object({
  analysis: z.array(z.object({ label: z.string(), value: z.string() })),
  flags: z.array(z.object({ text: z.string() })),
  params: z.array(z.object({ label: z.string(), value: z.string() })),
  approaches: z.array(
    z.object({
      name: z.string(),
      summary: z.string(),
      zones: z.array(z.object({ text: z.string() })),
      traffic: z.string(),
      pros: z.array(z.object({ text: z.string() })),
      constraints: z.array(z.object({ text: z.string() })),
      budgetLine: z.string(),
    }),
  ),
  palette: z.array(
    z.object({ name: z.string(), hex: z.string(), desc: z.string() }),
  ),
  materials: z.array(
    z.object({ name: z.string(), rationale: z.string() }),
  ),
  lighting: z.string(),
  moodSummary: z.string(),
  actions: z.array(z.object({ num: z.number(), text: z.string() })),
});

export type BriefOutput = z.infer<typeof OutputSchema>;

// Mirrors the wizard state shape sent from the client.
export const BriefSchema = z.object({
  projectName: z.string(),
  spaceType: z.string(),
  projectPhase: z.string(),
  totalArea: z.string(),
  areaUnit: z.string(),
  ceilingHeight: z.string(),
  numLevels: z.string(),
  northDirection: z.string(),
  renovationScope: z.string(),
  wetWalls: z.string(),
  immovableWalls: z.string(),
  hasFloorPlan: z.boolean(),
  photoCount: z.number(),
  calibration: z.record(z.string(), z.string()).nullable(),
  occupantType: z.string(),
  numPeople: z.string(),
  staffCount: z.string(),
  seatCapacity: z.string(),
  specificNeeds: z.array(z.string()),
  whatStays: z.string(),
  whatGoes: z.string(),
  budget: z.number(),
  painPoints: z.string(),
  mustHaves: z.array(z.string()),
  maintenanceLevel: z.string(),
  growthNotes: z.string(),
  timeline: z.string(),
  vastuChoice: z.string(),
  vastuEntrance: z.string(),
  vastuRooms: z.array(z.string()),
  vastuBasement: z.string(),
  vastuBorewell: z.string(),
  vastuTank: z.string(),
  vastuConcerns: z.string(),
  fsBagua: z.array(z.string()),
  fsSchool: z.string(),
  fsConcerns: z.string(),
  styleDirections: z.array(z.string()),
  colorMood: z.string(),
  lightingPref: z.string(),
  dealBreakers: z.string(),
  referenceImageCount: z.number(),
  tasteNotes: z.string(),
});

export type Brief = z.infer<typeof BriefSchema>;

export const RefineRequestSchema = z.object({
  brief: BriefSchema,
  previousOutput: OutputSchema,
  refinement: z.string().min(1),
});
