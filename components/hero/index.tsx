"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { InfiniteCarousel } from "./infinite-carousel"

const StarryBackground = dynamic(
    () => import("./starry-background").then((m) => m.StarryBackground),
    { ssr: false }
)

export function Hero() {
    const [currentTime, setCurrentTime] = useState<Date | null>(null)

    useEffect(() => {
        setCurrentTime(new Date())
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.6,
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-start gap-5 w-full max-w-[800px] min-h-min p-[40px_48px_40px] relative xl:border-x border-dashed border-[#292929] text-white"
        >
            {/* Background effects */}
            <StarryBackground />

            <div className="relative z-10">
                {/* Testimonial pill */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 bg-white/5 rounded-full pl-1 pr-4 py-1 mb-8 border border-[rgba(255,255,255,0.08)]"
                >
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
                            style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
                        />
                    </div>
                    <span className="text-sm text-white/60 max-md:text-xs max-md:font-semibold">
            Passionné par le développement web.
          </span>
                </motion.div>

                {/* Hero text */}
                <motion.div
                    variants={itemVariants}
                    className="h-auto max-w-[440px] relative whitespace-pre-wrap w-full break-words"
                >
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 text-white">
                        Je suis Ibraguim, je donne vie au web par ma{" "}
                        <span className="text-gray-400">créativité et mon expertise.</span>
                    </h1>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-lg text-gray-300 mb-8 max-w-xl"
                >
                    Je me spécialise dans la création de sites web modernes et réactifs,
                    en utilisant les dernières technologies front-end et back-end.
                </motion.p>

                {/* CTA Section */}
                <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-6"
                >
                    <motion.a
                        href="mailto:ibraguimd@gmail.com"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex transition duration-300 rounded-[8px] ease text-white/90 hover:text-white items-center gap-2 border border-[rgba(255,255,255,0.12)] bg-[rgb(26,26,26)] hover:bg-[rgb(43,43,43)] shadow-[rgba(255,255,255,0.243)_0px_0.6px_1.08px_-0.92px_inset,rgba(255,255,255,0.235)_0px_2.29px_4.12px_-1.83px_inset,rgba(255,255,255,0.204)_0px_10px_18px_-2.75px_inset,rgba(255,255,255,0.03)_0px_0px_20px_1px] hover:shadow-[inset_0px_0.6px_1.08px_-0.92px_rgba(255,255,255,0.24479),inset_0px_2.29px_4.12px_-1.83px_rgba(255,255,255,0.2372),inset_0px_10px_18px_-2.75px_rgba(255,255,255,0.2025),0px_0px_20px_1px_rgba(255,255,255,0.03),0px_0px_0px_4px_rgba(255,255,255,0.08)] px-4 py-2 text-white"
                        aria-label="Envoyer un email à Ibraguim"
                    >
                        📬
                        <span className="font-semibold">Me contacter</span>
                    </motion.a>
                    <motion.span
                        variants={itemVariants}
                        className="text-white text-opacity-90 font-semibold"
                        style={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.3)" }}
                    >
                        {currentTime
                            ? currentTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                            : " "}
                    </motion.span>
                </motion.div>

                {/* Technologies section with infinite carousel */}
                <motion.div variants={itemVariants} className="mt-24 w-full">
                    <motion.h2
                        variants={itemVariants}
                        className="text-gray-300 text-sm mb-6 font-semibold"
                    >
                        Mes compétences
                    </motion.h2>
                    <InfiniteCarousel />
                </motion.div>
            </div>
        </motion.div>
    )
}
