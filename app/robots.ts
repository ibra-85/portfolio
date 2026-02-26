import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    const base = siteConfig.url;
    return {
        rules: [{ userAgent: "*", allow: "/" }],
        sitemap: `${base}/sitemap.xml`,
    };
}
