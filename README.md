# Portfolio - Next.js + TypeScript + Tailwind

Un portfolio moderne et minimaliste construit avec **Next.js**, **TypeScript** et **Tailwind CSS**.

## Fonctionnalités
- App Router (Next.js 13+)
- Pages projets avec navigation par slug
- Animations fluides (Framer Motion)
- Icones (lucide-react)
- Recherche et navigation (hooks personnalisés)
- Command Menu custom (`/`, `Ctrl/Cmd+K`, `Esc`, flèches, entrée)
- GitHub Contribution Graph intégré
- Filtres de projets par compétences

## Stack
- [Next.js](https://nextjs.org/) 16
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

## Demo
- [Voir le site en ligne](https://ibraguim.fr/)

## Variables d'environnement
- `NEXT_PUBLIC_SITE_URL`: URL publique (ex: https://ibraguim.fr)

## Scripts
- `npm run dev`: lance le serveur de développement
- `npm run build`: build de production
- `npm run start`: démarre le build
- `npm run lint`: vérifie ESLint
- `npm run typecheck`: vérifie TypeScript (`tsc --noEmit`)

## Qualité et CI
- Workflow CI GitHub Actions ajouté: lint + typecheck + audit prod + build sur `push`/`pull_request`.
- Optimisation images Next activée avec formats modernes (`avif`, `webp`).
- Metadata dédiée ajoutée pour la page `/projects` (OpenGraph/Twitter/canonical).
- Animations adaptées à `prefers-reduced-motion` sur la home.

## Correctifs récents
- Home "Mes Compétences": logos migrés vers une source stable (Devicon/jsDelivr) pour éviter les erreurs 429.
- SEO: validation explicite en production si `NEXT_PUBLIC_SITE_URL` est absent.
- Accessibilité:
- focus visible renforcé sur les boutons/liens interactifs
- attributs ARIA ajoutés sur la navigation mobile (état ouvert/fermé + contrôles)
- filtre de compétences rendu clavier/lecteur d'écran friendly (`aria-expanded`, `aria-controls`, `listbox`, `option`)
- SEO pages projets: métadonnées OG/Twitter robustes (canonical + image fallback).
- Build statique vérifié: /sitemap.xml, /robots.txt, /manifest.webmanifest générés.
- UX copy harmonisée en français sur la navigation et les actions principales (Rechercher, menu de commande).
- Relecture des textes pour limiter les risques d'incohérence d'encodage sur les pages principales.

## Roadmap
- Terminé:
- Stabilisation SEO/metadata, accessibilité, filtres projets, command menu, graph GitHub.
- Fiabilisation technique: `typecheck`, CI, build statique validé.
- Prochaines étapes:
- Déployer une preview finale.
- Lancer un contrôle Lighthouse final sur URL de preview.
- Déployer en production après validation.
