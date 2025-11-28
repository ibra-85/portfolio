// Configuration du portfolio
export const siteConfig = {
    name: "Ibraguim",
    title: "Ibraguim — Développeur Web",
    description: "Portfolio de Ibraguim, développeur web spécialisé en React, Next.js, TypeScript et Laravel. Création de sites web modernes et applications performantes.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ibraguim.fr",
    email: "ibraguimd@gmail.com",
    location: "Vendée, France",
    social: {
        github: "",
        linkedin: "",
        twitter: "",
    },
} as const;

