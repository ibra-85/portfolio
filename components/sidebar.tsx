"use client"
import { Caveat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Download, Home, LayoutGrid } from "lucide-react"
import { motion } from "framer-motion"

const caveat = Caveat({
    weight: "400",
    subsets: ["latin"],
})

const navItems = [
    { title: "Accueil", url: "/", icon: Home },
    { title: "Projets", url: "/projects", icon: LayoutGrid },
]

export function Sidebar() {
    const pathname = usePathname();

    return (
        <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
            className="hidden lg:block fixed inset-y-0 left-0 z-50 w-64 bg-[#161616] text-[#858585] border-r border-[#292929]"
        >
            <div className="flex flex-col h-full">
                <Link href="/" className="flex items-center gap-3 p-4">
                    <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={40}
                        height={40}
                        quality={75}
                        className="rounded-[8px] w-10 h-10 object-cover"
                    />
                    <div className="flex flex-col">
                        <h1 className={`${caveat.className} text-white text-2xl leading-tight`}>Ibraguim</h1>
                        <span className="text-sm leading-none">Développeur Web</span>
                    </div>
                </Link>
                <nav className="flex-1 overflow-y-auto">
                    <motion.ul
                        className="space-y-1 p-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, staggerChildren: 0.05 }}
                    >
                        {navItems.map((item) => (
                            <motion.li key={item.url} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <Link href={item.url}>
                                    <div
                                        className={`flex items-center gap-3 px-4 py-2 rounded-[8px] hover:bg-white/5 hover:text-white transition-colors ${
                                            pathname === item.url ? "bg-white/5 text-white border border-white/5" : ""
                                        }`}
                                    >
                                        <item.icon size={18} />
                                        <span>{item.title}</span>
                                    </div>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </nav>
                <div className="p-4 space-y-2 border-t border-[#292929]">
                    <div className="bg-[#1A1A1A] rounded-xl p-4 relative border border-dashed border-[#333333] overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-[22px] font-medium mb-0.5 text-white tracking-tight">
                                {new Date().toLocaleDateString()}
                            </div>
                            <div className="text-sm text-[#858585]">Vendée, France</div>
                        </div>
                    </div>
                    <a href="/cv.pdf" download="cv-ibraguim" className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-dashed border-[#333333] transition-colors rounded-xl px-4 py-3 text-white text-[15px]"><Download size={18} /> Mon CV</a>
                </div>
            </div>
        </motion.aside>
    )
}
