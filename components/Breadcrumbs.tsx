"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";

export function Breadcrumbs() {
    const pathname = usePathname();
    
    // Ne pas afficher sur la page d'accueil
    if (pathname === "/") return null;

    const paths = pathname.split("/").filter(Boolean);
    
    const breadcrumbs = [
        { name: "Accueil", href: "/", icon: Home },
        ...paths.map((path, index) => {
            const href = "/" + paths.slice(0, index + 1).join("/");
            const name = path
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            return { name, href };
        }),
    ];

    return (
        <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
                {breadcrumbs.map((crumb, index) => (
                    <li key={crumb.href} className="flex items-center gap-2">
                        {index > 0 && <ChevronRight size={14} className="text-gray-600" aria-hidden="true" />}
                        {index === breadcrumbs.length - 1 ? (
                            <span className="text-white font-medium" aria-current="page">
                                {index === 0 && <crumb.icon size={16} className="inline mr-1" />}
                                {crumb.name}
                            </span>
                        ) : (
                            <Link
                                href={crumb.href}
                                prefetch={true}
                                className="hover:text-white transition-colors flex items-center gap-1"
                            >
                                {index === 0 && <crumb.icon size={16} />}
                                {crumb.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

