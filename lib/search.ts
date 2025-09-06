import type { Project } from "@/data/projects";


export const norm = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");


export const tokenize = (s: string) => norm(s).split(/[^a-z0-9]+/).filter(Boolean);


export function levenshtein(a: string, b: string): number {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({ length: m + 1 }, (_, i) => Array(n + 1).fill(0) as number[]);
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }
    return dp[m][n];
}


export function includesFuzzyNormalized(hayNorm: string, token: string) {
    if (!token) return true;
    const q = norm(token);
    if (hayNorm.includes(q)) return true;
    if (q.length < 4) return false;
    return hayNorm.split(/[^a-z0-9]+/).some((word) => levenshtein(word, q) <= 1);
}


export function searchableTextRaw(p: Project): string {
    return [
        p.title,
        p.period,
        ...p.sections.map((s) =>
            [s.title ?? "", typeof s.description === "string" ? s.description : ""].join(" ")
        ),
    ].join(" ");
}


export function toSearchable(p: Project): string {
    return norm(searchableTextRaw(p));
}


export function buildProjectIndex(projects: Project[]) {
    const index: Record<string, string> = {};
    for (const p of projects) index[p.slug] = toSearchable(p);
    return index;
}


export function filterProjects(projects: Project[], query: string): Project[] {
    const tokens = tokenize(query);
    if (!tokens.length) return projects;
    return projects.filter((p) => {
        const hay = toSearchable(p); // normalisé ici
        return tokens.every((tok) => includesFuzzyNormalized(hay, tok));
    });
}


export function filterProjectsWithIndex(
    projects: Project[],
    index: Record<string, string>,
    query: string
): Project[] {
    const tokens = tokenize(query);
    if (!tokens.length) return projects;
    return projects.filter((p) =>
        tokens.every((tok) => includesFuzzyNormalized(index[p.slug], tok))
    );
}
