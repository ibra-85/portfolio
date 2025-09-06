"use client"

import { cn } from "@/lib/utils";
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FooterProps {
    className?: string;
}

const Footer = ({className}: FooterProps) => {
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      setCurrentTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(className, "bg-[#141414] text-gray-400 w-full py-12")}>
      <div className="max-w-6xl mx-auto px-4">

        {/* Status and Time */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <span className="mr-2 text-white font-bold text-sm">Actuellement</span>
              <span className="inline-flex items-center">
                <span className="mr-1 text-sm">💻</span>
                <span className="mr-1 text-white font-bold text-sm">disponible</span>
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <motion.div
                            className="absolute w-3 h-3 rounded-full bg-green-300"
                            animate={{
                                scale: [1, 1.5, 0],
                                opacity: [0.6, 0.3, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                        <div
                            className="absolute w-[10px] h-[10px] rounded-full bg-green-400"
                            style={{
                                boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                            }}
                        />
                </div>
              </span>
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="transition duration-300 rounded-[8px] ease text-white/75 hover:text-white items-center gap-2 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] shadow-[rgba(255,255,255,0.243)_0px_0.6px_1.08px_-0.92px_inset,rgba(255,255,255,0.235)_0px_2.29px_4.12px_-1.83px_inset,rgba(255,255,255,0.204)_0px_10px_18px_-2.75px_inset,rgba(255,255,255,0.03)_0px_0px_20px_1px] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] px-4 py-2 text-white"
            >
                📬<a href="mailto:ibraguimd@gmail.com" className="font-semibold">Me contacter</a>
            </motion.button>
          </div>
          <div className="text-6xl font-light text-gray-300 mt-6 md:mt-0">{currentTime}</div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#292929] my-8"></div>

        {/* Footer Links */}
        <div className="flex flex-wrap gap-2 text-sm justify-center">
          <span>Fait avec le ❤️ par Ibraguim</span>
          <span>|</span>
          <span>© {currentYear} - Tous droits réservés</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer