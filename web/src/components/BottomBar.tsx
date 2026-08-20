import { useEffect, useState } from "react";
import type { Wizard } from "../useWizard";
import { Button } from "../Button";
import { validateStep } from "../derived";

export function BottomBar({ wizard }: { wizard: Wizard }) {
  const { state, handleBack, handleNext } = wizard;
  const step = state.step;
  const [error, setError] = useState("");

  // Clear any shown error as soon as the step changes (either because the
  // designer fixed it and moved on, or navigated back) so a stale message
  // from a different step never lingers.
  useEffect(() => setError(""), [step]);

  const nextLabel = state.checkingFloorPlan
    ? "Checking floor plan..."
    : step === 1.5
      ? "Confirm & continue →"
      : step === 5
        ? "Generate my design strategy →"
        : "Continue →";
  const stepDisplay = step === 1.5 ? "1" : String(Math.floor(step));
  const validation = validateStep(state);
  const gated = state.checkingFloorPlan || (step !== 1.5 && !validation.valid);

  const onNextClick = () => {
    if (gated) {
      if (!state.checkingFloorPlan) setError(validation.message);
      return;
    }
    setError("");
    handleNext();
  };

  return (
    <div className="bottom-bar" style={{ height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", borderTop: "1px solid var(--border-soft)", flexShrink: 0, background: "var(--bg)" }}>
      <div className="bottom-bar-back" style={{ minWidth: 120 }}>
        {step > 1 ? <div className="back-btn" onClick={handleBack}>← Back</div> : null}
      </div>
      <div className="bottom-bar-step-label" style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-faint)" }}>
        Step {stepDisplay} of 5
      </div>
      <div className="bottom-bar-actions" style={{ minWidth: 120, display: "flex", justifyContent: "flex-end", position: "relative" }}>
        {error ? (
          <div
            className="bottom-bar-error"
            style={{
              position: "absolute", bottom: "100%", right: 0, marginBottom: 10,
              background: "var(--surface)", border: "1px solid var(--accent)", color: "var(--accent)",
              fontSize: 12, lineHeight: 1.4, padding: "9px 12px", borderRadius: 8,
              maxWidth: 320, textAlign: "right", whiteSpace: "normal",
            }}
          >
            {error}
          </div>
        ) : null}
        <Button onClick={onNextClick} style={gated ? { opacity: 0.5 } : undefined}>{nextLabel}</Button>
      </div>
    </div>
  );
}
