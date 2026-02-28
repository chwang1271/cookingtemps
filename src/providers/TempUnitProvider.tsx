"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

export type TempUnit = "F" | "C" | "K";

interface TempUnitContextValue {
    unit: TempUnit;
    setUnit: (u: TempUnit) => void;
}

const TempUnitContext = createContext<TempUnitContextValue | undefined>(
    undefined
);

export function TempUnitProvider({ children }: { children: ReactNode }) {
    const [unit, setUnit] = useState<TempUnit>("F");

    useEffect(() => {
        const stored = localStorage.getItem("ct-unit") as TempUnit | null;
        if (stored && ["F", "C", "K"].includes(stored)) setUnit(stored);
    }, []);

    const handleSetUnit = (u: TempUnit) => {
        setUnit(u);
        localStorage.setItem("ct-unit", u);
    };

    return (
        <TempUnitContext.Provider value={{ unit, setUnit: handleSetUnit }}>
            {children}
        </TempUnitContext.Provider>
    );
}

export function useTempUnit() {
    const ctx = useContext(TempUnitContext);
    if (!ctx)
        throw new Error("useTempUnit must be used within TempUnitProvider");
    return ctx;
}
