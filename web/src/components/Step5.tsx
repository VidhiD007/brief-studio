import type { Wizard } from "../useWizard";
import { reviewSections } from "../derived";
import { IconChecklist, IconStar } from "./Icons";

export function Step5({ wizard }: { wizard: Wizard }) {
  const { state, patch, goToStep } = wizard;
  const sections = reviewSections(state);

  return (
    <div className="fade-in" style={{ maxWidth: 820 }}>
      <div style={{ fontSize: 26, fontWeight: 340, letterSpacing: -0.5, marginBottom: 4 }}>Review &amp; generate</div>
      <div style={{ fontSize: 14, color: "var(--text-subtle)", marginBottom: 32 }}>Confirm your inputs and generate your design strategy document</div>
      <div className="responsive-row" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="field-label" style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <IconChecklist size={13} /> Your inputs
          </div>
          {sections.map((sect) => {
            const expanded = !!state.expandedSections[sect.key];
            return (
              <div key={sect.key} className="review-card">
                <div
                  className="review-card-head"
                  onClick={() => patch((s) => ({ expandedSections: { ...s.expandedSections, [sect.key]: !s.expandedSections[sect.key] } }))}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 540, color: "var(--text)" }}>{sect.label}</div>
                    <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {sect.summary}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0, marginLeft: 12 }}>
                    <div
                      className="text-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToStep(sect.stepNum);
                      }}
                    >
                      Edit
                    </div>
                    <div className={`review-arrow${expanded ? " open" : ""}`}>▾</div>
                  </div>
                </div>
                {expanded ? (
                  <div style={{ padding: "0 14px 12px", borderTop: "1px solid var(--border)" }}>
                    {sect.items.map((item) => (
                      <div key={item.k} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "6px 0", borderBottom: "1px solid var(--border-faint)" }}>
                        <div style={{ fontSize: 11, color: "var(--text-faint)", flexShrink: 0 }}>{item.k}</div>
                        <div style={{ fontSize: 11, color: "var(--text-dim)", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.v}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="step5-side-panel" style={{ width: 300, flexShrink: 0 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: 20 }}>
            <div className="field-label" style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <IconStar size={13} /> What you will receive
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
              <div style={{ marginBottom: 10 }}><span style={{ color: "var(--accent)" }}>✓</span> Space analysis — confirmed against your corrections</div>
              <div style={{ marginBottom: 10 }}><span style={{ color: "var(--accent)" }}>✓</span> Design parameters — structured summary of all requirements</div>
              <div style={{ marginBottom: 10 }}><span style={{ color: "var(--accent)" }}>✓</span> Three spatial approaches — text descriptions with reasoning, not floor plan drawings</div>
              <div style={{ marginBottom: 10 }}><span style={{ color: "var(--accent)" }}>✓</span> Visual direction brief — palette, materials, lighting recommendations</div>
              <div style={{ marginBottom: 10 }}><span style={{ color: "var(--accent)" }}>✓</span> Action sheet — prioritized checklist for your CAD session</div>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 4, paddingTop: 12 }}>
              <div style={{ fontSize: 11, color: "var(--text-faint)", lineHeight: 1.5, fontStyle: "italic" }}>
                Spatial approaches are strategy descriptions, not visual floor plans. The visual brief is a reference for building your mood board, not a finished collage.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
