"use client";

import { motion } from "framer-motion";

export function SkipToContent() {
    return (
        <motion.a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            initial={{ opacity: 0, y: -20 }}
            whileFocus={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            Aller au contenu principal
        </motion.a>
    );
}

