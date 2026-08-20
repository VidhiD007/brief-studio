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

  const nextLabel = step === 1.5 ? "Confirm & continue →" : step === 5 ? "Generate my design strategy →" : "Continue →";
  const stepDisplay = step === 1.5 ? "1" : String(Math.floor(step));
  const validation = validateStep(state);
  const gated = step !== 1.5 && !validation.valid;

  const onNextClick = () => {
    if (gated) {
      setError(validation.message);
      return;
    }
    setError("");
    handleNext();
  };

  return (
    <div style={{ height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", borderTop: "1px solid #2a2a32", flexShrink: 0, background: "#1e1e24" }}>
      <div style={{ minWidth: 120 }}>
        {step > 1 ? <div className="back-btn" onClick={handleBack}>← Back</div> : null}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#3a3a42" }}>
        Step {stepDisplay} of 5
      </div>
      <div style={{ minWidth: 120, display: "flex", justifyContent: "flex-end", position: "relative" }}>
        {error ? (
          <div
            style={{
              position: "absolute", bottom: "100%", right: 0, marginBottom: 10,
              background: "#28282e", border: "1px solid #b8860b", color: "#b8860b",
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
