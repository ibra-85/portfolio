"use client";

import { useEffect } from "react";

export function useSearchHotkeys(opts: {
    focus: () => void;
    clear: () => void;
    blur: () => void;
}) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                opts.focus();
            } else if (e.key === "Escape") {
                opts.clear();
                opts.blur();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [opts]);
}
