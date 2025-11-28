import type { Project } from "@/data/projects";
import { siteConfig } from "@/lib/config";

interface StructuredDataProps {
    type?: "website" | "person";
    projects?: Project[];
}

export function StructuredData({ type = "website", projects }: StructuredDataProps) {
    const baseUrl = siteConfig.url;
    
    // Construire le tableau sameAs avec les réseaux sociaux disponibles
    const sameAs = Object.values(siteConfig.social).filter(Boolean);

    if (type === "person") {
        const personSchema = {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ibraguim",
            jobTitle: "Développeur Web",
            description: "Développeur web spécialisé en React, Next.js, TypeScript et Laravel",
            url: baseUrl,
            email: siteConfig.email,
            address: {
                "@type": "PostalAddress",
                addressLocality: "Vendée",
                addressCountry: "FR",
            },
            sameAs,
            knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Laravel",
                "JavaScript",
                "HTML",
                "CSS",
                "Tailwind CSS",
            ],
        };

        return (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
        );
    }

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Ibraguim — Portfolio",
        description: "Portfolio de Ibraguim, développeur web spécialisé en React, Next.js, TypeScript et Laravel",
        url: baseUrl,
        author: {
            "@type": "Person",
            name: "Ibraguim",
        },
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/projects?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    const projectSchemas = projects?.map((project) => ({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description:
            typeof project.sections[0]?.description === "string"
                ? project.sections[0].description
                : `Projet ${project.title}`,
        dateCreated: project.period,
        url: `${baseUrl}/projects/${project.slug}`,
        creator: {
            "@type": "Person",
            name: "Ibraguim",
        },
    }));

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            {projectSchemas?.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
}

