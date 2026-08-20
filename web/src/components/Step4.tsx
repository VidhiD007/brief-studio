import type { Wizard } from "../useWizard";
import { COLOR_MOODS, LIGHTING_PREFS, STYLE_CHIPS } from "../constants";
import { FieldLabel, ImageGridUpload, RequiredMark } from "./common";
import { MAX_REF_IMAGES } from "../types";

export function Step4({ wizard }: { wizard: Wizard }) {
  const { state, patch, toggleStyle, handleRefImagesUpload } = wizard;

  return (
    <div className="fade-in" style={{ maxWidth: 720 }}>
      <div style={{ fontSize: 26, fontWeight: 340, letterSpacing: -0.5, marginBottom: 4 }}>Visual direction</div>
      <div style={{ fontSize: 14, color: "#5a5a5a", marginBottom: 36 }}>Define the client's visual taste and style preferences</div>

      <div style={{ marginBottom: 22 }}>
        <FieldLabel required>Style direction (pick up to 3)</FieldLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {STYLE_CHIPS.map((chip) => (
            <div
              key={chip}
              className={`chip${state.styleDirections.includes(chip) ? " active" : ""}`}
              onClick={() => toggleStyle(chip)}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>

      <div className="hairline" />

      <div style={{ marginBottom: 22 }}>
        <div className="field-label" style={{ marginBottom: 12 }}>Colour mood<RequiredMark /></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
          {COLOR_MOODS.map((mood) => (
            <div
              key={mood.id}
              className={`mood-card${state.colorMood === mood.id ? " active" : ""}`}
              onClick={() => patch({ colorMood: mood.id })}
            >
              <div style={{ display: "flex", gap: 4, marginBottom: 8, justifyContent: "center" }}>
                {mood.colors.map((c) => (
                  <div key={c} style={{ width: 20, height: 20, borderRadius: "50%", background: c, border: "1px solid #3a3a42" }} />
                ))}
              </div>
              <div style={{ fontSize: 11, color: "#8a8a8a", textAlign: "center", lineHeight: 1.3 }}>{mood.id}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hairline" />

      <div style={{ marginBottom: 22 }}>
        <div className="field-label" style={{ marginBottom: 12 }}>Lighting preference<RequiredMark /></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {LIGHTING_PREFS.map((lp) => (
            <div
              key={lp.value}
              className={`radio-opt${state.lightingPref === lp.value ? " active" : ""}`}
              style={{ flex: "unset" }}
              onClick={() => patch({ lightingPref: lp.value })}
            >
              <div style={{ fontSize: 13, color: "#f0ece4", marginBottom: 2 }}>{lp.label}</div>
              <div style={{ fontSize: 11, color: "#5a5a5a", lineHeight: 1.3 }}>{lp.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hairline" />

      <div style={{ marginBottom: 22 }}>
        <FieldLabel>Material or style deal-breakers</FieldLabel>
        <textarea
          value={state.dealBreakers}
          onChange={(e) => patch({ dealBreakers: e.target.value })}
          placeholder="e.g. No marble. No wallpaper. Hates brass fixtures. Allergic to wool."
          rows={2}
          style={{ width: "100%", minHeight: 64 }}
        />
        <div className="helper-note">Materials, textures, or styles the client explicitly does not want</div>
      </div>

      <div className="hairline" />

      <div style={{ marginBottom: 22 }}>
        <div className="section-title">Reference images</div>
        <div className="section-sub">Upload inspiration — screenshots from Pinterest, Instagram, magazines (up to {MAX_REF_IMAGES})</div>
        <ImageGridUpload
          images={state.referenceImages}
          onUpload={handleRefImagesUpload}
          onRemove={(i) => patch((s) => ({ referenceImages: s.referenceImages.filter((_, j) => j !== i) }))}
          max={MAX_REF_IMAGES}
          size={100}
        />
      </div>

      <div style={{ marginBottom: 22 }}>
        <FieldLabel>Designer taste notes</FieldLabel>
        <textarea
          value={state.tasteNotes}
          onChange={(e) => patch({ tasteNotes: e.target.value })}
          placeholder="e.g. Client loves texture but hates pattern. Wants it to feel expensive but understated."
          rows={3}
          style={{ width: "100%", minHeight: 76 }}
        />
      </div>
    </div>
  );
}
