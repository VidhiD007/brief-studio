import type { Wizard } from "../useWizard";
import { GEN_MESSAGES } from "../constants";
import { IconCheck, IconChecklist, IconFloorPlan, IconGrid, IconPalette, IconPeople, IconSun } from "./Icons";

const GEN_ICONS = [IconFloorPlan, IconSun, IconPeople, IconGrid, IconPalette, IconChecklist];

export function Generating({ wizard }: { wizard: Wizard }) {
  const { state } = wizard;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg)", fontFamily: "var(--font-sans)", gap: 28, padding: "0 20px" }}>
      <div style={{ fontSize: 24, fontWeight: 340, color: "var(--text)", letterSpacing: -0.3, textAlign: "center" }}>Generating your design strategy</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 360 }}>
        {GEN_MESSAGES.map((text, i) => {
          const Icon = GEN_ICONS[i];
          const done = i < state.genStep;
          const active = i === state.genStep;
          const color = done ? "var(--accent)" : active ? "var(--text)" : "var(--text-faint)";
          return (
            <div
              key={text}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "6px 0",
                transition: "color 300ms",
                animation: active ? "pulse 1.5s ease infinite" : "none",
              }}
            >
              <div style={{ width: 18, height: 18, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color }}>
                {done ? <IconCheck size={15} /> : <Icon size={16} />}
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color }}>{text}</span>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 4 }}>Estimated time: 30–60 seconds</div>
    </div>
  );
}
