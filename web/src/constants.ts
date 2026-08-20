export const SPACE_TYPES = [
  "Residential",
  "Commercial office",
  "Retail",
  "Restaurant",
  "Studio",
  "Other",
];

export const PHASE_OPTIONS = [
  { value: "new", label: "New design" },
  { value: "redesign", label: "Redesign of existing space" },
];

export const RENOVATION_OPTIONS = [
  { value: "cosmetic", label: "Cosmetic only", desc: "Paint, furniture, fixtures — no wall changes" },
  { value: "light", label: "Light structural", desc: "Can move non-load-bearing walls" },
  { value: "full", label: "Full structural", desc: "Full renovation possible" },
];

export const DIRECTIONS = [
  "North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest",
];

export const OCCUPANT_OPTIONS = ["Individual", "Couple", "Family", "Team", "Business with clients"];

const NEEDS_BASE = ["Accessibility"];
const NEEDS_RES = ["Work from home", "Young children", "Elderly occupant", "Pet owners", "Frequent guests", "Prayer / meditation"];
const NEEDS_OFFICE = ["Meeting rooms", "Phone booths", "Server / IT room", "Breakout area", "Reception / lobby", "Visitor parking"];
const NEEDS_RESTAURANT = ["Commercial kitchen", "Bar area", "Outdoor seating", "Takeaway counter", "Private dining", "Staff room"];
const NEEDS_RETAIL = ["Display windows", "Storage / back-of-house", "Fitting rooms", "POS area", "Customer lounge"];

export function isResidentialType(spaceType: string): boolean {
  return !spaceType || spaceType === "Residential" || spaceType === "Studio";
}

export function needsChipsFor(spaceType: string): string[] {
  if (!spaceType || spaceType === "Residential" || spaceType === "Studio") return [...NEEDS_RES, ...NEEDS_BASE];
  if (spaceType === "Commercial office") return [...NEEDS_OFFICE, ...NEEDS_BASE];
  if (spaceType === "Restaurant") return [...NEEDS_RESTAURANT, ...NEEDS_BASE];
  if (spaceType === "Retail") return [...NEEDS_RETAIL, ...NEEDS_BASE];
  return [...NEEDS_RES, ...NEEDS_BASE];
}

const MUST_HAVES_RES = ["Home office", "Open kitchen", "Guest bedroom", "Natural light priority", "Storage-first", "Walk-in wardrobe", "Reading nook", "Hidden storage", "Indoor plants"];
const MUST_HAVES_OFFICE = ["Standing desks", "Collaboration zone", "Quiet focus area", "AV / video conferencing", "Kitchen / pantry", "Wellness room", "Natural light priority", "Storage-first", "Indoor plants"];
const MUST_HAVES_RESTAURANT = ["Open kitchen", "Chef's table", "Wine storage", "Ventilation priority", "Natural light priority", "Flexible seating", "Sound management", "Outdoor dining", "Storage-first"];
const MUST_HAVES_RETAIL = ["Window display", "Checkout counter", "Customer seating", "Fitting area", "Natural light priority", "Storage-first", "Digital displays", "Indoor plants"];

export function mustHaveChipsFor(spaceType: string): string[] {
  if (spaceType === "Commercial office") return MUST_HAVES_OFFICE;
  if (spaceType === "Restaurant") return MUST_HAVES_RESTAURANT;
  if (spaceType === "Retail") return MUST_HAVES_RETAIL;
  return MUST_HAVES_RES;
}

export function capacityLabelFor(spaceType: string): string {
  if (spaceType === "Restaurant") return "Seating capacity";
  if (spaceType === "Retail") return "Customer capacity";
  return "Desk/seat capacity";
}

export function capacityPlaceholderFor(spaceType: string): string {
  if (spaceType === "Restaurant") return "e.g. 40 covers";
  if (spaceType === "Retail") return "e.g. 30";
  return "e.g. 50 desks";
}

