"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function useKeyboardShortcuts() {
    const router = useRouter();
    const gKeyPressed = useRef(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                (e.target instanceof HTMLElement && e.target.isContentEditable)
            ) {
                return;
            }

            if (e.key === "/") {
                e.preventDefault();
                window.dispatchEvent(new Event("open-command-menu"));
                return;
            }

            if (e.key === "g" && !e.ctrlKey && !e.metaKey && !gKeyPressed.current) {
                gKeyPressed.current = true;
                const handleSecondKey = (e2: KeyboardEvent) => {
                    if (e2.key === "h") {
                        e2.preventDefault();
                        router.push("/");
                    } else if (e2.key === "p") {
                        e2.preventDefault();
                        router.push("/projects");
                    }
                    gKeyPressed.current = false;
                    window.removeEventListener("keydown", handleSecondKey);
                };
                window.addEventListener("keydown", handleSecondKey);
                setTimeout(() => {
                    gKeyPressed.current = false;
                    window.removeEventListener("keydown", handleSecondKey);
                }, 1000);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router]);
}
