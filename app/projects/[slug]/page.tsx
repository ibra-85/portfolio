import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { BackButton } from "@/components/BackButton";
import Footer from "@/components/Footer";
import ZoomableImage from "@/components/ZoomableImage";

import { getProjectBySlug, getProjectSlugs } from "@/data/projects";

export function generateStaticParams() {
    return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Projet introuvable" };

    return {
        title: `${project.title} – Portfolio`,
        description: `${project.title} (${project.period})`,
        openGraph: {
            title: `${project.title} – Portfolio`,
            description: `${project.title} (${project.period})`,
            images: project.sections.find((s) => s.images)?.images?.map((u) => ({ url: u })) ?? [],
            type: "article",
        },
    };
}

export default async function ProjectPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return notFound();

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#141414] text-white">
            <Sidebar />
            <MobileNav />

            <main className="flex flex-col items-center flex-1 relative ml-0 lg:ml-64 max-lg:mt-24">
                <div className="w-full max-w-3xl p-6 xl:border-x border-dashed border-[#ffffff14]">
                    <div className="flex flex-col gap-6">
                        <BackButton />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold">{project.title}</h1>
                            <p className="flex items-center gap-2 text-sm text-neutral-400">
                                <Calendar size={18} aria-hidden />
                                <span>{project.period}</span>
                            </p>
                        </div>
                    </div>

                    {project.sections.map((section, sIdx) => (
                        <section key={section.id ?? section.title ?? `section-${sIdx}`} className="mt-6">
                            {section.title && (
                                <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
                            )}

                            {typeof section.description === "string" ? (
                                <p className="text-neutral-200">{section.description}</p>
                            ) : (
                                <div>{section.description}</div>
                            )}

                            {section.images?.length ? (
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    {section.images.map((src, i) => (
                                        <figure key={src} className="rounded-xl overflow-hidden">
                                            <ZoomableImage
                                                src={src}
                                                images={section.images}
                                                startIndex={i}
                                                alt={section.title ? `Image - ${section.title}` : "Image du projet"}
                                                width={1920}
                                                height={1080}
                                                className="object-cover"
                                            />
                                        </figure>
                                    ))}
                                </div>
                            ) : null}
                        </section>
                    ))}
                </div>

                <Footer className="border-t border-[#ffffff14]" />
            </main>
        </div>
    );
}
