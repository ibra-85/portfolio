import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Ibraguim — Portfolio",
        short_name: "Ibraguim",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#141414",
        theme_color: "#141414",
        description: "Portfolio de Ibraguim, développeur web.",
    };
}
