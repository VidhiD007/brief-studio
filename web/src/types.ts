export interface UploadedImage {
  name: string;
  url: string;
}

export interface RoomDim {
  name: string;
  l: string;
  w: string;
}

export interface Calibration {
  isFloorPlan: boolean;
  floorPlanIssue: string;
  roomCount: string;
  lightDirection: string;
  elements: string;
  circulation: string;
  unclear: string;
}

export interface OutputAnalysisItem { label: string; value: string }
export interface OutputFlag { text: string }
export interface OutputParam { label: string; value: string }
export interface OutputApproach {
  name: string;
  summary: string;
  zones: { text: string }[];
  traffic: string;
  pros: { text: string }[];
  constraints: { text: string }[];
  budgetLine: string;
}
export interface OutputPaletteItem { name: string; hex: string; desc: string }
export interface OutputMaterial { name: string; rationale: string }
export interface OutputAction { num: number; text: string }

export interface BriefOutput {
  analysis: OutputAnalysisItem[];
  flags: OutputFlag[];
  params: OutputParam[];
  approaches: OutputApproach[];
  palette: OutputPaletteItem[];
  materials: OutputMaterial[];
  lighting: string;
  moodSummary: string;
  actions: OutputAction[];
}

export type ViewMode = "wizard" | "generating" | "output";

export interface WizardState {
  step: number; // 1, 1.5, 2, 3, 4, 5
  sidebarOpen: boolean;

  // Step 1
  projectName: string;
  spaceType: string;
  projectPhase: string;
  floorPlan: UploadedImage | null;
  spacePhotos: UploadedImage[];
  totalArea: string;
  areaUnit: "sqft" | "sqm";
  rooms: RoomDim[];
  ceilingHeight: string;
  numLevels: string;
  northDirection: string;
  renovationScope: string;
  wetWalls: string;
  immovableWalls: string;
  checkingFloorPlan: boolean;
  floorPlanError: string;

  // Step 1.5
  calibration: Calibration | null;
  calibrationEdits: Partial<Calibration>;

  // Step 2
  occupantType: string;
  numPeople: string;
  staffCount: string;
  seatCapacity: string;
  specificNeeds: string[];
  whatStays: string;
  whatGoes: string;
  budget: number;
  painPoints: string;
  mustHaves: string[];
  customMustHave: string;
  maintenanceLevel: string;
  growthNotes: string;
  timeline: string;

  // Step 3
  vastuChoice: string;
  vastuEntrance: string;
  vastuRooms: string[];
  vastuBasement: string;
  vastuBorewell: string;
  vastuTank: string;
  vastuConcerns: string;
  fsBagua: string[];
  fsSchool: string;
  fsConcerns: string;

  // Step 4
  styleDirections: string[];
  colorMood: string;
  lightingPref: string;
  dealBreakers: string;
  referenceImages: UploadedImage[];
  tasteNotes: string;

  // Step 5 / review
  expandedSections: Record<string, boolean>;

  // Generation
  generating: boolean;
  genStep: number;
  showOutput: boolean;
  output: BriefOutput | null;
  refinement: string;
}

export const initialState: WizardState = {
  step: 1,
  sidebarOpen: true,
  projectName: "",
  spaceType: "",
  projectPhase: "",
  floorPlan: null,
  spacePhotos: [],
  totalArea: "",
  areaUnit: "sqft",
  rooms: [
    { name: "Living room", l: "", w: "" },
    { name: "Bedroom 1", l: "", w: "" },
    { name: "Kitchen", l: "", w: "" },
  ],
  ceilingHeight: "",
  numLevels: "1",
  northDirection: "",
  renovationScope: "",
  wetWalls: "",
  immovableWalls: "",
  checkingFloorPlan: false,
  floorPlanError: "",
  calibration: null,
  calibrationEdits: {},
  occupantType: "",
  numPeople: "",
  staffCount: "",
  seatCapacity: "",
  specificNeeds: [],
  whatStays: "",
  whatGoes: "",
  budget: 15000,
  painPoints: "",
  mustHaves: [],
  customMustHave: "",
  maintenanceLevel: "",
  growthNotes: "",
  timeline: "",
  vastuChoice: "",
  vastuEntrance: "",
  vastuRooms: [],
  vastuBasement: "",
  vastuBorewell: "",
  vastuTank: "",
  vastuConcerns: "",
  fsBagua: [],
  fsSchool: "",
  fsConcerns: "",
  styleDirections: [],
  colorMood: "",
  lightingPref: "",
  dealBreakers: "",
  referenceImages: [],
  tasteNotes: "",
  expandedSections: {},
  generating: false,
  genStep: 0,
  showOutput: false,
  output: null,
  refinement: "",
};

export const MAX_PHOTOS = 10;
export const MAX_REF_IMAGES = 20;
