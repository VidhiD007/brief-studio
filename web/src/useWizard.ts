import { useRef, useState } from "react";
import { initialState, MAX_PHOTOS, MAX_REF_IMAGES, type WizardState } from "./types";
import { generateOutput, refineOutput } from "./api";
import { validateStep } from "./derived";

function readFile(file: File): Promise<{ name: string; url: string }> {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = (e) => resolve({ name: file.name, url: e.target?.result as string });
    r.readAsDataURL(file);
  });
}

export function useWizard() {
  const [state, setState] = useState<WizardState>(initialState);
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

  const generateCalibration = () => {
    setState((s) => {
      const names = s.rooms.filter((r) => r.name.trim()).map((r) => r.name.trim());
      return {
        ...s,
        calibration: {
          roomCount: names.length > 0 ? `${names.length} rooms identified: ${names.join(", ")}` : "3 rooms detected from floor plan",
          lightDirection: s.northDirection
            ? `Natural light appears to enter primarily from the ${s.northDirection} side`
            : "Unable to determine light direction — north orientation was not specified",
          elements: "Open plan living-dining area, corridor connecting bedrooms, kitchen with single entry point, bathroom adjacent to bedroom 1, balcony or terrace visible",
          circulation: "Potential bottleneck at the corridor-to-kitchen junction — clearance appears narrow for two-way traffic",
          unclear: s.floorPlan
            ? "Some dimension markings are partially obscured. Wall thickness near bathroom is ambiguous — verify load-bearing status."
            : "No floor plan was uploaded — calibration is estimated from manual inputs only.",
        },
        calibrationEdits: {},
      };
    });
  };

  const handleNext = () => {
    // Steps 1.5 and 5 have nothing new to validate here (1.5 is a confirm-only
    // step, 5's own "Generate" click is gated by every prior step already
    // having passed). Defense in depth — the Continue button is also disabled
    // client-side so this mainly guards against stray Enter-key submits.
    if (state.step !== 1.5 && !validateStep(state).valid) return;
    if (state.step === 1) {
      generateCalibration();
      patch({ step: 1.5 });
      scrollTop();
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
      patch({ generating: false, showOutput: true });
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
