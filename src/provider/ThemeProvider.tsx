import { useCallback, useEffect, useMemo, useState } from "react";
import ThemeContext, { type Theme } from "../context/ThemeContext";

const STORAGE_KEY = "theme";

function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "dark" || v === "light") {
    return v;
  }
  return null;
}

function resolveTheme(): Theme {
  const stored = readStoredTheme();
  if (stored) {
    return stored;
  }
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

function applyDomTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  const [theme, setThemeState] = useState<Theme>(() => resolveTheme());

  useEffect(() => {
    applyDomTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
