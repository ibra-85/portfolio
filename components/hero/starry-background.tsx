"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
}

interface ShootingStar {
    id: number;
    startX: number;
    startY: number;
    angle: number;
    delay: number;
    duration: number;
}

export function StarryBackground() {
    // On attend le montage du composant pour effectuer certains calculs
    const [mounted, setMounted] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        // Le composant est monté côté client
        setMounted(true);
        setWindowWidth(window.innerWidth);

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const stars = useMemo<Star[]>(
        () =>
            Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
            })),
        []
    );

    const shootingStars = useMemo<ShootingStar[]>(
        () =>
            Array.from({ length: 40 }, (_, i) => ({
                id: i,
                startX: Math.random() * 50,
                startY: Math.random() * 70,
                angle: Math.random() * 25 + 20,
                delay: Math.random() * 20,
                duration: Math.random() * 4 + 3,
            })),
        []
    );

    // Tant que le composant n'est pas monté, ne rien rendre pour éviter le mismatch
    if (!mounted) {
        return null;
    }

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Étoiles statiques */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white blur-[0.3px]"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                    }}
                />
            ))}

            {/* Étoiles filantes */}
            {shootingStars.map((star) => {
                // Calculer le déplacement en x et y en fonction de la largeur de la fenêtre
                const deltaX = windowWidth;
                const deltaY = windowWidth * Math.tan((star.angle * Math.PI) / 180);

                return (
                    <motion.div
                        // On inclut windowWidth dans la key pour forcer le remount lors d'un redimensionnement
                        key={`${star.id}-${windowWidth}`}
                        className="absolute"
                        style={{
                            left: `${star.startX}%`,
                            top: `${star.startY}%`,
                            rotate: `${star.angle}deg`,
                            opacity: 0,
                        }}
                        animate={{
                            x: [0, deltaX],
                            y: [0, deltaY],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 25 + 10,
                            delay: star.delay,
                            ease: "linear",
                        }}
                    >
                        <div className="relative w-[100px] h-[2px]">
                            <div className="absolute inset-0 bg-gradient-to-l from-white/60 to-transparent rounded-[2px]"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[4px] h-[1px] bg-white/20 rounded-[1px] shadow-[0_0_6px_1px_rgba(255,255,255,0.6)]"></div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
