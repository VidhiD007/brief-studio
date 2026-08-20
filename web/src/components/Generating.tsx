import type { Wizard } from "../useWizard";
import { GEN_MESSAGES } from "../constants";

export function Generating({ wizard }: { wizard: Wizard }) {
  const { state } = wizard;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg)", fontFamily: "var(--font-sans)", gap: 28, padding: "0 20px" }}>
      <div style={{ fontSize: 24, fontWeight: 340, color: "var(--text)", letterSpacing: -0.3, textAlign: "center" }}>Generating your design strategy</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 340 }}>
        {GEN_MESSAGES.map((text, i) => (
          <div
            key={text}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 12, padding: "6px 0",
              color: i < state.genStep ? "var(--accent)" : i === state.genStep ? "var(--text)" : "var(--text-faint)",
              transition: "color 300ms",
              animation: i === state.genStep ? "pulse 1.5s ease infinite" : "none",
            }}
          >
            {text}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 4 }}>Estimated time: 30–60 seconds</div>
    </div>
  );
}
