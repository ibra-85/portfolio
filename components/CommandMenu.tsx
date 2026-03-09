"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, FolderKanban, FileText, Mail, Search } from "lucide-react";
import { getProjects } from "@/data/projects";

type Section = "actions" | "projects";

type MenuAction = {
    id: string;
    label: string;
    hint?: string;
    section: Section;
    disabled?: boolean;
    icon: ComponentType<{ className?: string }>;
    run: () => void;
};

const OPEN_EVENT = "open-command-menu";
export const PROJECT_QUERY_EVENT = "project-query-change";

export function CommandMenu() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const projects = useMemo(() => getProjects(), []);

    const baseActions = useMemo<MenuAction[]>(
        () => [
            {
                id: "home",
                label: "Accueil",
                section: "actions",
                hint: pathname === "/" ? "Page actuelle" : undefined,
                disabled: pathname === "/",
                icon: Home,
                run: () => {
                    if (pathname !== "/") router.push("/");
                },
            },
            {
                id: "projects",
                label: "Projets",
                section: "actions",
                hint: pathname?.startsWith("/projects") ? "Page actuelle" : undefined,
                disabled: pathname?.startsWith("/projects"),
                icon: FolderKanban,
                run: () => {
                    if (!pathname?.startsWith("/projects")) router.push("/projects");
                },
            },
            {
                id: "cv",
                label: "Voir le CV",
                section: "actions",
                hint: "/cv.pdf",
                icon: FileText,
                run: () => window.open("/cv.pdf", "_blank", "noopener,noreferrer"),
            },
            {
                id: "contact",
                label: "Me contacter",
                section: "actions",
                hint: "mailto",
                icon: Mail,
                run: () => window.location.assign("mailto:ibraguimd@gmail.com"),
            },
        ],
        [pathname, router]
    );

    const actions = useMemo(() => {
        const q = query.trim().toLowerCase();

        const projectActions: MenuAction[] = projects
            .filter((p) => !q || p.title.toLowerCase().includes(q))
            .slice(0, 8)
            .map((p) => ({
                id: `project-${p.slug}`,
                label: p.title,
                section: "projects",
                hint: p.period,
                icon: FolderKanban,
                run: () => router.push(`/projects/${p.slug}`),
            }));

        const searchAction: MenuAction[] = q
            ? [
                  {
                      id: "search-projects",
                      label: `Rechercher \"${query}\" dans Projets`,
                      section: "actions",
                      icon: Search,
                      run: () => {
                          const normalized = query.trim();
                          window.dispatchEvent(new CustomEvent(PROJECT_QUERY_EVENT, { detail: normalized }));
                          router.push(`/projects?q=${encodeURIComponent(normalized)}`);
                      },
                  },
              ]
            : [];

        return [...searchAction, ...baseActions, ...projectActions];
    }, [baseActions, projects, query, router]);

    const actionCount = useMemo(() => actions.filter((a) => a.section === "actions").length, [actions]);

    useEffect(() => {
        setActiveIndex(0);
    }, [query, isOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const typing =
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement ||
                target?.isContentEditable;

            if (!typing && ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
                e.preventDefault();
                setIsOpen(true);
                return;
            }

            if (!typing && e.key === "/") {
                e.preventDefault();
                setIsOpen(true);
                return;
            }

            if (e.key === "Escape") {
                setIsOpen(false);
                return;
            }

            if (!isOpen) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => (i + 1) % Math.max(actions.length, 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => (i - 1 + Math.max(actions.length, 1)) % Math.max(actions.length, 1));
            } else if (e.key === "Enter") {
                e.preventDefault();
                const selected = actions[activeIndex];
                if (selected && !selected.disabled) {
                    selected.run();
                    setIsOpen(false);
                }
            }
        };

        const onOpen = () => setIsOpen(true);
        window.addEventListener("keydown", onKey);
        window.addEventListener(OPEN_EVENT, onOpen);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener(OPEN_EVENT, onOpen);
        };
    }, [actions, activeIndex, isOpen]);

    useEffect(() => {
        if (!isOpen) setQuery("");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-100 bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de commande"
        >
            <div
                className="mx-auto mt-[10vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#121212]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                    <Search className="h-4 w-4 text-white/60" />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Tape une commande, un projet, ou une recherche..."
                        aria-label="Rechercher une commande ou un projet"
                        className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus-visible:outline-none"
                    />
                </div>
                <ul className="max-h-[60vh] overflow-y-auto p-2">
                    {actions.length === 0 && <li className="px-3 py-2 text-sm text-white/50">Aucun résultat</li>}

                    {actions.length > 0 && (
                        <li className="px-3 pb-1 pt-2 text-[11px] uppercase tracking-wider text-white/40">Actions</li>
                    )}

                    {actions.map((action, index) => {
                        const Icon = action.icon;
                        const active = index === activeIndex;
                        const showProjectsHeader = index === actionCount && actions.slice(actionCount).length > 0;

                        return (
                            <li key={action.id}>
                                {showProjectsHeader && (
                                    <div className="px-3 pb-1 pt-3 text-[11px] uppercase tracking-wider text-white/40">Projets</div>
                                )}
                                <button
                                    type="button"
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => {
                                        if (action.disabled) return;
                                        action.run();
                                        setIsOpen(false);
                                    }}
                                    aria-disabled={action.disabled}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${
                                        action.disabled
                                            ? "cursor-not-allowed text-white/40"
                                            : active
                                              ? "bg-white/10 text-white"
                                              : "text-white/80 hover:bg-white/6"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <Icon className="h-4 w-4" />
                                        <span>{action.label}</span>
                                    </span>
                                    {action.hint && <span className="text-xs text-white/50">{action.hint}</span>}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export function openCommandMenu() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(OPEN_EVENT));
    }
}
