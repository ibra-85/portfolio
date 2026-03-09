"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, LayoutGrid, Search, Download } from "lucide-react"
import { usePathname } from "next/navigation"
import { Reenie_Beanie } from "next/font/google"
import { openCommandMenu } from "@/components/CommandMenu"

const reenieBeanie = Reenie_Beanie({
    weight: "400",
    subsets: ["latin"],
})

const navItems = [
    { title: "Accueil", url: "/", icon: Home },
    { title: "Projets", url: "/projects", icon: LayoutGrid },
]

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const toggleMenu = () => setIsOpen(!isOpen)

    const isActiveLink = (url: string) => {
        if (url === "/") {
            return pathname === "/"
        }
        return pathname.startsWith(url)
    }

    return (
        <>
            <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#141414]">
                <div className="flex items-center gap-3 px-4 py-3">
                    <Link href="/" className="flex min-w-0 items-center gap-3">
                        <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-[8px] w-10 h-10 object-cover" />
                        <div className="hidden min-[380px]:flex flex-col">
                            <h1 className={`${reenieBeanie.className} text-white text-xl leading-tight`}>Ibraguim</h1>
                            <span className="text-sm leading-none text-[#858585]">Développeur Web</span>
                        </div>
                    </Link>
                    <div className="ml-auto flex min-w-0 flex-1 items-center gap-2">
                        <button
                            type="button"
                            onClick={openCommandMenu}
                            className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-[8px] border border-[#333333] bg-[#1A1A1A] px-3 text-sm text-white/80 transition hover:border-[#555555] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                            aria-label="Ouvrir la recherche"
                        >
                            <Search size={16} className="shrink-0" />
                            <span className="truncate">Rechercher</span>
                        </button>
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="shrink-0 rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                            aria-label={isOpen ? "Fermer le menu mobile" : "Ouvrir le menu mobile"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu-panel"
                        >
                            {isOpen ? <X className="text-white/75" /> : <Menu className="text-white/75" />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        id="mobile-menu-panel"
                        className="lg:hidden fixed inset-0 z-40 bg-[#141414] pt-20 overflow-y-auto"
                    >
                        <div className="flex flex-col h-full p-4">
                            <nav className="flex-1">
                                <ul className="space-y-2">
                                    {navItems.map((item) => (
                                        <li key={item.url}>
                                            <Link
                                                href={item.url}
                                                prefetch
                                                onClick={toggleMenu}
                                                className={`flex items-center gap-3 rounded-[8px] px-4 py-2 ${
                                                    isActiveLink(item.url)
                                                        ? "border border-white/10 bg-white/8 text-white"
                                                        : "border border-transparent text-[#858585] hover:border-white/10 hover:bg-white/6 hover:text-white"
                                                }`}
                                            >
                                                <item.icon size={18} />
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="mt-auto pt-4 border-t border-white/10">
                                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-dashed border-[#333333] transition-colors rounded-xl px-4 py-3 text-white text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"><Download size={18} /> Mon CV</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
