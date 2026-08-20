import type { Wizard } from "../useWizard";
import {
  BAGUA_CHIPS, COMPASS_GRID, FS_SCHOOL_OPTIONS, VASTU_CHOICE_OPTIONS,
  VASTU_ROOM_CHIPS, VASTU_TOGGLES,
} from "../constants";
import { ChipGroup, FieldLabel, RadioGroup } from "./common";

export function Step3({ wizard }: { wizard: Wizard }) {
  const { state, patch, toggleChip } = wizard;

  return (
    <div className="fade-in" style={{ maxWidth: 720 }}>
      <div style={{ fontSize: 26, fontWeight: 340, letterSpacing: -0.5, marginBottom: 4 }}>Vastu &amp; Feng Shui</div>
      <div style={{ fontSize: 14, color: "#5a5a5a", marginBottom: 28 }}>Optional — select "Neither" to skip this step</div>

      <div style={{ marginBottom: 24 }}>
        <FieldLabel>This project will follow</FieldLabel>
        <RadioGroup options={VASTU_CHOICE_OPTIONS} value={state.vastuChoice} onSelect={(v) => patch({ vastuChoice: v })} />
      </div>

      {state.vastuChoice === "vastu" ? (
        <>
          <Disclaimer text="AI applies common Vastu principles based on your inputs. Not a replacement for a certified Vastu consultation. For clients with deep requirements, verify critical placements manually." />
          <div style={{ marginBottom: 22 }}>
            <FieldLabel>Main entrance direction</FieldLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,64px)", gap: 6 }}>
              {COMPASS_GRID.map((d, i) =>
                d === "" ? (
                  <div key={i} className="compass-cell blank">·</div>
                ) : (
                  <div
                    key={i}
                    className={`compass-cell${state.vastuEntrance === d ? " active" : ""}`}
                    onClick={() => patch({ vastuEntrance: d })}
                  >
                    {d}
                  </div>
                ),
              )}
            </div>
          </div>
          <div style={{ marginBottom: 22 }}>
            <FieldLabel>Rooms with specific Vastu requirements</FieldLabel>
            <ChipGroup options={VASTU_ROOM_CHIPS} selected={state.vastuRooms} onToggle={(v) => toggleChip("vastuRooms", v)} />
          </div>
          <div style={{ display: "flex", gap: 16, marginBottom: 22 }}>
            {VASTU_TOGGLES.map((t) => (
              <div key={t.key} style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: "#6a6a6a", marginBottom: 7 }}>{t.label}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <div className={`mini-chip${state[t.key] === "yes" ? " active" : ""}`} onClick={() => patch({ [t.key]: "yes" } as any)}>Yes</div>
                  <div className={`mini-chip${state[t.key] === "no" ? " active" : ""}`} onClick={() => patch({ [t.key]: "no" } as any)}>No</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 22 }}>
            <FieldLabel>Specific Vastu concerns</FieldLabel>
            <textarea
              value={state.vastuConcerns}
              onChange={(e) => patch({ vastuConcerns: e.target.value })}
              placeholder="Any specific Vastu concerns the client raised"
              rows={3}
              style={{ width: "100%", minHeight: 76 }}
            />
          </div>
        </>
      ) : null}

      {state.vastuChoice === "fengshui" ? (
        <>
          <Disclaimer text="AI applies common Feng Shui principles based on your inputs. Not a replacement for a certified Feng Shui consultation." />
          <div style={{ marginBottom: 22 }}>
            <FieldLabel>Bagua area of concern</FieldLabel>
            <ChipGroup options={BAGUA_CHIPS} selected={state.fsBagua} onToggle={(v) => toggleChip("fsBagua", v)} />
          </div>
          <div style={{ marginBottom: 22 }}>
            <FieldLabel>School preference</FieldLabel>
            <RadioGroup options={FS_SCHOOL_OPTIONS} value={state.fsSchool} onSelect={(v) => patch({ fsSchool: v })} />
          </div>
          <div style={{ marginBottom: 22 }}>
            <FieldLabel>Specific Feng Shui concerns</FieldLabel>
            <textarea
              value={state.fsConcerns}
              onChange={(e) => patch({ fsConcerns: e.target.value })}
              placeholder="Any specific Feng Shui concerns the client raised"
              rows={3}
              style={{ width: "100%", minHeight: 76 }}
            />
          </div>
        </>
      ) : null}

      {state.vastuChoice === "neither" ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#4a4a52" }}>
          <div style={{ fontSize: 15, marginBottom: 4 }}>No Vastu or Feng Shui considerations</div>
          <div style={{ fontSize: 13, color: "#3a3a42" }}>Click Continue to proceed to visual direction</div>
        </div>
      ) : null}
    </div>
  );
}

function Disclaimer({ text }: { text: string }) {
  return (
    <div style={{ padding: "12px 16px", background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.15)", borderRadius: 8, marginBottom: 24 }}>
      <div style={{ fontSize: 12, color: "#b8860b", lineHeight: 1.5 }}>{text}</div>
    </div>
  );
}
