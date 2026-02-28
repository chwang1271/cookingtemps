"use client";

import { useEffect, useState } from "react";

interface ToastProps {
    message?: string;
}

// Simple module-level event emitter for toast
type ToastListener = (msg: string) => void;
const listeners = new Set<ToastListener>();

export function showToast(message: string) {
    listeners.forEach((fn) => fn(message));
}

export function Toast({ message = "Copied!" }: ToastProps) {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState(message);

    useEffect(() => {
        const handler: ToastListener = (msg) => {
            setText(msg);
            setVisible(true);
            setTimeout(() => setVisible(false), 1500);
        };
        listeners.add(handler);
        return () => { listeners.delete(handler); };
    }, []);

    if (!visible) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[1000] bg-ink text-highlight font-mono text-sm font-bold px-4 py-2 border-2 border-ink shadow-hard pointer-events-none"
        >
            {text}
        </div>
    );
}
