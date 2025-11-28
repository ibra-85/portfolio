"use client";

import { motion } from "framer-motion";

export function LoadingSpinner({ size = 40 }: { size?: number }) {
    return (
        <div className="flex items-center justify-center p-8" role="status" aria-label="Chargement en cours">
            <motion.div
                className="border-4 border-gray-700 border-t-white rounded-full"
                style={{ width: size, height: size }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="sr-only">Chargement...</span>
        </div>
    );
}

