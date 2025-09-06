"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
    const firstImage = project.sections.find((s) => s.images)?.images?.[0] ?? "/placeholder.png";
    const firstDesc = project.sections[0]?.description;

    return (
        <Link href={`/projects/${project.slug}`}>
            <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#333333] hover:border-[#555555] transition-all duration-300 hover:scale-[1.02] group">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={firstImage}
                        alt={project.title}
                        fill
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
    );
}