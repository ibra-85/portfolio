import type { MetadataRoute } from "next";
import { getProjects } from "@/data/projects";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = siteConfig.url;
    const items = getProjects().map((p) => ({
        url: `${base}/projects/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [{ url: `${base}/`, priority: 1 }, { url: `${base}/projects`, priority: 0.9 }, ...items];
}
