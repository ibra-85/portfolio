import { ReactNode } from 'react';

export interface ProjectSection {
    title?: string;
    description: ReactNode;
    images?: string[]; // Optionnel, car toutes les sections n'ont pas d'images
}

export interface Project {
    title: string;
    company?: string; // Optionnel
    period: string;
    sections: ProjectSection[]; // Liste des sections
}
