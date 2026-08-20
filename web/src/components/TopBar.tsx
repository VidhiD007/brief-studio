import type { Wizard } from "../useWizard";
import { STEP_DOTS } from "../constants";

export function TopBar({ wizard }: { wizard: Wizard }) {
  const { state, patch } = wizard;
  const step = state.step;

  return (
    <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", borderBottom: "1px solid #2a2a32", flexShrink: 0 }}>
      <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3, color: "#f0ece4", minWidth: 120 }}>Brief Studio</div>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {STEP_DOTS.map((dot) => {
          const active = dot.num === 5 ? step === 5 : dot.num === 1 ? step <= 1.5 : step === dot.num;
          const completed = dot.num === 1 ? step > 1.5 : step > dot.num;
          return (
            <div key={dot.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div className={`step-dot${active ? " active" : completed ? " completed" : ""}`}>{dot.num}</div>
              <div className={`step-dot-label${active ? " active" : ""}`}>{dot.label}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 120, justifyContent: "flex-end" }}>
        <div className="top-bar-btn" onClick={() => patch({ sidebarOpen: !state.sidebarOpen })}>Summary</div>
        <div className="top-bar-btn">Save draft</div>
      </div>
    </div>
  );
}
