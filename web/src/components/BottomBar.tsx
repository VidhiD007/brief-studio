import type { Wizard } from "../useWizard";
import { Button } from "../Button";

export function BottomBar({ wizard }: { wizard: Wizard }) {
  const { state, handleBack, handleNext } = wizard;
  const step = state.step;
  const nextLabel = step === 1.5 ? "Confirm & continue →" : step === 5 ? "Generate my design strategy →" : "Continue →";
  const stepDisplay = step === 1.5 ? "1" : String(Math.floor(step));

  return (
    <div style={{ height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", borderTop: "1px solid #2a2a32", flexShrink: 0, background: "#1e1e24" }}>
      <div style={{ minWidth: 120 }}>
        {step > 1 ? <div className="back-btn" onClick={handleBack}>← Back</div> : null}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#3a3a42" }}>
        Step {stepDisplay} of 5
      </div>
      <div style={{ minWidth: 120, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleNext}>{nextLabel}</Button>
      </div>
    </div>
  );
}
