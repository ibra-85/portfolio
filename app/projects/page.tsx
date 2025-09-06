"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ArrowUpRight, X } from "lucide-react";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import Footer from "@/components/Footer";
import { getProjects, type Project, type ProjectSection } from "@/data/projects";
import { filterProjects } from "@/lib/search"; // recherche centralisée

const allProjects: Project[] = getProjects();

export default function ProjectsPage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [q, setQ] = useState("");

    // debounce 250ms
    const [debouncedQ, setDebouncedQ] = useState(q);
    useEffect(() => {
        const id = setTimeout(() => setDebouncedQ(q), 250);
        return () => clearTimeout(id);
    }, [q]);

    const filtered = useMemo<Project[]>(
        () => filterProjects(allProjects, debouncedQ),
        [debouncedQ]
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#141414]">
            <Sidebar />
            <MobileNav />

            <main className="flex flex-col items-center flex-1 relative ml-0 lg:ml-64 max-lg:mt-24">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="w-full max-w-6xl p-8 xl:border-x border-dashed border-[#ffffff14] "
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Mes Projets</h1>
                        <p className="text-gray-400">Découvrez mes réalisations et projets récents</p>
                    </motion.div>

                    {/* Barre de recherche */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <label htmlFor="project-search" className="sr-only">Rechercher un projet</label>
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                                aria-hidden
                            />
                            <input
                                ref={inputRef}
                                id="project-search"
                                type="text"
                                placeholder="Rechercher un projet..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-[#1A1A1A] border border-[#333333] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#555555] transition-colors"
                            />
                            {q && (
                                <button
                                    aria-label="Effacer la recherche"
                                    onClick={() => setQ("")}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10"
                                >
                                    <X size={16} className="text-white/80" />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Résultats / compteur */}
                    {q && (
                        <motion.p variants={itemVariants} className="mb-6 text-sm text-gray-400">
                            {filtered.length} projet{filtered.length > 1 ? "s" : ""} trouvé
                            {filtered.length > 1 ? "s" : ""} pour “{q}”
                        </motion.p>
                    )}

                    {/* Grid */}
                    <AnimatePresence mode="wait">
                        {filtered.length > 0 ? (
                            <motion.div
                                key="projects-grid"
                                variants={containerVariants}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {filtered.map((project: Project) => {
                                    const firstImage =
                                        (project.sections.find((s: ProjectSection) => s.images)?.images?.[0] as string | undefined) ??
                                        "/placeholder.png";
                                    const firstDesc = project.sections[0]?.description;

                                    return (
                                        <motion.article key={project.slug} variants={itemVariants} className="group">
                                            <Link href={`/projects/${project.slug}`}>
                                                <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#333333] hover:border-[#555555] transition-all duration-300 hover:scale-[1.02]">
                                                    <div className="relative aspect-video overflow-hidden">
                                                        <Image
                                                            src={firstImage}
                                                            alt={project.title}
                                                            fill
                                                            priority
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </div>

                                                    <div className="p-6">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1">
                                                                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
                                                                    {project.title}
                                                                </h3>

                                                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                                                                    <Calendar size={16} aria-hidden />
                                                                    <span>{project.period}</span>
                                                                </div>

                                                                {typeof firstDesc === "string" ? (
                                                                    <p className="text-gray-300 text-sm line-clamp-2">{firstDesc}</p>
                                                                ) : (
                                                                    <div className="text-gray-300 text-sm line-clamp-2">
                                                                        {firstDesc ?? "Description du projet"}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
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
                                className="text-center py-12"
                            >
                                <Search size={48} className="mx-auto mb-4 opacity-40 text-gray-400" aria-hidden />
                                <p className="text-lg text-white">Aucun projet trouvé</p>
                                <p className="text-sm text-gray-400">Essayez avec d'autres mots-clés</p>
                                {q && (
                                    <button
                                        onClick={() => setQ("")}
                                        className="mt-4 px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg hover:bg-[#1b1b1b] transition-colors text-white"
                                    >
                                        Effacer la recherche
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <Footer className="border-t border-[#ffffff14]" />
            </main>
        </div>
    );
}