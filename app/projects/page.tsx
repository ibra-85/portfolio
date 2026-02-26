"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Search, Calendar, ArrowUpRight } from "lucide-react";

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

    const filtered = useMemo<Project[]>(() => filterProjects(allProjects, q), [q]);

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
                        <p className="text-gray-400">Decouvrez mes realisations et projets recents</p>
                    </motion.div>

                    {q && (
                        <motion.p variants={itemVariants} className="mb-6 text-sm text-gray-400">
                            {filtered.length} projet{filtered.length > 1 ? "s" : ""} trouve
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
                                <p className="text-lg text-white">Aucun projet trouve</p>
                                <p className="text-sm text-gray-400">Essaie avec d&apos;autres mots-cles</p>
                                <button
                                    onClick={openCommandMenu}
                                    className="mt-4 rounded-lg border border-[#333333] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:bg-[#1b1b1b]"
                                >
                                    Ouvrir le Command Menu
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
