import { useEffect, useRef } from "react";
import type { Wizard } from "../useWizard";
import { PHASE_OPTIONS, RENOVATION_OPTIONS, SPACE_TYPES, DIRECTIONS } from "../constants";
import { FieldLabel, RadioGroup, SectionHeading, SingleImageUpload, ImageGridUpload } from "./common";
import { IconCamera, IconFloorPlan, IconRuler } from "./Icons";
import { MAX_PHOTOS } from "../types";

export function Step1({ wizard }: { wizard: Wizard }) {
  const { state, patch, handleFPUpload, handlePhotosUpload } = wizard;
  const floorPlanErrorRef = useRef<HTMLDivElement | null>(null);

  // The floor plan check runs after clicking Continue, so if it fails while
  // the designer has scrolled down to fill later fields on this same step,
  // the error would otherwise reappear off-screen with no visible sign
  // anything happened.
  useEffect(() => {
    if (state.floorPlanError) {
      floorPlanErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state.floorPlanError]);

  return (
    <div className="fade-in" style={{ maxWidth: 720 }}>
      <div style={{ fontSize: 26, fontWeight: 340, letterSpacing: -0.5, marginBottom: 4 }}>Space documentation</div>
      <div style={{ fontSize: 14, color: "var(--text-subtle)", marginBottom: 36 }}>Upload your floor plan and provide space details</div>

      <div style={{ fontSize: 15, fontWeight: 540, marginBottom: 18, color: "var(--text)" }}>Project basics</div>
      <div className="two-col-row" style={{ display: "flex", gap: 14, marginBottom: 18 }}>
        <div style={{ flex: 1 }}>
          <FieldLabel required>Project name</FieldLabel>
          <input
            type="text"
            value={state.projectName}
            onChange={(e) => patch({ projectName: e.target.value })}
            placeholder="e.g. The Bennett residence"
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <FieldLabel required>Space type</FieldLabel>
          <select value={state.spaceType} onChange={(e) => patch({ spaceType: e.target.value })} style={{ width: "100%", cursor: "pointer" }}>
            <option value="">Select type</option>
            {SPACE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <FieldLabel required>Project phase</FieldLabel>
        <RadioGroup options={PHASE_OPTIONS} value={state.projectPhase} onSelect={(v) => patch({ projectPhase: v })} />
      </div>

      <div className="hairline" />

      <div style={{ marginBottom: 28 }}>
        <SectionHeading icon={<IconFloorPlan size={17} />} required>Floor plan</SectionHeading>
        <div className="section-sub">Required — upload your floor plan image</div>
        <SingleImageUpload
          image={state.floorPlan}
          onUpload={handleFPUpload}
          onRemove={() => patch({ floorPlan: null })}
          label="Drop your floor plan here or click to upload"
        />
        {state.floorPlanError ? (
          <div
            ref={floorPlanErrorRef}
            style={{ fontSize: 12, color: "var(--danger)", marginTop: 8, padding: "9px 12px", background: "rgba(229,72,77,0.08)", borderRadius: 8, border: "1px solid rgba(229,72,77,0.25)" }}
          >
            {state.floorPlanError}
          </div>
        ) : null}
        <div className="helper-note" style={{ fontStyle: "italic" }}>
          Tip: mark north with a written N + arrow — it helps the AI a lot.
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <SectionHeading icon={<IconCamera size={17} />}>Space photos</SectionHeading>
        <div className="section-sub">Recommended — up to {MAX_PHOTOS} photos from corners and center of each room</div>
        <ImageGridUpload
          images={state.spacePhotos}
          onUpload={handlePhotosUpload}
          onRemove={(i) => patch((s) => ({ spacePhotos: s.spacePhotos.filter((_, j) => j !== i) }))}
          max={MAX_PHOTOS}
        />
      </div>

      <div className="hairline" />

      <div>
        <SectionHeading icon={<IconRuler size={17} />}>Manual space data</SectionHeading>
        <div className="section-sub" style={{ marginBottom: 18 }}>Takes ~5 minutes — dramatically improves output quality</div>

        <div style={{ marginBottom: 18 }}>
          <FieldLabel>Approximate total area</FieldLabel>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="number"
              value={state.totalArea}
              onChange={(e) => patch({ totalArea: e.target.value })}
              placeholder="e.g. 1200"
              style={{ width: 150 }}
            />
            <div
              style={{ padding: "7px 12px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", fontSize: 12, color: "var(--text-tertiary)", userSelect: "none" }}
              onClick={() => patch({ areaUnit: state.areaUnit === "sqft" ? "sqm" : "sqft" })}
            >
              {state.areaUnit === "sqft" ? "sq ft" : "sq m"}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <FieldLabel>Key room dimensions (optional)</FieldLabel>
          {state.rooms.map((room, i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 7 }}>
              <input
                value={room.name}
                onChange={(e) =>
                  patch((s) => {
                    const rooms = [...s.rooms];
                    rooms[i] = { ...rooms[i], name: e.target.value };
                    return { rooms };
                  })
                }
                style={{ width: 130, fontSize: 13, padding: "9px 10px" }}
              />
              <input
                value={room.l}
                onChange={(e) =>
                  patch((s) => {
                    const rooms = [...s.rooms];
                    rooms[i] = { ...rooms[i], l: e.target.value };
                    return { rooms };
                  })
                }
                placeholder="L"
                style={{ width: 60, fontSize: 13, padding: "9px 10px", textAlign: "center" }}
              />
              <span style={{ color: "var(--text-faint)", fontSize: 12 }}>×</span>
              <input
                value={room.w}
                onChange={(e) =>
                  patch((s) => {
                    const rooms = [...s.rooms];
                    rooms[i] = { ...rooms[i], w: e.target.value };
                    return { rooms };
                  })
                }
                placeholder="W"
                style={{ width: 60, fontSize: 13, padding: "9px 10px", textAlign: "center" }}
              />
              <span style={{ fontSize: 11, color: "var(--text-faint)" }}>ft</span>
            </div>
          ))}
        </div>

        <div className="two-col-row" style={{ display: "flex", gap: 14, marginBottom: 18 }}>
          <div style={{ flex: 1 }}>
            <FieldLabel>Ceiling height</FieldLabel>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="number"
                value={state.ceilingHeight}
                onChange={(e) => patch({ ceilingHeight: e.target.value })}
                placeholder="e.g. 9"
                style={{ width: 100 }}
              />
              <span style={{ fontSize: 12, color: "var(--text-subtle)" }}>ft</span>
            </div>
            <div className="helper-note">Floor to ceiling, approximate</div>
          </div>
          <div style={{ flex: 1 }}>
            <FieldLabel>Number of levels</FieldLabel>
            <select value={state.numLevels} onChange={(e) => patch({ numLevels: e.target.value })} style={{ width: "100%", cursor: "pointer" }}>
              <option value="1">Single level</option>
              <option value="2">2 levels</option>
              <option value="3">3+ levels</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <FieldLabel>Main entrance faces</FieldLabel>
          <select value={state.northDirection} onChange={(e) => patch({ northDirection: e.target.value })} style={{ width: 220, cursor: "pointer" }}>
            <option value="">Select direction</option>
            {DIRECTIONS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 18 }}>
          <FieldLabel>Renovation scope</FieldLabel>
          <RadioGroup
            options={RENOVATION_OPTIONS}
            value={state.renovationScope}
            onSelect={(v) => patch({ renovationScope: v })}
            direction="column"
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <FieldLabel>Wet wall locations</FieldLabel>
          <textarea
            value={state.wetWalls}
            onChange={(e) => patch({ wetWalls: e.target.value })}
            placeholder="e.g. Kitchen is on the north wall, bathroom is adjacent to bedroom 1"
            rows={2}
            style={{ width: "100%", minHeight: 64 }}
          />
          <div className="helper-note">Optional — helps the AI avoid impractical plumbing relocations</div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <FieldLabel>Walls that cannot move</FieldLabel>
          <textarea
            value={state.immovableWalls}
            onChange={(e) => patch({ immovableWalls: e.target.value })}
            placeholder="e.g. Load-bearing wall between living room and bedroom 2"
            rows={2}
            style={{ width: "100%", minHeight: 64 }}
          />
        </div>
      </div>
    </div>
  );
}
