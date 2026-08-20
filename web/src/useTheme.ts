import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
const STORAGE_KEY = "briefStudioTheme";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  // index.html already set this attribute synchronously before React mounted
  // (see the inline script there) — read it back rather than re-deciding,
  // so this hook's first render matches what's already on screen.
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private browsing / storage disabled — theme just won't persist.
    }
  }, [theme]);

  const toggleTheme = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}
