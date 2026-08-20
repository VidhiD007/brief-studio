import type { Wizard } from "../useWizard";
import { Button } from "../Button";

export function Output({ wizard }: { wizard: Wizard }) {
  const { state, patch, outputRef, backToEditor, startNewProject, handleRefine } = wizard;
  const o = state.output;
  if (!o) return null;

  const meta = `${state.spaceType || "Space"} · ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#1e1e24", fontFamily: "var(--font-sans)" }}>
      <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", borderBottom: "1px solid #2a2a32", flexShrink: 0 }}>
        <div className="top-bar-btn" style={{ border: "none", padding: 0, display: "flex", alignItems: "center", gap: 6, fontSize: 13 }} onClick={backToEditor}>
          ← Back to editor
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#f0ece4" }}>Design Strategy Document</div>
        <div style={{ display: "flex", gap: 10 }}>
          <div className="back-btn" style={{ padding: "6px 14px", fontSize: 12 }}>Download as PDF</div>
          <div className="back-btn" style={{ padding: "6px 14px", fontSize: 12 }} onClick={startNewProject}>New project</div>
        </div>
      </div>

      <div ref={outputRef} style={{ flex: 1, overflowY: "auto", padding: "36px 44px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid #2a2a32" }}>
            <div style={{ fontSize: 28, fontWeight: 340, letterSpacing: -0.5, marginBottom: 6 }}>{state.projectName || "Untitled project"}</div>
            <div style={{ fontSize: 13, color: "#5a5a5a" }}>{meta}</div>
          </div>

          {/* Section 1 */}
          <div style={{ marginBottom: 36 }}>
            <div className="field-label" style={{ marginBottom: 14 }}>1 — Space analysis</div>
            <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
              {state.floorPlan ? (
                <div style={{ width: 200, flexShrink: 0, borderRadius: 8, overflow: "hidden", border: "1px solid #3a3a42" }}>
                  <img src={state.floorPlan.url} style={{ width: "100%", height: 160, objectFit: "contain", display: "block", background: "#28282e" }} />
                </div>
              ) : null}
              <div style={{ flex: 1 }}>
                {o.analysis.map((item, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 12, color: "#5a5a5a", marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: "#d0ccc4", lineHeight: 1.5 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.12)", borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ fontSize: 11, color: "#b8860b", fontWeight: 540, marginBottom: 4 }}>Confidence flags</div>
              {o.flags.map((flag, i) => (
                <div key={i} style={{ fontSize: 12, color: "#b8860b", lineHeight: 1.5, opacity: 0.8 }}>· {flag.text}</div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: 36 }}>
            <div className="field-label" style={{ marginBottom: 14 }}>2 — Design parameters</div>
            <div style={{ background: "#28282e", borderRadius: 10, padding: 18 }}>
              {o.params.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: "1px solid #25252a" }}>
                  <div style={{ fontSize: 12, color: "#5a5a5a", width: 120, flexShrink: 0 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: "#d0ccc4", lineHeight: 1.4 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: 36 }}>
            <div className="field-label" style={{ marginBottom: 14 }}>3 — Spatial approaches</div>
            {o.approaches.map((appr, i) => (
              <div key={i} style={{ background: "#28282e", border: "1px solid #3a3a42", borderRadius: 10, padding: 20, marginBottom: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 540, color: "#f0ece4", marginBottom: 4 }}>{appr.name}</div>
                <div style={{ fontSize: 13, color: "#8a8a8a", marginBottom: 16, lineHeight: 1.5 }}>{appr.summary}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#5a5a5a", marginBottom: 6, fontWeight: 540 }}>Zone placements</div>
                    {appr.zones.map((z, j) => <div key={j} style={{ fontSize: 12, color: "#a0a0a0", lineHeight: 1.6 }}>· {z.text}</div>)}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#5a5a5a", marginBottom: 6, fontWeight: 540 }}>Pros</div>
                    {appr.pros.map((p, j) => <div key={j} style={{ fontSize: 12, color: "#a0a0a0", lineHeight: 1.6 }}>· {p.text}</div>)}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#5a5a5a", marginBottom: 4, fontWeight: 540 }}>Traffic flow</div>
                    <div style={{ fontSize: 12, color: "#a0a0a0", lineHeight: 1.5 }}>{appr.traffic}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#5a5a5a", marginBottom: 4, fontWeight: 540 }}>Constraints</div>
                    {appr.constraints.map((c, j) => <div key={j} style={{ fontSize: 12, color: "#a0a0a0", lineHeight: 1.6 }}>· {c.text}</div>)}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#5a5a5a", paddingTop: 8, borderTop: "1px solid #25252a" }}>{appr.budgetLine}</div>
              </div>
            ))}
            <div style={{ background: "#28282e", border: "1px solid #3a3a42", borderRadius: 10, padding: 16, marginTop: 8 }}>
              <div style={{ fontSize: 12, color: "#6a6a6a", marginBottom: 8 }}>Want to modify or combine any of these approaches?</div>
              <textarea
                value={state.refinement}
                onChange={(e) => patch({ refinement: e.target.value })}
                placeholder="e.g. I like Approach 2 but the kitchen needs to stay on the north wall"
                rows={2}
                style={{
                  padding: "10px 12px", background: "#1e1e24", border: "1px solid #3a3a42", borderRadius: 8,
                  color: "#f0ece4", fontSize: 13, fontFamily: "var(--font-sans)", outline: "none", width: "100%",
                  minHeight: 50, marginBottom: 8,
                }}
              />
              <Button size="small" onClick={handleRefine} disabled={!state.refinement.trim()}>Regenerate with this direction →</Button>
            </div>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: 36 }}>
            <div className="field-label" style={{ marginBottom: 14 }}>4 — Visual direction brief</div>
            <div style={{ fontSize: 12, color: "#5a5a5a", marginBottom: 14 }}>Use this as your reference when building the client's mood board</div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#6a6a6a", fontWeight: 540, marginBottom: 10 }}>Colour palette</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {o.palette.map((sw, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, width: "calc(50% - 6px)" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: sw.hex, border: "1px solid #3a3a42", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 12, color: "#d0ccc4" }}>{sw.name}</div>
                      <div style={{ fontSize: 10, color: "#5a5a5a" }}>{sw.hex} · {sw.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#6a6a6a", fontWeight: 540, marginBottom: 10 }}>Material vocabulary</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {o.materials.map((mat, i) => (
                  <div key={i} style={{ background: "#28282e", borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 12, color: "#d0ccc4", fontWeight: 540, marginBottom: 3 }}>{mat.name}</div>
                    <div style={{ fontSize: 11, color: "#6a6a6a", lineHeight: 1.4 }}>{mat.rationale}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#6a6a6a", fontWeight: 540, marginBottom: 6 }}>Lighting direction</div>
              <div style={{ fontSize: 13, color: "#a0a0a0", lineHeight: 1.5 }}>{o.lighting}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6a6a6a", fontWeight: 540, marginBottom: 6 }}>Mood summary</div>
              <div style={{ fontSize: 13, color: "#a0a0a0", lineHeight: 1.6, fontStyle: "italic" }}>{o.moodSummary}</div>
            </div>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: 60 }}>
            <div className="field-label" style={{ marginBottom: 14 }}>5 — Action sheet</div>
            {o.actions.map((act, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid #25252a" }}>
                <div style={{ fontSize: 12, color: "#b8860b", fontWeight: 600, width: 20, flexShrink: 0, textAlign: "right" }}>{act.num}</div>
                <div style={{ fontSize: 13, color: "#d0ccc4", lineHeight: 1.5 }}>{act.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
