"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useKeyboardShortcuts() {
    const router = useRouter();
    const pathname = usePathname();
    const gKeyPressed = useRef(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignorer si l'utilisateur est en train de taper dans un input/textarea
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                (e.target instanceof HTMLElement && e.target.isContentEditable)
            ) {
                return;
            }

            // Raccourci "/" pour focus la recherche (sur la page projets)
            if (e.key === "/" && pathname?.startsWith("/projects")) {
                e.preventDefault();
                // Utiliser un petit délai pour s'assurer que l'input est rendu
                setTimeout(() => {
                    const searchInput = document.querySelector<HTMLInputElement>("#project-search");
                    if (searchInput) {
                        searchInput.focus();
                        searchInput.select(); // Sélectionner le texte existant si présent
                    }
                }, 0);
                return;
            }

            // Raccourci "g" puis "h" pour aller à l'accueil (vim-style)
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
    }, [router, pathname]);
}

