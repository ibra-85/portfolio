"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Search, Calendar, ArrowUpRight, ChevronDown, Check } from "lucide-react";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import Footer from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { ImageSkeleton } from "@/components/ImageSkeleton";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { openCommandMenu, PROJECT_QUERY_EVENT } from "@/components/CommandMenu";
import { getProjects, type Project, type ProjectSection } from "@/data/projects";
import { filterProjects } from "@/lib/search";

const allProjects: Project[] = getProjects();

export default function ProjectsPage() {
    useKeyboardShortcuts();
    const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});
    const [q, setQ] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [isSkillMenuOpen, setIsSkillMenuOpen] = useState(false);
    const [skillSearch, setSkillSearch] = useState("");
    const skillMenuRef = useRef<HTMLDivElement>(null);

    const closeSkillMenu = () => {
        setIsSkillMenuOpen(false);
        setSkillSearch("");
    };

    useEffect(() => {
        const syncFromUrl = () => {
            const query = new URLSearchParams(window.location.search).get("q") ?? "";
            setQ(query);
        };
        const onProjectQuery = (event: Event) => {
            const next = (event as CustomEvent<string>).detail ?? "";
            setQ(next);
        };

        syncFromUrl();
        window.addEventListener("popstate", syncFromUrl);
        window.addEventListener(PROJECT_QUERY_EVENT, onProjectQuery as EventListener);
        return () => {
            window.removeEventListener("popstate", syncFromUrl);
            window.removeEventListener(PROJECT_QUERY_EVENT, onProjectQuery as EventListener);
        };
    }, []);

    const availableSkills = useMemo(
        () => Array.from(new Set(allProjects.flatMap((p) => p.skills))).sort((a, b) => a.localeCompare(b)),
        []
    );
    const skillCounts = useMemo(
        () =>
            availableSkills.reduce<Record<string, number>>((acc, skill) => {
                acc[skill] = allProjects.filter((p) => p.skills.includes(skill)).length;
                return acc;
            }, {}),
        [availableSkills]
    );

    const filtered = useMemo<Project[]>(() => {
        const searched = filterProjects(allProjects, q);
        if (!selectedSkills.length) return searched;
        return searched.filter((p) => selectedSkills.every((skill) => p.skills.includes(skill)));
    }, [q, selectedSkills]);

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
    };

    const filteredSkills = useMemo(() => {
        const q = skillSearch.trim().toLowerCase();
        if (!q) return availableSkills;
        return availableSkills.filter((s) => s.toLowerCase().includes(q));
    }, [availableSkills, skillSearch]);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (skillMenuRef.current && !skillMenuRef.current.contains(target)) {
                closeSkillMenu();
            }
        };
        const onEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeSkillMenu();
        };
        document.addEventListener("mousedown", onClickOutside);
        document.addEventListener("keydown", onEscape);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            document.removeEventListener("keydown", onEscape);
        };
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 12 } },
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#141414] lg:flex-row">
            <StructuredData type="website" projects={allProjects} />
            <Sidebar />
            <MobileNav />

            <main id="main-content" className="relative ml-0 flex flex-1 flex-col items-center max-lg:mt-24 lg:ml-64">
                <ScrollToTop />
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="w-full max-w-6xl border-dashed border-[#ffffff14] p-8 xl:border-x"
                >
                    <Breadcrumbs />

                    <motion.div variants={itemVariants} className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-white">Mes Projets</h1>
                        <p className="text-gray-400">Découvrez mes réalisations et projets récents</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6">
                        <div className="mb-2 flex items-center gap-2 text-sm text-white/70">
                            <span>Filtres compétences</span>
                            {selectedSkills.length > 0 && (
                                <span className="rounded-full border border-white/15 bg-white/8 px-2 py-0.5 text-xs text-white/75">
                                    {selectedSkills.length} actif{selectedSkills.length > 1 ? "s" : ""}
                                </span>
                            )}
                        </div>
                        <div className="relative max-w-sm" ref={skillMenuRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSkillMenuOpen((v) => {
                                        const next = !v;
                                        if (!next) setSkillSearch("");
                                        return next;
                                    });
                                }}
                                aria-haspopup="listbox"
                                aria-expanded={isSkillMenuOpen}
                                aria-controls="skill-filter-listbox"
                                className="flex w-full items-center justify-between rounded-lg border border-white/15 bg-[#1A1A1A] px-3 py-2 text-sm text-white/85 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                            >
                                <span className="truncate">
                                    {selectedSkills.length > 0
                                        ? `${selectedSkills.length} compétence${selectedSkills.length > 1 ? "s" : ""} sélectionnée${selectedSkills.length > 1 ? "s" : ""}`
                                        : "Sélectionner des compétences"}
                                </span>
                                <ChevronDown size={16} className="shrink-0 text-white/60" />
                            </button>

                            {isSkillMenuOpen && (
                                <div className="absolute z-20 mt-2 w-full rounded-lg border border-white/12 bg-[#121212] p-2 shadow-xl">
                                    <input
                                        value={skillSearch}
                                        onChange={(e) => setSkillSearch(e.target.value)}
                                        placeholder="Rechercher une compétence..."
                                        aria-label="Rechercher une compétence"
                                        className="mb-2 w-full rounded-md border border-white/10 bg-[#1A1A1A] px-2 py-1.5 text-sm text-white/85 placeholder:text-white/35 focus-visible:outline-none focus-visible:border-white/25"
                                    />
                                    <div id="skill-filter-listbox" role="listbox" aria-label="Compétences" className="max-h-56 overflow-y-auto pr-1">
                                        {filteredSkills.map((skill) => {
                                            const selected = selectedSkills.includes(skill);
                                            return (
                                                <button
                                                    type="button"
                                                    key={skill}
                                                    onClick={() => toggleSkill(skill)}
                                                    role="option"
                                                    aria-selected={selected}
                                                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm text-white/85 hover:bg-white/6"
                                                >
                                                    <span>
                                                        {skill} <span className="text-white/45">({skillCounts[skill] ?? 0})</span>
                                                    </span>
                                                    {selected && <Check size={14} className="text-white/75" />}
                                                </button>
                                            );
                                        })}
                                        {filteredSkills.length === 0 && (
                                            <div className="px-2 py-2 text-sm text-white/45">Aucune compétence trouvée.</div>
                                        )}
                                    </div>
                                    <div className="mt-2 border-t border-white/10 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedSkills([])}
                                            className="w-full rounded-md border border-amber-200/30 bg-amber-100/10 px-2 py-1.5 text-xs text-amber-100"
                                        >
                                            Réinitialiser
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {q && (
                        <motion.p variants={itemVariants} className="mb-6 text-sm text-gray-400">
                            {filtered.length} projet{filtered.length > 1 ? "s" : ""} trouvé
                            {filtered.length > 1 ? "s" : ""} pour &quot;{q}&quot;
                        </motion.p>
                    )}

                    <AnimatePresence mode="wait">
                        {filtered.length > 0 ? (
                            <motion.div key="projects-grid" variants={containerVariants} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {filtered.map((project: Project, index: number) => {
                                    const firstImage =
                                        (project.sections.find((s: ProjectSection) => s.images)?.images?.[0] as string | undefined) ??
                                        "/placeholder.png";
                                    const firstDesc = project.sections[0]?.description;

                                    return (
                                        <motion.article key={project.slug} variants={itemVariants} className="group">
                                            <Link href={`/projects/${project.slug}`} prefetch>
                                                <div className="overflow-hidden rounded-xl border border-[#333333] bg-[#1A1A1A] transition-all duration-300 hover:scale-[1.02] hover:border-[#555555]">
                                                    <div className="relative aspect-video overflow-hidden">
                                                        {!imageLoadStates[project.slug] && <ImageSkeleton className="absolute inset-0" aspectRatio="video" />}
                                                        <ImageWithFallback
                                                            src={firstImage}
                                                            alt={project.title}
                                                            fill
                                                            priority={index < 4}
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                            fallback="/project.png"
                                                            onLoad={() => setImageLoadStates((prev) => ({ ...prev, [project.slug]: true }))}
                                                        />
                                                        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                                    </div>

                                                    <div className="p-6">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1">
                                                                <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-white">
                                                                    {project.title}
                                                                </h3>

                                                                <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
                                                                    <Calendar size={16} aria-hidden />
                                                                    <span>{project.period}</span>
                                                                </div>
                                                                <div className="mb-3 flex flex-wrap gap-1">
                                                                    {project.skills.slice(0, 4).map((skill) => (
                                                                        <span
                                                                            key={skill}
                                                                            className="rounded-full border border-white/10 bg-white/6 px-2 py-0.5 text-[11px] text-white/70"
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>

                                                                {typeof firstDesc === "string" ? (
                                                                    <p className="line-clamp-2 text-sm text-gray-300">{firstDesc}</p>
                                                                ) : (
                                                                    <div className="line-clamp-2 text-sm text-gray-300">{firstDesc ?? "Description du projet"}</div>
                                                                )}
                                                            </div>

                                                            <div className="translate-x-2 transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                                                <ArrowUpRight className="text-gray-400 group-hover:text-white" size={20} aria-hidden />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.article>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="py-12 text-center"
                            >
                                <Search size={48} className="mx-auto mb-4 text-gray-400 opacity-40" aria-hidden />
                                <p className="text-lg text-white">Aucun projet trouvé</p>
                                <p className="text-sm text-gray-400">Essaie avec d&apos;autres mots-clés</p>
                                <button
                                    type="button"
                                    onClick={openCommandMenu}
                                    className="mt-4 rounded-lg border border-[#333333] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:bg-[#1b1b1b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                                >
                                    Ouvrir le menu de commande
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <Footer className="border-t border-[#ffffff14]" />
            </main>
        </div>
    );
}
