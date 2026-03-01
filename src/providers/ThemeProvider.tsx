"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
    theme: Theme;
    resolved: "light" | "dark";
    setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [resolved, setResolved] = useState<"light" | "dark">("light");

    // Read persisted preference on mount
    useEffect(() => {
        const stored = localStorage.getItem("ct-theme") as Theme | null;
        if (stored) setTheme(stored);
    }, []);

    // Resolve actual theme and apply class
    useEffect(() => {
        const root = document.documentElement;
        let active: "light" | "dark";

        if (theme === "system") {
            active = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        } else {
            active = theme;
        }

        root.classList.toggle("dark", active === "dark");
        setResolved(active);
        localStorage.setItem("ct-theme", theme);
    }, [theme]);

    // Listen for system preference changes when in "system" mode
    useEffect(() => {
        if (theme !== "system") return;

        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            setResolved(e.matches ? "dark" : "light");
            document.documentElement.classList.toggle("dark", e.matches);
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}
