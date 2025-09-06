import { norm } from "@/lib/search";
import type { Project } from "@/data/projects";

export function searchableTextRaw(p: Project): string {
    return [
        p.title,
        p.period,
        ...p.sections.map((s) => [s.title ?? "", typeof s.description === "string" ? s.description : ""].join(" ")),
    ].join(" ");
}

export function buildProjectIndex(projects: Project[]) {
    const index: Record<string, string> = {};
    for (const p of projects) {
        index[p.slug] = norm(searchableTextRaw(p));
    }
    return index;
}
