import type { Wizard } from "../useWizard";
import {
  BUDGET_MAX, BUDGET_MIN, BUDGET_STEP, MAINTENANCE_OPTIONS, OCCUPANT_OPTIONS,
  TIMELINE_OPTIONS, capacityLabelFor, capacityPlaceholderFor, isResidentialType,
  mustHaveChipsFor, needsChipsFor,
} from "../constants";
import { ChipGroup, FieldLabel, RadioGroup } from "./common";

export function Step2({ wizard }: { wizard: Wizard }) {
  const { state, patch, toggleChip, addCustomMustHave } = wizard;
  const isRes = isResidentialType(state.spaceType);
  const budgetDisplay = `$${(state.budget / 1000).toFixed(0)}K`;
  let budgetNote = "";
  if (state.renovationScope === "cosmetic") budgetNote = "Cosmetic scope — AI will suggest furniture and zone arrangements only.";
  else if (state.renovationScope === "light") budgetNote = "Light structural — non-load-bearing wall modifications may be suggested.";
  else if (state.renovationScope === "full") budgetNote = "Full renovation — all structural modifications available.";

  return (
    <div className="fade-in" style={{ maxWidth: 720 }}>
      <div style={{ fontSize: 26, fontWeight: 340, letterSpacing: -0.5, marginBottom: 4 }}>Client requirements</div>
      <div style={{ fontSize: 14, color: "#5a5a5a", marginBottom: 36 }}>Who will use this space and what do they need</div>

      <div style={{ marginBottom: 22 }}>
        <FieldLabel required>Who is this space for</FieldLabel>
        <ChipGroup options={OCCUPANT_OPTIONS} selected={state.occupantType ? [state.occupantType] : []} onToggle={(v) => patch({ occupantType: v })} />
      </div>

      {isRes ? (
        <div style={{ marginBottom: 22 }}>
          <FieldLabel required>Number of people</FieldLabel>
          <input type="number" value={state.numPeople} onChange={(e) => patch({ numPeople: e.target.value })} placeholder="e.g. 4" style={{ width: 110 }} />
        </div>
      ) : (
        <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
          <div style={{ flex: 1 }}>
            <FieldLabel required>Staff count</FieldLabel>
            <input type="number" value={state.staffCount} onChange={(e) => patch({ staffCount: e.target.value })} placeholder="e.g. 12" style={{ width: "100%" }} />
          </div>
          <div style={{ flex: 1 }}>
            <FieldLabel required>{capacityLabelFor(state.spaceType)}</FieldLabel>
            <input
              type="number"
              value={state.seatCapacity}
              onChange={(e) => patch({ seatCapacity: e.target.value })}
              placeholder={capacityPlaceholderFor(state.spaceType)}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}

      <div style={{ marginBottom: 22 }}>
        <FieldLabel>Specific needs</FieldLabel>
        <ChipGroup options={needsChipsFor(state.spaceType)} selected={state.specificNeeds} onToggle={(v) => toggleChip("specificNeeds", v)} />
      </div>

      <div className="hairline" />

      <div style={{ marginBottom: 22 }}>
        <FieldLabel>What stays</FieldLabel>
        <textarea
          value={state.whatStays}
          onChange={(e) => patch({ whatStays: e.target.value })}
          placeholder="e.g. White L-shaped sofa, approx 3m wide. Dining table for 8. Built-in wardrobe in bedroom 1."
          rows={3}
          style={{ width: "100%", minHeight: 76 }}
        />
        <div className="helper-note">The AI will factor these into every spatial approach it suggests</div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <FieldLabel>What must go</FieldLabel>
        <textarea
          value={state.whatGoes}
          onChange={(e) => patch({ whatGoes: e.target.value })}
          placeholder="e.g. The dark wooden panelling. Old carpet in bedrooms. Fluorescent tube lights."
          rows={3}
          style={{ width: "100%", minHeight: 76 }}
        />
        <div className="helper-note">Items or features the client specifically wants removed or replaced</div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div className="field-label" style={{ marginBottom: 0 }}>Budget</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 340, color: "#f0ece4" }}>{budgetDisplay}</span>
            <div style={{ padding: "4px 9px", background: "#28282e", border: "1px solid #3a3a42", borderRadius: 6, fontSize: 11, color: "#6a6a6a", userSelect: "none" }}>USD</div>
          </div>
        </div>
        <input
          type="range"
          value={state.budget}
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          onChange={(e) => patch({ budget: Number(e.target.value) })}
          style={{ width: "100%", cursor: "pointer" }}
        />
        {budgetNote ? (
          <div style={{ fontSize: 11, color: "#b8860b", marginTop: 6, padding: "7px 11px", background: "rgba(184,134,11,0.06)", borderRadius: 6, border: "1px solid rgba(184,134,11,0.12)" }}>
            {budgetNote}
          </div>
        ) : null}
      </div>

      <div className="hairline" />

      <div style={{ marginBottom: 22 }}>
        <FieldLabel required>Pain points</FieldLabel>
        <div style={{ fontSize: 12, color: "#5a5a5a", marginBottom: 7 }}>What is not working? What did the client say bothers them?</div>
        <textarea
          value={state.painPoints}
          onChange={(e) => patch({ painPoints: e.target.value })}
          placeholder="Paste raw meeting notes if needed — no character limit"
          rows={6}
          style={{ width: "100%", minHeight: 130, padding: "12px 14px" }}
        />
      </div>

      <div style={{ marginBottom: 22 }}>
        <FieldLabel>Must-haves</FieldLabel>
        <div style={{ marginBottom: 10 }}>
          <ChipGroup options={mustHaveChipsFor(state.spaceType)} selected={state.mustHaves} onToggle={(v) => toggleChip("mustHaves", v)} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={state.customMustHave}
            onChange={(e) => patch({ customMustHave: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomMustHave();
              }
            }}
            placeholder="Add your own"
            style={{ flex: 1, fontSize: 13, padding: "9px 12px" }}
          />
          <div
            style={{ padding: "9px 14px", background: "#28282e", border: "1px solid #3a3a42", borderRadius: 8, cursor: "pointer", fontSize: 13, color: "#6a6a6a", userSelect: "none" }}
            onClick={addCustomMustHave}
          >
            Add
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        <div style={{ flex: 1 }}>
          <FieldLabel>Maintenance level</FieldLabel>
          <RadioGroup options={MAINTENANCE_OPTIONS} value={state.maintenanceLevel} onSelect={(v) => patch({ maintenanceLevel: v })} direction="column" />
        </div>
        {!isRes ? (
          <div style={{ flex: 1 }}>
            <FieldLabel>Growth projection</FieldLabel>
            <textarea
              value={state.growthNotes}
              onChange={(e) => patch({ growthNotes: e.target.value })}
              placeholder="e.g. Expecting to double team size in 12 months. Need modular layout."
              rows={3}
              style={{ width: "100%", minHeight: 76 }}
            />
            <div className="helper-note">How might space needs change in the next 6–18 months?</div>
          </div>
        ) : null}
      </div>

      <div style={{ marginBottom: 22 }}>
        <FieldLabel required>Timeline</FieldLabel>
        <RadioGroup options={TIMELINE_OPTIONS} value={state.timeline} onSelect={(v) => patch({ timeline: v })} direction="column" />
      </div>
    </div>
  );
}
