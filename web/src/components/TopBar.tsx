import type { Wizard } from "../useWizard";
import type { Theme } from "../useTheme";
import { STEP_DOTS } from "../constants";
import { ThemeToggleButton } from "./common";

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="10" height="13" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
      <rect x="16" y="4" width="10" height="8" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="none" />
      <rect x="16" y="16" width="10" height="8" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="none" />
      <line x1="5" y1="8" x2="9" y2="8" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5" y1="11" x2="9" y2="11" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5" y1="14" x2="8" y2="14" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function TopBar({ wizard, theme, toggleTheme }: { wizard: Wizard; theme: Theme; toggleTheme: () => void }) {
  const { state, patch } = wizard;
  const step = state.step;

  return (
    <div className="top-bar" style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", borderBottom: "1px solid var(--border-soft)", flexShrink: 0 }}>
      <div className="top-bar-brand" style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 160 }}>
        <Logo />
        <span className="top-bar-brand-text" style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3, color: "var(--text)" }}>Brief Studio</span>
      </div>
      <div className="step-dots-row" style={{ display: "flex", gap: 24, alignItems: "center" }}>
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
      <div className="top-bar-actions" style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 120, justifyContent: "flex-end" }}>
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        <div className="top-bar-btn" onClick={() => patch({ sidebarOpen: !state.sidebarOpen })}>Summary</div>
        <div className="top-bar-btn top-bar-btn-save">Save draft</div>
      </div>
    </div>
  );
}
