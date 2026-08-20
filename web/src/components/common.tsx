import type { ChangeEvent, DragEvent, ReactNode } from "react";
import { useRef } from "react";
import type { UploadedImage } from "../types";

export function RequiredMark() {
  return <span style={{ color: "#e5484d", marginLeft: 4 }}>*</span>;
}

export function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <div className="field-label">
      {children}
      {required ? <RequiredMark /> : null}
    </div>
  );
}

export function ChipGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((opt) => (
        <div
          key={opt}
          className={`chip${selected.includes(opt) ? " active" : ""}`}
          onClick={() => onToggle(opt)}
        >
          {opt}
        </div>
      ))}
    </div>
  );
}

export function RadioGroup({
  options,
  value,
  onSelect,
  direction = "row",
}: {
  options: { value: string; label: string; desc?: string }[];
  value: string;
  onSelect: (v: string) => void;
  direction?: "row" | "column";
}) {
  return (
    <div style={{ display: "flex", flexDirection: direction === "row" ? "row" : "column", gap: 10 }}>
      {options.map((opt) => (
        <div
          key={opt.value}
          className={`radio-opt${value === opt.value ? " active" : ""}`}
          onClick={() => onSelect(opt.value)}
        >
          <div className="radio-opt-label">{opt.label}</div>
          {opt.desc ? <div className="radio-opt-desc">{opt.desc}</div> : null}
        </div>
      ))}
    </div>
  );
}

function prevent(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
}

export function SingleImageUpload({
  image,
  onUpload,
  onRemove,
  label,
}: {
  image: UploadedImage | null;
  onUpload: (file: File | undefined) => void;
  onRemove: () => void;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        accept="image/*,.pdf"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onUpload(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {!image ? (
        <div
          className="upload-zone"
          onClick={() => inputRef.current?.click()}
          onDrop={(e) => {
            prevent(e);
            onUpload(e.dataTransfer.files?.[0]);
          }}
          onDragOver={prevent}
        >
          <div style={{ fontSize: 28, marginBottom: 6, color: "#3a3a42", fontWeight: 300 }}>↑</div>
          <div style={{ fontSize: 14, color: "#6a6a6a" }}>{label}</div>
          <div style={{ fontSize: 12, color: "#3a3a42", marginTop: 5 }}>JPG, PNG, or PDF</div>
        </div>
      ) : (
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #3a3a42", background: "#28282e" }}>
          <img
            src={image.url}
            style={{ width: "100%", maxHeight: 300, objectFit: "contain", display: "block", background: "#1e1e24" }}
          />
          <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #3a3a42" }}>
            <span style={{ fontSize: 12, color: "#6a6a6a" }}>{image.name}</span>
            <span className="text-link" onClick={onRemove}>Remove</span>
          </div>
        </div>
      )}
    </>
  );
}

export function ImageGridUpload({
  images,
  onUpload,
  onRemove,
  max,
  size = 90,
}: {
  images: UploadedImage[];
  onUpload: (files: FileList | undefined) => void;
  onRemove: (i: number) => void;
  max: number;
  size?: number;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        multiple
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onUpload(e.target.files ?? undefined);
          e.target.value = "";
        }}
      />
      {images.map((img, i) => (
        <div
          key={i}
          style={{ position: "relative", width: size, height: size, borderRadius: 8, overflow: "hidden", border: "1px solid #3a3a42", flexShrink: 0 }}
        >
          <img src={img.url} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div
            style={{
              position: "absolute", top: 3, right: 3, width: 20, height: 20,
              background: "rgba(0,0,0,0.7)", borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 10, color: "#fff",
            }}
            onClick={() => onRemove(i)}
          >
            ✕
          </div>
        </div>
      ))}
      {images.length < max ? (
        <div
          className="upload-add"
          style={{ width: size, height: size }}
          onClick={() => inputRef.current?.click()}
          onDrop={(e) => {
            prevent(e);
            onUpload(e.dataTransfer.files ?? undefined);
          }}
          onDragOver={prevent}
        >
          +
        </div>
      ) : null}
    </div>
  );
}
