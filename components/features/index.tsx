"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface ProjectFeature {
    title: string;
    category: string;
    period: string;
    image: string;
    link: string;
}

const projects: ProjectFeature[] = [
    { title: "PDM Dashboard", category: "Dashboard", period: "2024-2025", image: "/projects/1.png", link: "/projects/pdm-dashboard" },
    { title: "EMS Dashboard", category: "Dashboard", period: "2025", image: "/projects/2.png", link: "/projects/ems-dashboard" },
];

const formattedProjects = projects.map((p) => ({
    ...p,
    link: `/projects/${p.title.toLowerCase().replace(/\s+/g, "-")}`,
}));

export function FeaturedWorks() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // met à jour la visibilité des flèches
    const checkScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    checkScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", checkScroll);
        const id = setTimeout(checkScroll, 0);
        return () => {
            clearTimeout(id);
            el.removeEventListener("scroll", onScroll as any);
            window.removeEventListener("resize", checkScroll);
        };
    }, [checkScroll]);

    // largeur d’un “pas” (carte + gap)
    const getStride = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return 0;
        const children = el.children;
        if (children.length < 2) return Math.floor(el.clientWidth * 0.9);
        const a = children[0] as HTMLElement;
        const b = children[1] as HTMLElement;
        const stride = b.getBoundingClientRect().left - a.getBoundingClientRect().left;
        return stride > 0 ? stride : Math.floor(el.clientWidth * 0.9);
    }, []);

    // défilement via les flèches (uniquement)
    const scroll = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = getStride() * (direction === "left" ? -1 : 1);
        el.scrollBy({ left: amount, behavior: "smooth" });
    };

    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            scroll("left");
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            scroll("right");
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full relative overflow-hidden border-y border-[#292929]"
            aria-label="Projets présentés"
        >
            {/* Background Pattern */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-5 filter invert
                   [-webkit-mask:radial-gradient(78%_88%_at_50%_50%,_rgba(0,0,0,0)_0%,_rgba(0,0,0,1)_100%)_add]
                   [mask:radial-gradient(78%_88%_at_50%_50%,_rgba(0,0,0,0)_0%,_rgba(0,0,0,1)_100%)_add]"
            >
                <div
                    style={{
                        position: "absolute",
                        borderRadius: "inherit",
                        inset: 0,
                        backgroundRepeat: "repeat",
                        backgroundPosition: "left top",
                        backgroundSize: "31.2px",
                        backgroundImage: 'url("/dots.svg")',
                        border: 0,
                    }}
                />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 py-16 lg:py-24">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-lg text-white/60">Mes projets récents</h2>
                    <motion.div initial="initial" whileHover="hover" className="inline-flex items-center gap-2">
                        <Link href="/projects" className="flex text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">
                            Voir
                            <motion.span
                                variants={{ initial: { rotate: 0 }, hover: { rotate: 45 } }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                <ArrowUpRight size={20} className="text-white ml-1" />
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Carrousel (pas de gestion de scroll personnalisée) */}
                    <div
                        ref={scrollRef}
                        role="region"
                        aria-label="Carrousel de projets"
                        tabIndex={0}
                        onKeyDown={onKeyDown}
                        className="
              flex gap-6 items-center
              overflow-x-auto scrollbar-hide scroll-smooth
              snap-x snap-mandatory
              -mx-2 px-2
            "
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        {formattedProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className="flex-shrink-0 w-[calc(100%-2rem)] max-w-[600px] snap-start"
                            >
                                <Link
                                    href={project.link}
                                    className="group block h-full bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#303030] hover:border-[#404040] transition-all"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            fill
                                            priority={index < 2}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-medium text-white mb-1">{project.title}</h3>
                                                <div className="flex items-center gap-3 text-sm text-[rgba(255,255,255,0.5)]">
                                                    <span>{project.category}</span>
                                                    <span className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.5)]" />
                                                    <span>{project.period}</span>
                                                </div>
                                            </div>
                                            <div className="mt-1 opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                                <ArrowUpRight className="text-[rgba(255,255,255,0.6)]" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Flèches */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center backdrop-blur-sm transition-opacity hover:bg-black/30"
                            aria-label="Précédent"
                        >
                            <FaChevronLeft className="text-white" />
                        </button>
                    )}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center backdrop-blur-sm transition-opacity hover:bg-black/30"
                            aria-label="Suivant"
                        >
                            <FaChevronRight className="text-white" />
                        </button>
                    )}
                </div>
            </div>
        </motion.section>
    );
}
