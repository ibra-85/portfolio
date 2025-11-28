"use client";

import Image, { ImageProps } from "next/image";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { ZoomIn, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageSkeleton } from "./ImageSkeleton";

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
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        setIdx(startIndex);
    }, [startIndex]);

    // Focus trap pour l'accessibilité
    useEffect(() => {
        if (!isOpen) return;

        // Sauvegarder l'élément qui avait le focus
        previousFocusRef.current = document.activeElement as HTMLElement;

        // Focus sur le modal
        const modal = modalRef.current;
        if (modal) {
            const firstFocusable = modal.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) as HTMLElement;
            firstFocusable?.focus();
        }

        // Gérer le focus trap
        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            const modal = modalRef.current;
            if (!modal) return;

            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleTab);
        document.body.style.overflow = "hidden"; // Empêcher le scroll du body

        return () => {
            document.removeEventListener("keydown", handleTab);
            document.body.style.overflow = "";
            // Restaurer le focus
            previousFocusRef.current?.focus();
        };
    }, [isOpen]);

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
                {isLoading && <ImageSkeleton className={previewClassName} aspectRatio="video" />}
                <Image
                    src={previewSrc}
                    alt={alt}
                    {...rest}
                    width={rest.width ?? 1920}
                    height={rest.height ?? 1080}
                    className={`${previewClassName} group-hover:cursor-pointer ${rest.className ?? ""} ${isLoading ? "opacity-0 absolute" : "opacity-100"} transition-opacity duration-300`}
                    onClick={() => setOpen(true)}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setImageErrors((prev) => new Set([...prev, 0]));
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ZoomIn className="text-white w-12 h-12 bg-black/50 rounded-full p-3" />
                </div>
            </div>

            {/* Overlay + (optionnel) Carousel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setOpen(false)}
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Vue agrandie de l'image"
                    >
                        <div
                            ref={modalRef}
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
                            {imageErrors.has(idx) ? (
                                <div className="flex flex-col items-center justify-center h-full bg-black/20 rounded-xl">
                                    <AlertCircle className="w-12 h-12 text-gray-500 mb-4" aria-hidden="true" />
                                    <p className="text-gray-400 text-sm">Impossible de charger l'image</p>
                                </div>
                            ) : (
                                <Image
                                    key={all[idx]} // force l'update
                                    src={all[idx]}
                                    alt={alt}
                                    fill
                                    sizes="100vw"
                                    className="object-contain rounded-xl bg-black/20"
                                    priority
                                    onError={() => {
                                        setImageErrors((prev) => new Set([...prev, idx]));
                                    }}
                                />
                            )}
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
            </AnimatePresence>
        </>
    );
}
