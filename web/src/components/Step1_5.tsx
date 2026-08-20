import type { Wizard } from "../useWizard";

// The editable text-summary fields — deliberately excludes isFloorPlan/
// floorPlanIssue, which are just the upstream validation result from Step 1,
// not part of the space reading shown here.
type CalibrationTextField = "roomCount" | "lightDirection" | "elements" | "circulation" | "unclear";

const FIELDS: { key: CalibrationTextField; label: string }[] = [
  { key: "roomCount", label: "Rooms identified" },
  { key: "lightDirection", label: "Natural light" },
  { key: "elements", label: "Spatial elements" },
  { key: "circulation", label: "Circulation notes" },
  { key: "unclear", label: "Flagged for review" },
];

export function Step1_5({ wizard }: { wizard: Wizard }) {
  const { state, patch } = wizard;
  if (!state.calibration) return null;

  return (
    <div className="fade-in" style={{ maxWidth: 720 }}>
      <div style={{ fontSize: 26, fontWeight: 340, letterSpacing: -0.5, marginBottom: 4 }}>Floor plan calibration</div>
      <div style={{ fontSize: 14, color: "#5a5a5a", marginBottom: 28 }}>
        Before we continue — let's confirm we understood your space correctly
      </div>
      <div style={{ background: "#28282e", border: "1px solid #3a3a42", borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <div className="field-label" style={{ marginBottom: 18 }}>Space reading summary</div>
        {FIELDS.map((f) => (
          <div key={f.key} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#5a5a5a", marginBottom: 5 }}>{f.label}</div>
            <textarea
              value={state.calibrationEdits[f.key] ?? state.calibration![f.key]}
              onChange={(e) =>
                patch((s) => ({ calibrationEdits: { ...s.calibrationEdits, [f.key]: e.target.value } }))
              }
              rows={2}
              style={{
                width: "100%", minHeight: 40, padding: "9px 12px", background: "#1e1e24",
                border: "1px solid #3a3a42", borderRadius: 8, color: "#f0ece4", fontSize: 13,
                fontFamily: "var(--font-sans)", outline: "none", resize: "vertical",
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: "#4a4a52", fontStyle: "italic" }}>
        Edit any field above if something looks incorrect. Your corrections inform all generated output.
      </div>
    </div>
  );
}
