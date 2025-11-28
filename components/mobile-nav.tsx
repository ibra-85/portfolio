"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, LayoutGrid, Download } from "lucide-react"
import { usePathname } from "next/navigation" // ✅ Import ajouté
import { Reenie_Beanie } from "next/font/google"

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
    const pathname = usePathname() // ✅ Utilisation de usePathname pour la navigation active

    const toggleMenu = () => setIsOpen(!isOpen)

    // ✅ Fonction pour vérifier si un lien est actif
    const isActiveLink = (url: string) => {
        if (url === "/") {
            return pathname === "/"
        }
        return pathname.startsWith(url)
    }

    return (
        <>
            <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#141414] border-b border-white/5">
                <div className="flex items-center justify-between p-4">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-[8px] w-10 h-10 object-cover" />
                        <div className="flex flex-col">
                            <h1 className={`${reenieBeanie.className} text-white text-xl leading-tight`}>Ibraguim</h1>
                            <span className="text-sm leading-none text-[#858585]">Développeur Web</span>
                        </div>
                    </Link>
                    <button onClick={toggleMenu} className="p-2">
                        {isOpen ? <X className="text-white/75" /> : <Menu className="text-white/75" />}
                    </button>
                </div>
            </nav>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="lg:hidden fixed inset-0 z-40 bg-[#141414] pt-20 overflow-y-auto"
                    >
                        <div className="flex flex-col h-full p-4">
                            <nav className="flex-1">
                                <ul className="space-y-2">
                                    {navItems.map((item) => (
                                        <li key={item.url}>
                                            <Link
                                                href={item.url}
                                                prefetch={true}
                                                onClick={toggleMenu} // ✅ Fermer le menu au clic
                                                className={`flex items-center gap-3 px-4 py-2 rounded-[8px] hover:bg-white/5 hover:text-white transition-colors ${
                                                    isActiveLink(item.url) 
                                                        ? "bg-white/5 text-white border border-white/5" 
                                                        : "text-[#858585]"
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
                            
                                <a href="/cv.pdf" download="cv-ibraguim" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-dashed border-[#333333] transition-colors rounded-xl px-4 py-3 text-white text-[15px]"><Download size={18} /> Mon CV</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}