import { siteConfig } from "@/lib/config";

type DayCell = {
    date: string;
    count: number;
    level: number;
};

const DAYS = 364;
const MONTH_LABELS = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"];
const LEVELS = ["bg-white/8", "bg-zinc-500/25", "bg-zinc-300/45", "bg-zinc-200/65", "bg-white/75"];

function parseGithubUsername(raw: string) {
    if (!raw) return "";
    const trimmed = raw.trim();
    if (!trimmed) return "";
    if (!trimmed.includes("github.com")) return trimmed.replace("@", "");
    try {
        const url = new URL(trimmed);
        return url.pathname.replaceAll("/", "");
    } catch {
        return "";
    }
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function toWeeks(days: DayCell[]) {
    const out: DayCell[][] = [];
    for (let i = 0; i < days.length; i += 7) out.push(days.slice(i, i + 7));
    return out;
}

function sortByDateAsc(a: DayCell, b: DayCell) {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
}

function clampLevel(level: number) {
    if (Number.isNaN(level)) return 0;
    return Math.max(0, Math.min(4, level));
}

async function fetchContributions(username: string) {
    const now = new Date();
    const from = new Date(now);
    from.setDate(from.getDate() - DAYS);

    const fromStr = from.toISOString().slice(0, 10);
    const toStr = now.toISOString().slice(0, 10);

    const url = `https://github.com/users/${encodeURIComponent(username)}/contributions?from=${fromStr}&to=${toStr}`;
    const response = await fetch(url, {
        headers: { "User-Agent": "portfolio-app" },
        cache: "force-cache",
    });

    if (!response.ok) throw new Error("GitHub response error");

    const svg = await response.text();
    const dayCellRegex = /<td\b[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g;
    const days: DayCell[] = [];
    const tooltipCountById = new Map<string, number>();
    let tooltipMatch: RegExpExecArray | null;

    while ((tooltipMatch = tooltipRegex.exec(svg)) !== null) {
        const id = tooltipMatch[1];
        const text = tooltipMatch[2] ?? "";
        const countMatch = /(\d+)\s+contribution/i.exec(text);
        tooltipCountById.set(id, Number(countMatch?.[1] ?? 0));
    }

    let cellMatch: RegExpExecArray | null;
    while ((cellMatch = dayCellRegex.exec(svg)) !== null) {
        const cell = cellMatch[0];
        const dateMatch = /data-date="([^"]+)"/.exec(cell);
        if (!dateMatch) continue;
        const levelMatch = /data-level="(\d+)"/.exec(cell);
        const idMatch = /id="([^"]+)"/.exec(cell);
        const countFromTooltip = idMatch ? tooltipCountById.get(idMatch[1]) : 0;

        days.push({
            date: dateMatch[1],
            count: Number(countFromTooltip ?? 0),
            level: clampLevel(Number(levelMatch?.[1] ?? 0)),
        });
    }
    return days.sort(sortByDateAsc).slice(-DAYS - 1);
}

export async function GithubContributionGraph() {
    const username = parseGithubUsername(siteConfig.social.github);
    let cells: DayCell[] = [];
    let error = "";

    if (!username) {
        error = "Ajoute ton lien GitHub dans siteConfig.social.github pour charger les contributions.";
    } else {
        try {
            cells = await fetchContributions(username);
            if (!cells.length) error = "Aucune contribution trouvee.";
        } catch {
            error = "Impossible de charger les contributions GitHub.";
        }
    }

    const weeks = toWeeks(cells);
    const monthHeaders: Array<{ label: string; weekIndex: number }> = [];

    weeks.forEach((week, weekIndex) => {
        const first = week[0];
        if (!first) return;
        const month = new Date(first.date).getMonth();
        const label = MONTH_LABELS[month];
        const last = monthHeaders[monthHeaders.length - 1];
        if (!last || last.label !== label) monthHeaders.push({ label, weekIndex });
    });

    const compactMonthHeaders = monthHeaders.filter((header, index) => {
        if (index === 0) return true;
        const previous = monthHeaders[index - 1];
        return header.weekIndex - previous.weekIndex >= 3;
    });

    return (
        <section className="w-full border-y border-[#292929] bg-[#121212]">
            <div className="mx-auto w-full max-w-[1400px] px-4 py-14 lg:py-20">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg text-white/90">GitHub Contributions</h2>
                        <p className="text-sm text-white/50">Activite sur les 12 derniers mois</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <span>Moins</span>
                        {LEVELS.map((color) => (
                            <span key={color} className={`h-3 w-3 rounded-[3px] ${color}`} />
                        ))}
                        <span>Plus</span>
                    </div>
                </div>

                {error && <p className="mb-4 text-sm text-amber-300">{error}</p>}

                {cells.length > 0 && (
                    <div className="thin-scrollbar mx-auto w-fit max-w-full overflow-x-auto rounded-xl border border-[#2a2a2a] bg-[#161616] p-4">
                        <div className="w-max min-w-max">
                            <div className="relative mb-2 h-4">
                                {compactMonthHeaders.map((m) => (
                                    <span
                                        key={`${m.label}-${m.weekIndex}`}
                                        className="absolute text-xs text-white/45"
                                        style={{ left: `${m.weekIndex * 16}px` }}
                                    >
                                        {m.label}
                                    </span>
                                ))}
                            </div>
                            <div className="inline-flex gap-1">
                                {weeks.map((week, weekIdx) => (
                                    <div key={weekIdx} className="flex flex-col gap-1">
                                        {week.map((cell) => (
                                            <span
                                                key={cell.date}
                                                title={`${cell.count} contribution(s) le ${formatDate(cell.date)}`}
                                                className={`h-3 w-3 rounded-[3px] ${LEVELS[cell.level]} ring-1 ring-transparent`}
                                                aria-label={`${cell.count} contribution(s) le ${formatDate(cell.date)}`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
