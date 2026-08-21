import type { CSSProperties } from "react";

interface IconProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
}

// A small, consistent line-icon set — thin stroke, rounded caps, no fill.
// Matches the logo mark's visual language rather than mixing icon styles
// (deliberately not emoji: this tool pitches to designers as a studio
// instrument, not a consumer app).
const base = (size: number, color: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: color,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function IconFloorPlan({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <rect x="2" y="2.5" width="7" height="10" rx="1" />
      <rect x="11" y="2.5" width="7" height="6" rx="1" />
      <rect x="11" y="10.5" width="7" height="7" rx="1" />
      <line x1="4" y1="6" x2="7" y2="6" />
      <line x1="4" y1="9" x2="7" y2="9" />
    </svg>
  );
}

export function IconPeople({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <circle cx="7" cy="6.5" r="2.6" />
      <path d="M2.2 16c0-2.7 2.1-4.6 4.8-4.6s4.8 1.9 4.8 4.6" />
      <circle cx="14.5" cy="6" r="1.9" />
      <path d="M12.8 11.7c2.2.2 3.9 2 3.9 4.3" />
    </svg>
  );
}

export function IconCompass({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M12.6 7.4 11 11l-3.6 1.6L9 9z" />
    </svg>
  );
}

export function IconPalette({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <path d="M10 2.5a7.5 7.5 0 1 0 0 15c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H14a3.5 3.5 0 0 0 3.5-3.5c0-3.4-3.4-6.1-7.5-6.1Z" />
      <circle cx="6.3" cy="8.2" r="1" fill={color} stroke="none" />
      <circle cx="9.4" cy="5.6" r="1" fill={color} stroke="none" />
      <circle cx="13" cy="7" r="1" fill={color} stroke="none" />
    </svg>
  );
}

export function IconChecklist({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <rect x="3" y="2.5" width="14" height="15" rx="1.5" />
      <path d="M6.2 7.2 7.4 8.4 9.6 6" />
      <line x1="11.5" y1="7.2" x2="14.5" y2="7.2" />
      <path d="M6.2 12.2 7.4 13.4 9.6 11" />
      <line x1="11.5" y1="12.2" x2="14.5" y2="12.2" />
    </svg>
  );
}

export function IconCheck({ size = 14, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style} strokeWidth={2.1}>
      <path d="M3.5 10.2 7.7 14.3 16.5 5.5" />
    </svg>
  );
}

export function IconCamera({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <path d="M3 6.5c0-.8.7-1.5 1.5-1.5h1.8l.9-1.4h5.6l.9 1.4h1.8c.8 0 1.5.7 1.5 1.5v8c0 .8-.7 1.5-1.5 1.5h-11C3.7 16 3 15.3 3 14.5z" />
      <circle cx="10" cy="10.2" r="3" />
    </svg>
  );
}

export function IconRuler({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <rect x="2.2" y="7.8" width="15.6" height="5.4" rx="1" transform="rotate(-18 10 10)" />
      <line x1="6.3" y1="8.6" x2="7.1" y2="10.1" />
      <line x1="9" y1="7.7" x2="9.8" y2="9.2" />
      <line x1="11.7" y1="6.8" x2="12.5" y2="8.3" />
    </svg>
  );
}

export function IconTag({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <path d="M10.6 2.8H4.6a1.8 1.8 0 0 0-1.8 1.8v6l8 8 7.4-7.4-8-8Z" transform="translate(0.2 0)" />
      <circle cx="7" cy="7" r="1.1" fill={color} stroke="none" />
    </svg>
  );
}

export function IconSpeech({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <path d="M3 4.5h14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8.5L5 16.5V13.5H3a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function IconStar({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <path d="M10 2.6 12.3 7.6 17.6 8.3 13.8 12 14.8 17.4 10 14.8 5.2 17.4 6.2 12 2.4 8.3 7.7 7.6Z" />
    </svg>
  );
}

export function IconClock({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 5.8V10l3 2" />
    </svg>
  );
}

export function IconBulb({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <path d="M6.2 8.3a3.8 3.8 0 1 1 6.6 2.6c-.7.7-1.1 1.3-1.1 2.1H8.3c0-.8-.4-1.4-1.1-2.1a3.8 3.8 0 0 1-1-2.6Z" />
      <line x1="8.3" y1="16" x2="11.7" y2="16" />
      <line x1="10" y1="1.6" x2="10" y2="2.8" />
    </svg>
  );
}

export function IconImages({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <rect x="5" y="4.5" width="12.5" height="10" rx="1.2" />
      <circle cx="9" cy="8" r="1.2" />
      <path d="M5.5 12.5 8.5 9.8l2.8 2.7 2-1.9 3.7 3" />
      <path d="M2.5 6v8.5a1.5 1.5 0 0 0 1.5 1.5H14" />
    </svg>
  );
}

export function IconPencil({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <path d="M13.5 3.2 16.8 6.5 7 16.3 3.2 16.8 3.7 13Z" />
      <line x1="11.8" y1="4.9" x2="15.1" y2="8.2" />
    </svg>
  );
}

export function IconSun({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <circle cx="10" cy="10" r="3.4" />
      <line x1="10" y1="1.8" x2="10" y2="3.6" />
      <line x1="10" y1="16.4" x2="10" y2="18.2" />
      <line x1="1.8" y1="10" x2="3.6" y2="10" />
      <line x1="16.4" y1="10" x2="18.2" y2="10" />
      <line x1="4.3" y1="4.3" x2="5.6" y2="5.6" />
      <line x1="14.4" y1="14.4" x2="15.7" y2="15.7" />
      <line x1="14.4" y1="5.6" x2="15.7" y2="4.3" />
      <line x1="4.3" y1="15.7" x2="5.6" y2="14.4" />
    </svg>
  );
}

export function IconGrid({ size = 18, color = "currentColor", style }: IconProps) {
  return (
    <svg {...base(size, color)} style={style}>
      <rect x="2.5" y="2.5" width="6.2" height="6.2" rx="0.8" />
      <rect x="11.3" y="2.5" width="6.2" height="6.2" rx="0.8" />
      <rect x="2.5" y="11.3" width="6.2" height="6.2" rx="0.8" />
      <rect x="11.3" y="11.3" width="6.2" height="6.2" rx="0.8" />
    </svg>
  );
}
