import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteConfig.title,
        short_name: siteConfig.name,
        description: siteConfig.description,
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#141414",
        theme_color: "#141414",
        orientation: "portrait-primary",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/logo.jpg",
                sizes: "192x192",
                type: "image/jpeg",
                purpose: "any maskable",
            },
            {
                src: "/logo.jpg",
                sizes: "512x512",
                type: "image/jpeg",
                purpose: "any maskable",
            },
        ],
        categories: ["portfolio", "developer", "web"],
    };
}
