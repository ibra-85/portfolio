"use client";

import React, { useRef, useState, useEffect } from "react";
import { useAnimationFrame } from "framer-motion";
import Image from "next/image";

const technologies = [
    { name: "HTML", logo: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png" },
    {
        name: "CSS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/240px-CSS3_logo.svg.png",
    },
    {
        name: "JavaScript",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png",
    },
    {
        name: "React",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
    },
    {
        name: "Next.js",
        logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png",
    },
    { name: "Git", logo: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" },
    {
        name: "TypeScript",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png",
    },
    {
        name: "Tailwind",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/480px-Tailwind_CSS_Logo.svg.png",
    },
];

const TechItem: React.FC<{ tech: (typeof technologies)[0] }> = ({ tech }) => (
    <div className="flex items-center gap-2 text-[#858585] min-w-max group px-3">
        <div className="w-5 h-5 relative">
            <Image
                src={tech.logo}
                alt={`${tech.name} logo`}
                sizes="20px"
                className="group-hover:filter group-hover:brightness-125 transition-all duration-300 object-contain"
                fill
            />
        </div>
        <span className="text-xs group-hover:text-white transition-colors duration-300">
      {tech.name}
    </span>
    </div>
);

export function InfiniteCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const firstCycleRef = useRef<HTMLDivElement>(null);
    const [cycleWidth, setCycleWidth] = useState(0);
    const speedFactor = 0.05; // Ajustez la vitesse si besoin
    const startTimeRef = useRef<number | null>(null);

    // Mesure la largeur du premier cycle dès que le composant est monté
    useEffect(() => {
        if (firstCycleRef.current) {
            const width = firstCycleRef.current.getBoundingClientRect().width;
            setCycleWidth(width);
        }
    }, [firstCycleRef.current]);

    useAnimationFrame((time) => {
        if (startTimeRef.current === null) {
            startTimeRef.current = time;
        }
        const elapsed = time - startTimeRef.current;
        if (containerRef.current && cycleWidth > 0) {
            // Le décalage est calculé en modulo de la largeur d'un cycle
            const translateX = -((elapsed * speedFactor) % cycleWidth);
            containerRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
        }
    });

    return (
        <div className="overflow-hidden w-[300px]">
            <div
                className="flex"
                ref={containerRef}
                style={{ whiteSpace: "nowrap" }} // pour forcer le contenu sur une seule ligne
            >
                {/* Première copie */}
                <div className="flex" ref={firstCycleRef}>
                    {technologies.map((tech, i) => (
                        <TechItem key={`${tech.name}-${i}`} tech={tech} />
                    ))}
                </div>
                {/* Deuxième copie identique */}
                <div className="flex">
                    {technologies.map((tech, i) => (
                        <TechItem key={`${tech.name}-dup-${i}`} tech={tech} />
                    ))}
                </div>
            </div>
        </div>
    );
}
