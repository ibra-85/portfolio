"use client"

import { useState, useCallback } from "react"
import type React from "react" // Added import for React

export type NavItem = {
    title: string
    url: string
    icon: React.ComponentType<{ size?: number }>
}

export function useNavigation(initialItems: NavItem[]) {
    const [activeItem, setActiveItem] = useState<string>(initialItems[0].url)

    const handleNavigation = useCallback((url: string) => {
        setActiveItem(url)
    }, [])

    return {
        activeItem,
        handleNavigation,
    }
}