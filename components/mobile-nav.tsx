"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, LayoutGrid, Share2, Mail, Bookmark, Box, Download } from "lucide-react"
import { PiGithubLogoBold } from "react-icons/pi"
import { useNavigation, type NavItem } from "../hooks/useNavigation"
import { Reenie_Beanie } from "next/font/google"

const reenieBeanie = Reenie_Beanie({
    weight: "400",
    subsets: ["latin"],
})

const navItems: NavItem[] = [
    { title: "Home", url: "/", icon: Home },
    { title: "Projects", url: "/projects", icon: LayoutGrid },
    { title: "Services", url: "/services", icon: Share2 },
    { title: "Contact", url: "/contact", icon: Mail },
]

const resourceItems: NavItem[] = [
    { title: "Bookmarks", url: "/bookmarks", icon: Bookmark },
    { title: "Stack", url: "/stack", icon: Box },
    { title: "Github", url: "/github", icon: PiGithubLogoBold },
]

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const { activeItem, handleNavigation } = useNavigation([...navItems, ...resourceItems])

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <>
            <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#141414] border-b border-white/5">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-[8px] w-10 h-10 object-cover" />
                        <div className="flex flex-col">
                            <h1 className={`${reenieBeanie.className} text-white text-xl leading-tight`}>Neyu</h1>
                            <span className="text-sm leading-none text-[#858585]">Développeur Web</span>
                        </div>
                    </div>
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
                                                onClick={() => {
                                                    handleNavigation(item.url)
                                                    toggleMenu()
                                                }}
                                                className={`flex items-center gap-3 px-4 py-2 rounded-[8px] hover:bg-white/5 hover:text-white transition-colors ${
                                                    activeItem === item.url ? "bg-white/5 text-white" : "text-[#858585]"
                                                }`}
                                            >
                                                <item.icon size={18} />
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4">
                                    <h2 className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#858585]">Resources</h2>
                                    <ul className="space-y-2">
                                        {resourceItems.map((item) => (
                                            <li key={item.url}>
                                                <Link
                                                    href={item.url}
                                                    onClick={() => {
                                                        handleNavigation(item.url)
                                                        toggleMenu()
                                                    }}
                                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors ${
                                                        activeItem === item.url ? "bg-white/5 text-white" : "text-[#858585]"
                                                    }`}
                                                >
                                                    <item.icon size={18} />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </nav>
                            <div className="mt-auto pt-4 border-t border-white/10">
                                <button className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-dashed border-[#333333] transition-colors rounded-xl px-4 py-3 text-white">
                                    <Download size={18} />
                                    <span className="text-[15px]">Download CV</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}