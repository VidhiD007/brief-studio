import type { Wizard } from "../useWizard";
import { PHASE_OPTIONS, RENOVATION_OPTIONS, SPACE_TYPES, DIRECTIONS } from "../constants";
import { FieldLabel, RadioGroup, RequiredMark, SingleImageUpload, ImageGridUpload } from "./common";
import { MAX_PHOTOS } from "../types";

export function Step1({ wizard }: { wizard: Wizard }) {
  const { state, patch, handleFPUpload, handlePhotosUpload } = wizard;

  return (
    <div className="fade-in" style={{ maxWidth: 720 }}>
      <div style={{ fontSize: 26, fontWeight: 340, letterSpacing: -0.5, marginBottom: 4 }}>Space documentation</div>
      <div style={{ fontSize: 14, color: "#5a5a5a", marginBottom: 36 }}>Upload your floor plan and provide space details</div>

      <div style={{ fontSize: 15, fontWeight: 540, marginBottom: 18, color: "#f0ece4" }}>Project basics</div>
      <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
        <div style={{ flex: 1 }}>
          <FieldLabel required>Project name</FieldLabel>
          <input
            type="text"
            value={state.projectName}
            onChange={(e) => patch({ projectName: e.target.value })}
            placeholder="e.g. Sharma residence"
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
        <div className="section-title">Floor plan<RequiredMark /></div>
        <div className="section-sub">Required — upload your floor plan image</div>
        <SingleImageUpload
          image={state.floorPlan}
          onUpload={handleFPUpload}
          onRemove={() => patch({ floorPlan: null })}
          label="Drop your floor plan here or click to upload"
        />
        <div className="helper-note" style={{ fontStyle: "italic" }}>
          Mark north direction on your floor plan before uploading — even a written N with an arrow helps the AI significantly.
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div className="section-title">Space photos</div>
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
        <div className="section-title">Manual space data</div>
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
              style={{ padding: "7px 12px", background: "#28282e", border: "1px solid #3a3a42", borderRadius: 8, cursor: "pointer", fontSize: 12, color: "#6a6a6a", userSelect: "none" }}
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
              <span style={{ color: "#3a3a42", fontSize: 12 }}>×</span>
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
              <span style={{ fontSize: 11, color: "#3a3a42" }}>ft</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
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
              <span style={{ fontSize: 12, color: "#5a5a5a" }}>ft</span>
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
