import { useRef, useState } from "react";
import { initialState, MAX_PHOTOS, MAX_REF_IMAGES, type BriefOutput, type WizardState } from "./types";
import { calibrateSpace, generateOutput, refineOutput } from "./api";
import { validateStep } from "./derived";

// Shown only if /api/generate is completely unreachable (the server itself
// already has its own mock fallback for a missing/failing API key — this is
// the last-resort path for network failures that never reach the server at
// all, so the designer sees something instead of a blank screen).
function offlineFallbackOutput(): BriefOutput {
  return {
    analysis: [{ label: "Note", value: "Could not reach the server — showing placeholder content." }],
    flags: [{ text: "Check your connection and try generating again." }],
    params: [{ label: "Status", value: "Offline" }],
    approaches: [
      {
        name: "Sample approach",
        summary: "Generation didn't complete — go back and click Generate again once you're back online.",
        zones: [{ text: "N/A" }],
        traffic: "N/A",
        pros: [{ text: "N/A" }],
        constraints: [{ text: "N/A" }],
        budgetLine: "N/A",
      },
    ],
    palette: [{ name: "Placeholder", hex: "#b8860b", desc: "Accent" }],
    materials: [{ name: "Placeholder", rationale: "N/A" }],
    lighting: "N/A",
    moodSummary: "N/A",
    actions: [{ num: 1, text: "Try generating again once you're back online." }],
  };
}

function readFile(file: File): Promise<{ name: string; url: string }> {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = (e) => resolve({ name: file.name, url: e.target?.result as string });
    r.readAsDataURL(file);
  });
}

export function useWizard() {
  // On mobile the sidebar becomes a full-screen overlay (see theme.css), so
  // defaulting it open would cover the form before the designer has typed
  // anything. Desktop keeps the previous default of starting open.
  const [state, setState] = useState<WizardState>(() => ({
    ...initialState,
    sidebarOpen: typeof window === "undefined" || window.innerWidth > 768,
  }));
  const contentRef = useRef<HTMLDivElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const genTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const patch = (p: Partial<WizardState> | ((s: WizardState) => Partial<WizardState>)) =>
    setState((s) => ({ ...s, ...(typeof p === "function" ? p(s) : p) }));

  const scrollTop = () => {
    setTimeout(() => {
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }, 10);
  };

  // Real Claude vision analysis of the uploaded floor plan (and up to 3 space
  // photos) plus whatever manual fields were entered. Deliberately does not
  // fall back to invented text on failure — see calibrationError handling.
  const runCalibration = async () => {
    patch({ calibrating: true, calibrationError: "", calibration: null, calibrationEdits: {} });
    try {
      const calibration = await calibrateSpace(state);
      patch({ calibrating: false, calibration });
    } catch (err) {
      console.error("Calibration failed:", err);
      patch({ calibrating: false, calibrationError: "Couldn't analyze your space right now. Check your connection and try again." });
    }
  };

  const handleNext = () => {
    // Steps 1.5 and 5 have nothing new to validate here (1.5 is a confirm-only
    // step, 5's own "Generate" click is gated by every prior step already
    // having passed). Defense in depth — the Continue button is also disabled
    // client-side so this mainly guards against stray Enter-key submits.
    if (state.step !== 1.5 && !validateStep(state).valid) return;
    if (state.step === 1) {
      patch({ step: 1.5 });
      scrollTop();
      runCalibration();
    } else if (state.step === 1.5) {
      patch({ step: 2 });
      scrollTop();
    } else if (state.step === 5) {
      handleGenerate();
    } else if (state.step < 5) {
      patch({ step: state.step + 1 });
      scrollTop();
    }
  };

  const handleBack = () => {
    patch((s) => {
      if (s.step === 1.5) return { step: 1 };
      if (s.step === 2) return { step: 1.5 };
      if (s.step > 2) return { step: s.step - 1 };
      return {};
    });
    scrollTop();
  };

  const goToStep = (step: number) => {
    patch({ step });
    scrollTop();
  };

  const toggleChip = (field: "specificNeeds" | "mustHaves" | "vastuRooms" | "fsBagua", val: string) => {
    patch((s) => {
      const arr = s[field] as string[];
      return { [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] } as Partial<WizardState>;
    });
  };

  const toggleStyle = (val: string) => {
    patch((s) => {
      const a = s.styleDirections;
      if (a.includes(val)) return { styleDirections: a.filter((v) => v !== val) };
      if (a.length >= 3) return {};
      return { styleDirections: [...a, val] };
    });
  };

  const addCustomMustHave = () => {
    patch((s) => {
      const v = s.customMustHave.trim();
      if (!v || s.mustHaves.includes(v)) return {};
      return { mustHaves: [...s.mustHaves, v], customMustHave: "" };
    });
  };

  const handleFPUpload = async (file: File | undefined) => {
    if (!file) return;
    const d = await readFile(file);
    patch({ floorPlan: d });
  };

  const handlePhotosUpload = async (files: FileList | File[] | undefined) => {
    if (!files) return;
    const remaining = MAX_PHOTOS - state.spacePhotos.length;
    const toAdd = Array.from(files).slice(0, remaining);
    if (!toAdd.length) return;
    const results = await Promise.all(toAdd.map(readFile));
    patch((s) => ({ spacePhotos: [...s.spacePhotos, ...results] }));
  };

  const handleRefImagesUpload = async (files: FileList | File[] | undefined) => {
    if (!files) return;
    const remaining = MAX_REF_IMAGES - state.referenceImages.length;
    const toAdd = Array.from(files).slice(0, remaining);
    if (!toAdd.length) return;
    const results = await Promise.all(toAdd.map(readFile));
    patch((s) => ({ referenceImages: [...s.referenceImages, ...results] }));
  };

  const handleGenerate = async () => {
    patch({ generating: true, genStep: 0 });
    genTimer.current = setInterval(() => {
      patch((s) => ({ genStep: Math.min(s.genStep + 1, 5) }));
    }, 3000);
    try {
      const output = await generateOutput(state);
      if (genTimer.current) clearInterval(genTimer.current);
      patch({ generating: false, showOutput: true, output });
    } catch (err) {
      console.error("Generation failed:", err);
      if (genTimer.current) clearInterval(genTimer.current);
      patch({ generating: false, showOutput: true, output: offlineFallbackOutput() });
    }
  };

  const handleRefine = async () => {
    if (!state.refinement.trim() || !state.output) return;
    const prevOutput = state.output;
    const refinement = state.refinement;
    patch({ generating: true, genStep: 3 });
    try {
      const output = await refineOutput(state, prevOutput, refinement);
      patch({ generating: false, showOutput: true, output, refinement: "" });
    } catch (err) {
      console.error("Refinement failed:", err);
      patch({ generating: false, showOutput: true, refinement: "" });
    }
  };

  const backToEditor = () => {
    patch({ showOutput: false, step: 5 });
    scrollTop();
  };

  const startNewProject = () => {
    if (window.confirm("Start a new project? Current data will be lost.")) {
      window.location.reload();
    }
  };

  return {
    state,
    patch,
    contentRef,
    outputRef,
    handleNext,
    handleBack,
    goToStep,
    retryCalibration: runCalibration,
    toggleChip,
    toggleStyle,
    addCustomMustHave,
    handleFPUpload,
    handlePhotosUpload,
    handleRefImagesUpload,
    handleGenerate,
    handleRefine,
    backToEditor,
    startNewProject,
  };
}

export type Wizard = ReturnType<typeof useWizard>;
