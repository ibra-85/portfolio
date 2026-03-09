// Configuration du portfolio
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (process.env.NODE_ENV === "production" && !siteUrl) {
    throw new Error("Missing NEXT_PUBLIC_SITE_URL in production environment.");
}

export const siteConfig = {
    name: "Ibraguim",
    title: "Ibraguim — Développeur Web",
    description: "Portfolio de Ibraguim, développeur web spécialisé en React, Next.js, TypeScript et Laravel. Création de sites web modernes et applications performantes.",
    url: siteUrl ?? "https://ibraguim.fr",
    email: "ibraguimd@gmail.com",
    location: "Vendée, France",
    social: {
        github: "https://github.com/ibra-85",
        linkedin: "",
        twitter: "",
    },
} as const;