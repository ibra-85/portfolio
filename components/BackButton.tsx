"use client";

import { useRouter, usePathname } from "next/navigation";
import { RiArrowGoBackFill } from "react-icons/ri";
import Link from "next/link";
import { motion } from "framer-motion";

export function BackButton() {
    const router = useRouter();
    const pathname = usePathname();

    // Si on est sur une page de projet, retourner à /projects, sinon à /
    const handleBack = () => {
        if (pathname?.startsWith("/projects/")) {
            router.push("/projects");
        } else {
            router.back();
        }
    };

    return (
        <motion.button
            onClick={handleBack}
            className="flex gap-1 text-white/50 hover:text-white transition duration-300"
            whileHover={{ x: -2 }}
            aria-label="Retour"
        >
            <RiArrowGoBackFill size={15} className="mt-[2px] flex-shrink-0" />
            <span className="text-sm">Retour</span>
        </motion.button>
    );
}