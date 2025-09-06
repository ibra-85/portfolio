"use client";

import Image, { ImageProps } from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type Props = Omit<ImageProps, "src" | "alt"> & {
    /** Une seule image */
    src?: string;
    /** Plusieurs images pour activer le carousel */
    images?: string[];
    /** Texte alternatif */
    alt: string;
    /** Index de départ quand on ouvre l’overlay */
    startIndex?: number;
    /** Classe pour le preview */
    previewClassName?: string;
};

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0 },
};

export default function ZoomableImage({
                                          src,
                                          images,
                                          alt,
                                          startIndex = 0,
                                          previewClassName = "rounded-xl my-6",
                                          ...rest
                                      }: Props) {
    // Liste d’images finale
    const all = useMemo(() => {
        if (images?.length) return images;
        if (src) return [src];
        return [];
    }, [images, src]);

    // Image affichée en preview
    const previewSrc = src ?? all[startIndex] ?? "";

    const [isOpen, setOpen] = useState(false);
    const [idx, setIdx] = useState(startIndex);

    useEffect(() => {
        setIdx(startIndex);
    }, [startIndex]);

    // Navigation
    const hasMany = all.length > 1;

    const goPrev = useCallback(() => {
        setIdx((i) => (i - 1 + all.length) % all.length);
    }, [all.length]);

    const goNext = useCallback(() => {
        setIdx((i) => (i + 1) % all.length);
    }, [all.length]);

    // Fermeture & navigation clavier
    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowLeft" && hasMany) goPrev();
            if (e.key === "ArrowRight" && hasMany) goNext();
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, hasMany, goPrev, goNext]);

    return (
        <>
            {/* Preview */}
            <div className="relative group">
                <Image
                    src={previewSrc}
                    alt={alt}
                    {...rest}
                    width={rest.width ?? 1920}
                    height={rest.height ?? 1080}
                    className={`${previewClassName} group-hover:cursor-pointer ${rest.className ?? ""}`}
                    onClick={() => setOpen(true)}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ZoomIn className="text-white w-12 h-12 bg-black/50 rounded-full p-3" />
                </div>
            </div>

            {/* Overlay + (optionnel) Carousel */}
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setOpen(false)}
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div
                        className="relative w-full max-w-5xl mx-auto px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Bouton close */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-0 right-0 m-4 text-white/90 hover:text-white"
                            aria-label="Fermer"
                            title="Fermer"
                        >
                            <RxCross2 size={28} />
                        </button>

                        {/* Image courante */}
                        <div className="relative w-full aspect-video">
                            <Image
                                key={all[idx]} // force l’update
                                src={all[idx]}
                                alt={alt}
                                fill
                                sizes="100vw"
                                className="object-contain rounded-xl bg-black/20"
                                priority
                            />
                        </div>

                        {/* Contrôles du carousel */}
                        {hasMany && (
                            <>
                                {/* Prev / Next */}
                                <button
                                    onClick={goPrev}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                                    aria-label="Précédent"
                                    title="Précédent"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={goNext}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                                    aria-label="Suivant"
                                    title="Suivant"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Dots */}
                                <div className="mt-4 flex items-center justify-center gap-2">
                                    {all.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setIdx(i)}
                                            className={`h-2.5 rounded-full transition-all ${
                                                i === idx ? "w-6 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
                                            }`}
                                            aria-label={`Aller à l'image ${i + 1}`}
                                            title={`Image ${i + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* Compteur */}
                                <div className="absolute bottom-8 right-6 text-xs px-2 py-1 rounded bg-black/50 text-white/90">
                                    {idx + 1} / {all.length}
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </>
    );
}
