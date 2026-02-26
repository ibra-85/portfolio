import type { ReactNode } from "react";
import Image from "next/image";
import { slugify } from "@/lib/utils";

export type ProjectSection = {
    id?: string;
    title?: string;
    description?: string | ReactNode;
    images?: string[];
};

export type Project = {
    slug: string;
    title: string;
    period: string;
    skills: string[];
    sections: ProjectSection[];
};

const _projects: Omit<Project, "slug">[] = [
    {
        title: "PDM Dashboard",
        period: "2024-2025",
        skills: ["Laravel", "Inertia", "React", "TypeScript", "Tailwind", "Spatie"],
        sections: [
            {
                description:
                    "Application Dashboard CRUD développée pour un serveur FiveM RolePlay, permettant une gestion avancée des employés, des ventes et des finances.",
            },
            {
                title: "Contexte",
                description: (
                    <div className="text-gray-300 text-md">
                        <p>
                            Le{" "}
                            <span className="text-orange-300 font-semibold underline underline-offset-4">
                PDM Dashboard
              </span>{" "}
                            est une application destinée au concessionnaire et gérants du PDM sur un serveur
                            FiveM RP. Il offre une interface intuitive pour :
                        </p>
                        <br />
                        <ul className="list-disc pl-5 ">
                            <li>Suivre et gérer les employés 🔧</li>
                            <li>Enregistrer les ventes et calculer les bénéfices 💰</li>
                            <li>Automatiser le suivi des paies et des performances 📊</li>
                            <li>Gérer les accès et les permissions 🔒</li>
                        </ul>
                    </div>
                ),
                images: ["/projects/1.png"],
            },
            {
                title: "Stack Technologique",
                description: (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/laravel.png" alt="Laravel" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">Laravel</span>
                        </div>
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/inertia.png" alt="Inertia" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">Inertia</span>
                        </div>
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/react.png" alt="React" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">React</span>
                        </div>
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/typescript.png" alt="TypeScript" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">TypeScript</span>
                        </div>
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/tailwind.png" alt="Tailwind" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">Tailwind (shadcn)</span>
                        </div>
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/spatie.png" alt="Spatie Permission" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">Spatie Permission</span>
                        </div>
                    </div>
                ),
            },
        ],
    },
    {
        title: "EMS Dashboard",
        period: "2025",
        skills: ["Laravel", "Inertia", "React", "TypeScript", "Tailwind", "Spatie"],
        sections: [
            {
                description:
                    "Application Dashboard CRUD développée pour un serveur FiveM RolePlay, permettant une gestion avancée des employés, des réanimations et des finances.",
            },
            {
                title: "Contexte",
                description: (
                    <div className="text-gray-300 text-md">
                        <p>
                            Le{" "}
                            <span className="text-orange-300 font-semibold underline underline-offset-4">
                EMS Dashboard
              </span>{" "}
                            est une application web conçue pour l’hôpital et les gérants des EMS sur un serveur
                            FiveM Roleplay. Pensée pour optimiser la gestion quotidienne dans un environnement RP
                            dynamique, elle offre une interface intuitive permettant de :
                        </p>
                        <br />
                        <ul className="list-disc pl-5">
                            <li>
                                Superviser et gérer les employés 🔧, avec suivi des interventions et attribution aux
                                dossiers de réanimation.
                            </li>
                            <li>
                                Enregistrer les réanimations 🚑, incluant la capture d’écran des patients, suivi
                                chirurgical, et gestion des prises en charge par l’État.
                            </li>
                            <li>
                                Automatiser le suivi des paies et des performances individuelles 📊, avec un système
                                de suivi détaillé.
                            </li>
                            <li>
                                Gérer les absences ⏳ du personnel, avec demandes, approbations, et catégorisations
                                (congés, maladie, formation, etc.).
                            </li>
                            <li>Gérer les consultations 🩺, formations du personnel, et services médicaux.</li>
                            <li>
                                Contrôler les accès et permissions 🔒 via un système basé sur les rôles et grades.
                            </li>
                            <li>Gérer les images médicales 📸 avec stockage sécurisé et compression optimisée.</li>
                            <li>
                                Faciliter les opérations par lot 📋 (ex. suppression multiple) et fournir un
                                filtrage avancé.
                            </li>
                        </ul>
                        <br />
                        <p>
                            Cette solution améliore la coordination, la productivité et la sécurité des opérations
                            médicales RP. Avec une gestion des périodes d’absence validée et une expérience
                            utilisateur fluide, elle répond aux besoins complexes d’une équipe en mouvement.
                        </p>
                    </div>
                ),
                images: ["/projects/2.png", "/projects/2-1.png", "/projects/2-2.png"],
            },
            {
                title: "Stack Technologique",
                description: (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/laravel.png" alt="Laravel" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">Laravel</span>
                        </div>
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/inertia.png" alt="Inertia" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">Inertia</span>
                        </div>
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/react.png" alt="React" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">React</span>
                        </div>
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/typescript.png" alt="TypeScript" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">TypeScript</span>
                        </div>
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/tailwind.png" alt="Tailwind" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">Tailwind (shadcn)</span>
                        </div>
                        <div className="flex items-center transition duration-700 p-4 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] rounded-[8px] shadow-lg">
                            <Image src="/logo/spatie.png" alt="Spatie Permission" className="w-10 h-10 mr-4 rounded-[8px]" width={100} height={100} />
                            <span className="text-lg font-semibold text-white">Spatie Permission</span>
                        </div>
                    </div>
                ),
            },
        ],
    },
];

export const projects: Project[] = _projects.map((p) => ({ ...p, slug: slugify(p.title) }));

export function getProjects() {
    return projects;
}
export function getProjectBySlug(slug: string) {
    return projects.find((p) => p.slug === slug);
}
export function getProjectSlugs() {
    return projects.map((p) => p.slug);
}
