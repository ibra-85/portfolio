"use client"

import {Reenie_Beanie} from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { Download, Bookmark, Box, Home, LayoutGrid, Mail, Share2 } from "lucide-react"
import { useNavigation, type NavItem } from "@/hooks/useNavigation"
import {FaXTwitter} from "react-icons/fa6";

const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const reenieBeanie = Reenie_Beanie({
    weight: '400',
    subsets: ['latin']
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
    { title: "Twitter", url: "/twitter", icon: FaXTwitter },
]

export function Sidebar() {
    const { activeItem, handleNavigation } = useNavigation([...navItems, ...resourceItems])

    return (
        <aside className="fixed top-0 left-0 flex flex-col h-screen w-[280px] bg-[#161616] text-[#858585] overflow-hidden">
            <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
                {/* Profile Section */}
                <div className="flex items-start gap-3 p-6 mb-4">
                    <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-lg"
                    />
                    <div className="flex flex-col">
                        <h1 className={`${reenieBeanie.className} text-white text-xl leading-tight`}>Ibraguim Djabrailov</h1>
                        <span className="text-sm leading-none">Développeur Junior</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-3 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                    <div className="space-y-0.5 pb-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.url}
                                href={item.url}
                                onClick={() => handleNavigation(item.url)}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors relative ${
                                    activeItem === item.url ? "bg-white/5 text-white border border-white/5" : ""
                                }`}
                            >
                                <item.icon size={18} />
                                <span className="text-[15px]">{item.title}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Resources Section */}
                    <div className="space-y-0.5">
                        <h2 className="px-4 py-2 text-xs font-medium uppercase tracking-wider">Resources</h2>
                        {resourceItems.map((item) => (
                            <Link
                                key={item.url}
                                href={item.url}
                                onClick={() => handleNavigation(item.url)}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors relative ${
                                    activeItem === item.url ? "bg-white/5 text-white" : ""
                                }`}
                            >
                                <item.icon size={18} />
                                <span className="text-[15px]">{item.title}</span>
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Footer */}
                <div className="mt-auto p-3 space-y-2 border-t border-dashed border-t-[#333333] relative">
                    <div className="group bg-[#1A1A1A] rounded-xl p-4 relative border border-dashed border-[#333333] overflow-hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 700 700"
                            width="700"
                            height="700"
                            preserveAspectRatio="none"
                            className="absolute inset-0 w-full h-full opacity-15"
                        >
                            <defs>
                                <filter
                                    id="nnnoise-filter"
                                    x="-20%"
                                    y="-20%"
                                    width="140%"
                                    height="140%"
                                    filterUnits="objectBoundingBox"
                                    primitiveUnits="userSpaceOnUse"
                                    colorInterpolationFilters="linearRGB"
                                >
                                    <feTurbulence
                                        type="fractalNoise"
                                        baseFrequency="0.102"
                                        numOctaves="4"
                                        seed="15"
                                        stitchTiles="stitch"
                                        x="0%"
                                        y="0%"
                                        width="100%"
                                        height="100%"
                                        result="turbulence"
                                    ></feTurbulence>
                                    <feSpecularLighting
                                        surfaceScale="15"
                                        specularConstant="0.08"
                                        specularExponent="20"
                                        lightingColor="#ffffff"
                                        x="0%"
                                        y="0%"
                                        width="100%"
                                        height="100%"
                                        in="turbulence"
                                        result="specularLighting"
                                    >
                                        <feDistantLight azimuth="3" elevation="100"></feDistantLight>
                                    </feSpecularLighting>
                                </filter>
                            </defs>
                            <rect width="700" height="700" fill="transparent"></rect>
                            <rect width="700" height="700" fill="#ffffff" filter="url(#nnnoise-filter)"></rect>
                        </svg>
                        <div className="relative z-10">
                            <div className="text-[22px] font-medium mb-0.5 text-white tracking-tight">2/5/2025</div>
                            <div className="text-sm text-[#858585]">Riga, Latvia</div>
                        </div>
                    </div>
                    <button className="group w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-dashed border-[#333333] transition-colors rounded-xl px-4 py-3 text-white relative overflow-hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 700 700"
                            width="700"
                            height="700"
                            preserveAspectRatio="none"
                            className="absolute inset-0 w-full h-full opacity-15"
                        >
                            <defs>
                                <filter
                                    id="nnnoise-filter"
                                    x="-20%"
                                    y="-20%"
                                    width="140%"
                                    height="140%"
                                    filterUnits="objectBoundingBox"
                                    primitiveUnits="userSpaceOnUse"
                                    colorInterpolationFilters="linearRGB"
                                >
                                    <feTurbulence
                                        type="fractalNoise"
                                        baseFrequency="0.102"
                                        numOctaves="4"
                                        seed="15"
                                        stitchTiles="stitch"
                                        x="0%"
                                        y="0%"
                                        width="100%"
                                        height="100%"
                                        result="turbulence"
                                    ></feTurbulence>
                                    <feSpecularLighting
                                        surfaceScale="15"
                                        specularConstant="0.08"
                                        specularExponent="20"
                                        lightingColor="#ffffff"
                                        x="0%"
                                        y="0%"
                                        width="100%"
                                        height="100%"
                                        in="turbulence"
                                        result="specularLighting"
                                    >
                                        <feDistantLight azimuth="3" elevation="100"></feDistantLight>
                                    </feSpecularLighting>
                                </filter>
                            </defs>
                            <rect width="700" height="700" fill="transparent"></rect>
                            <rect width="700" height="700" fill="#ffffff" filter="url(#nnnoise-filter)"></rect>
                        </svg>
                        <div className="relative z-10 flex items-center gap-2">
                            <Download size={18} />
                            <span className="text-[15px]">Download CV</span>
                        </div>
                    </button>
                </div>
            </div>
            <style jsx global>
                {scrollbarStyles}
            </style>
        </aside>
    )
}