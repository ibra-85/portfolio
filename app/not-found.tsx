"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, LayoutGrid, AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#141414]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-6 flex justify-center"
                >
                    <div className="relative">
                        <AlertCircle className="w-24 h-24 text-gray-600" />
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="w-16 h-16 border-2 border-dashed border-gray-600 rounded-full" />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-gray-400 mb-2"
                >
                    Erreur 404
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-bold text-white mb-3"
                >
                    Page introuvable
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 mb-8"
                >
                    La page que vous cherchez n&apos;existe pas ou a été déplacée.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1A1A1A] border border-[#333] hover:bg-[#252525] hover:border-[#444] transition-all text-white"
                    >
                        <Home size={18} />
                        Accueil
                    </Link>
                    <Link
                        href="/projects"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1A1A1A] border border-[#333] hover:bg-[#252525] hover:border-[#444] transition-all text-white"
                    >
                        <LayoutGrid size={18} />
                        Mes projets
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
