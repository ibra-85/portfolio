"use client";

import { motion } from "framer-motion";

interface ImageSkeletonProps {
    className?: string;
    aspectRatio?: "video" | "square" | "auto";
}

export function ImageSkeleton({ className = "", aspectRatio = "video" }: ImageSkeletonProps) {
    const aspectClasses = {
        video: "aspect-video",
        square: "aspect-square",
        auto: "",
    };

    return (
        <div className={`${aspectClasses[aspectRatio]} ${className} bg-[#1A1A1A] rounded-xl overflow-hidden relative`}>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A]"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    backgroundSize: "200% 100%",
                }}
            />
        </div>
    );
}


