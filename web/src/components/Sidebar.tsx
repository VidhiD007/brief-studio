import type { Wizard } from "../useWizard";
import { summaryItems } from "../derived";

export function Sidebar({ wizard }: { wizard: Wizard }) {
  const { state, patch } = wizard;
  if (!state.sidebarOpen) return null;
  const items = summaryItems(state);

  return (
    <div style={{ width: 300, minWidth: 300, borderLeft: "1px solid #2a2a32", overflowY: "auto", padding: 24, background: "#1a1a1f", flexShrink: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div className="field-label" style={{ marginBottom: 0 }}>Running summary</div>
        <div style={{ fontSize: 14, color: "#3a3a42", cursor: "pointer", lineHeight: 1 }} onClick={() => patch({ sidebarOpen: false })}>✕</div>
      </div>
      {items.length === 0 ? (
        <div style={{ fontSize: 13, color: "#2a2a32", textAlign: "center", padding: "36px 0" }}>Fill in the fields to see your summary here</div>
      ) : (
        items.map((item) => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "9px 0", borderBottom: "1px solid #25252a" }}>
            <div style={{ fontSize: 11, color: "#4a4a52", flexShrink: 0 }}>{item.label}</div>
            <div style={{ fontSize: 12, color: "#8a8a8a", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.value}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
