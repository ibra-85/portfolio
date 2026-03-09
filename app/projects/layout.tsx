import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
    title: "Projets",
    description: "Découvrez mes projets web récents réalisés avec React, Next.js, TypeScript et Laravel.",
    alternates: {
        canonical: "/projects",
    },
    openGraph: {
        type: "website",
        url: "/projects",
        title: "Projets - Ibraguim",
        description: "Découvrez mes projets web récents réalisés avec React, Next.js, TypeScript et Laravel.",
        images: [
            {
                url: `${siteConfig.url}/logo.jpg`,
                width: 1200,
                height: 630,
                alt: "Projets de Ibraguim",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Projets - Ibraguim",
        description: "Découvrez mes projets web récents réalisés avec React, Next.js, TypeScript et Laravel.",
        images: [`${siteConfig.url}/logo.jpg`],
    },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
