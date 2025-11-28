import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Image, } from "lucide-react";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { BackButton } from "@/components/BackButton";
import Footer from "@/components/Footer";
import ZoomableImage from "@/components/ZoomableImage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollToTop } from "@/components/ScrollToTop";

import { getProjectBySlug, getProjectSlugs } from "@/data/projects";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/lib/config";

export function generateStaticParams() {
    return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Projet introuvable" };

    const description =
        typeof project.sections[0]?.description === "string"
            ? project.sections[0].description
            : `Découvrez ${project.title}, un projet développé en ${project.period}.`;

    const projectUrl = `${siteConfig.url}/projects/${slug}`;
    
    return {
        title: `${project.title} – Portfolio`,
        description,
        alternates: {
            canonical: projectUrl,
        },
        openGraph: {
            title: `${project.title} – Portfolio`,
            description,
            url: projectUrl,
            images: project.sections.find((s) => s.images)?.images?.map((u) => ({ url: u })) ?? [],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} – Portfolio`,
            description,
            images: project.sections.find((s) => s.images)?.images?.[0] ? [project.sections.find((s) => s.images)!.images![0]] : [],
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
            <StructuredData type="website" projects={[project]} />
            <Sidebar />
            <MobileNav />

            <main id="main-content" className="flex flex-col items-center flex-1 relative ml-0 lg:ml-64 max-lg:mt-24">
                <ScrollToTop />
                <div className="w-full max-w-3xl p-6 xl:border-x border-dashed border-[#ffffff14]">
                    <Breadcrumbs />
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
                                <div className="mt-4">
                                    {section.images.length === 1 ? (
                                        <figure className="rounded-xl overflow-hidden">
                                            <ZoomableImage
                                                src={section.images[0]}
                                                images={section.images}
                                                startIndex={0}
                                                alt={section.title ? `Image - ${section.title}` : "Image du projet"}
                                                width={1920}
                                                height={1080}
                                                className="object-cover"
                                            />
                                        </figure>
                                    ) : (
                                        <figure className="relative rounded-xl overflow-hidden group">
                                            <ZoomableImage
                                                src={section.images[0]}
                                                images={section.images}
                                                startIndex={0}
                                                alt={section.title ? `Image - ${section.title}` : "Image du projet"}
                                                width={1920}
                                                height={1080}
                                                className="object-cover"
                                            />
                                            <div className="absolute top-10 right-4 bg-black/70 backdrop-blur-sm text-gray-300 px-2 py-1 rounded-[8px] text-sm font-medium flex items-center gap-1.5 pointer-events-none border border-white/10 shadow-lg">
                                                <Image size={14} className="text-gray-400" aria-hidden="true" />
                                                <span>{section.images.length}</span>
                                            </div>
                                        </figure>
                                    )}
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
