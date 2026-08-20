import type { ChangeEvent, DragEvent, ReactNode } from "react";
import { useRef } from "react";
import type { UploadedImage } from "../types";
import type { Theme } from "../useTheme";

export function RequiredMark() {
  return <span style={{ color: "var(--danger)", marginLeft: 4 }}>*</span>;
}

export function ThemeToggleButton({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) {
  return (
    <div
      className="top-bar-btn theme-toggle-btn"
      onClick={toggleTheme}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, padding: 0 }}
    >
      {theme === "dark" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4.5" stroke="var(--text-dim)" strokeWidth="1.6" />
          <g stroke="var(--text-dim)" strokeWidth="1.6" strokeLinecap="round">
            <line x1="12" y1="1.5" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22.5" />
            <line x1="1.5" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22.5" y2="12" />
            <line x1="4.4" y1="4.4" x2="6.1" y2="6.1" />
            <line x1="17.9" y1="17.9" x2="19.6" y2="19.6" />
            <line x1="4.4" y1="19.6" x2="6.1" y2="17.9" />
            <line x1="17.9" y1="6.1" x2="19.6" y2="4.4" />
          </g>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"
            stroke="var(--text-dim)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
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
          <div style={{ fontSize: 28, marginBottom: 6, color: "var(--text-faint)", fontWeight: 300 }}>↑</div>
          <div style={{ fontSize: 14, color: "var(--text-tertiary)" }}>{label}</div>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 5 }}>JPG, PNG, or PDF</div>
        </div>
      ) : (
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface)" }}>
          <img
            src={image.url}
            style={{ width: "100%", maxHeight: 300, objectFit: "contain", display: "block", background: "var(--bg)" }}
          />
          <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)" }}>
            <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{image.name}</span>
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
          style={{ position: "relative", width: size, height: size, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)", flexShrink: 0 }}
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