export const MAINTENANCE_OPTIONS = [
  { value: "low", label: "Low maintenance", desc: "Durable, easy-clean materials" },
  { value: "moderate", label: "Moderate", desc: "Some natural materials OK" },
  { value: "high", label: "High maintenance OK", desc: "Prioritize beauty over practicality" },
];

export const TIMELINE_OPTIONS = [
  { value: "none", label: "No pressure" },
  { value: "2weeks", label: "Present within 2 weeks" },
  { value: "thisweek", label: "Presenting this week" },
];

export function timelineLabel(t: string): string {
  return t === "none" ? "No pressure" : t === "2weeks" ? "2 weeks" : t === "thisweek" ? "This week" : "—";
}

export const BUDGET_MIN = 2000;
export const BUDGET_MAX = 200000;
export const BUDGET_STEP = 1000;

export const VASTU_CHOICE_OPTIONS = [
  { value: "vastu", label: "Vastu Shastra" },
  { value: "fengshui", label: "Feng Shui" },
  { value: "neither", label: "Neither" },
];

export const COMPASS_GRID = ["NW", "N", "NE", "W", "", "E", "SW", "S", "SE"];

export const VASTU_ROOM_CHIPS = ["Kitchen", "Master bedroom", "Prayer room", "Bathroom", "Children's room"];

export const VASTU_TOGGLES: { key: "vastuBasement" | "vastuBorewell" | "vastuTank"; label: string }[] = [
  { key: "vastuBasement", label: "Basement or underground space?" },
  { key: "vastuBorewell", label: "Borewell or overhead tank?" },
  { key: "vastuTank", label: "Well on property?" },
];

export const BAGUA_CHIPS = ["Health", "Wealth", "Career", "Relationships", "Fame", "Knowledge", "Family", "Creativity", "Helpful people"];

export const FS_SCHOOL_OPTIONS = [
  { value: "compass", label: "Compass school" },
  { value: "blackhat", label: "Black Hat school" },
  { value: "unsure", label: "Not sure" },
];

export const STYLE_CHIPS = [
  "Minimalist", "Warm earthy", "Maximalist", "Industrial", "Contemporary",
  "Traditional Indian", "Transitional", "Japandi", "Scandinavian", "Eclectic",
  "Rustic", "Coastal", "Mid-century modern",
];

export const COLOR_MOODS: { id: string; colors: string[] }[] = [
  { id: "Neutral / warm", colors: ["#E8D5C4", "#C4A882", "#8B7355", "#F4F0E8"] },
  { id: "Cool and calm", colors: ["#B8D4E3", "#8AACB8", "#5B7F8A", "#E8F0F4"] },
  { id: "Bold and contrasting", colors: ["#2D2D2D", "#D44040", "#F4D03F", "#FFFFFF"] },
  { id: "Monochromatic", colors: ["#D8D8D8", "#A0A0A0", "#686868", "#383838"] },
  { id: "All-white and airy", colors: ["#FFFFFF", "#F8F6F2", "#EDE8E0", "#E0DBD2"] },
];

export const LIGHTING_PREFS = [
  { value: "bright", label: "Bright & airy", desc: "Maximize natural light, white/light surfaces" },
  { value: "warm", label: "Warm & layered", desc: "Warm tones, multiple light sources, dimmers" },
  { value: "dramatic", label: "Dramatic", desc: "High contrast, accent lighting, moody" },
  { value: "functional", label: "Task-first", desc: "Prioritize function over ambiance" },
];

export const GEN_MESSAGES = [
  "Reading your floor plan...",
  "Analyzing space and light conditions...",
  "Processing client requirements...",
  "Generating spatial approaches...",
  "Building visual direction brief...",
  "Compiling your action sheet...",
];

export const STEP_DOTS = [
  { num: 1, label: "Space" },
  { num: 2, label: "Requirements" },
  { num: 3, label: "Vastu" },
  { num: 4, label: "Visual" },
  { num: 5, label: "Review" },
];
