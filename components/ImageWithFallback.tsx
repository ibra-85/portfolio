"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    sizes?: string;
    fallback?: string;
    onLoad?: () => void;
}

export function ImageWithFallback({
    src,
    alt,
    fill,
    width,
    height,
    className,
    priority,
    sizes,
    fallback = "/project.png",
    onLoad,
}: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = () => {
        if (imgSrc !== fallback) {
            setImgSrc(fallback);
        }
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
        onLoad?.();
    };

    if (fill) {
        return (
            <Image
                src={imgSrc}
                alt={alt}
                fill
                className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                onError={handleError}
                onLoad={handleLoad}
                priority={priority}
                sizes={sizes}
            />
        );
    }

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
            onError={handleError}
            onLoad={handleLoad}
            priority={priority}
            sizes={sizes}
        />
    );
}

