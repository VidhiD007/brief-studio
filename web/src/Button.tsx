import type { ButtonHTMLAttributes, CSSProperties } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "small";
  fullWidth?: boolean;
  minHeight?: number;
}

export function Button({ size = "default", fullWidth, minHeight, style, ...rest }: ButtonProps) {
  const sizeStyle: CSSProperties =
    size === "small"
      ? { fontSize: 16, padding: "6px 14px" }
      : { fontSize: 20, padding: "10px 20px", minHeight: minHeight ?? 40, minWidth: 150 };
  return (
    <button
      className="dc-button"
      style={{ width: fullWidth ? "100%" : undefined, ...sizeStyle, ...style }}
      {...rest}
    />
  );
}
