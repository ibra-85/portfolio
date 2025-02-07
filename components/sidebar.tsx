"use client"
import { Reenie_Beanie } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { Download, Bookmark, Box, Home, LayoutGrid, Mail, Share2 } from "lucide-react"
import { useNavigation, type NavItem } from "@/hooks/useNavigation"
import { PiGithubLogoBold } from "react-icons/pi"
import { motion } from "framer-motion"

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
    { title: "Github", url: "/twitter", icon: PiGithubLogoBold },
]

export function Sidebar() {
    const { activeItem, handleNavigation } = useNavigation([...navItems, ...resourceItems])

    return (
        <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
            className="hidden lg:block fixed inset-y-0 left-0 z-50 w-64 bg-[#161616] text-[#858585] border-r border-white/5"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 p-4">
                    <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={40}
                        height={40}
                        quality={75}
                        className="rounded-[8px] w-10 h-10 object-cover"
                    />
                    <div className="flex flex-col">
                        <h1 className={`${reenieBeanie.className} text-white text-xl leading-tight`}>Neyu</h1>
                        <span className="text-sm leading-none">Développeur Web</span>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto">
                    <motion.ul
                        className="space-y-1 p-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, staggerChildren: 0.05 }}
                    >
                        {navItems.map((item) => (
                            <motion.li key={item.url} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <Link
                                    href={item.url}
                                    onClick={() => handleNavigation(item.url)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-[8px] hover:bg-white/5 hover:text-white transition-colors ${
                                        activeItem === item.url ? "bg-white/5 text-white border border-white/5" : ""
                                    }`}
                                >
                                    <item.icon size={18} />
                                    <span>{item.title}</span>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                    <div className="mt-4">
                        <h2 className="px-4 py-2 text-xs font-medium uppercase tracking-wider">Resources</h2>
                        <motion.ul
                            className="space-y-1 p-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, staggerChildren: 0.05 }}
                        >
                            {resourceItems.map((item) => (
                                <motion.li key={item.url} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                    <Link
                                        href={item.url}
                                        onClick={() => handleNavigation(item.url)}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors ${
                                            activeItem === item.url ? "bg-white/5 text-white border-white/5" : ""
                                        }`}
                                    >
                                        <item.icon size={18} />
                                        <span>{item.title}</span>
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </nav>
                <div className="p-4 space-y-2 border-t border-white/10">
                    <div className="bg-[#1A1A1A] rounded-xl p-4 relative border border-dashed border-[#333333] overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-[22px] font-medium mb-0.5 text-white tracking-tight">
                                {new Date().toLocaleDateString()}
                            </div>
                            <div className="text-sm text-[#858585]">Vendée, France</div>
                        </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-dashed border-[#333333] transition-colors rounded-xl px-4 py-3 text-white">
                        <Download size={18} />
                        <span className="text-[15px]">Download CV</span>
                    </button>
                </div>
            </div>
        </motion.aside>
    )
}

