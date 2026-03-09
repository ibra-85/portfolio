# Portfolio - Next.js + TypeScript + Tailwind

Un portfolio moderne et minimaliste construit avec **Next.js**, **TypeScript** et **Tailwind CSS**.

## Fonctionnalites
- App Router (Next.js 13+)
- Pages projets avec navigation par slug
- Animations fluides (Framer Motion)
- Icones (lucide-react)
- Recherche et navigation (hooks personnalises)
- Command Menu custom (`/`, `Ctrl/Cmd+K`, `Esc`, fleches, entree)
- GitHub Contribution Graph integre
- Filtres de projets par competences

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

## Correctifs recents
- Home "Mes Competences": logos migres vers une source stable (Devicon/jsDelivr) pour eviter les erreurs 429.
- SEO: validation explicite en production si `NEXT_PUBLIC_SITE_URL` est absent.
- Accessibilite:
- focus visible renforce sur les boutons/liens interactifs
- attributs ARIA ajoutes sur la navigation mobile (etat ouvert/ferme + controles)
- filtre de competences rendu clavier/lecteur d'ecran friendly (`aria-expanded`, `aria-controls`, `listbox`, `option`)
