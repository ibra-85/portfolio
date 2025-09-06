"use client";

import { useRouter } from "next/navigation";
import {RiArrowGoBackFill} from "react-icons/ri";

export function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex gap-1 text-white/50 hover:text-white transition duration-300"
        >
            <RiArrowGoBackFill size={15} className="mt-[2px] flex-shrink-0" />
            <span className="text-sm">Retour</span>
        </button>
    );
}