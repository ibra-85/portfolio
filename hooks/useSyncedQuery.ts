"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useSyncedQuery(paramName = "q") {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const setQuery = useCallback(
        (value: string) => {
            const next = new URLSearchParams(searchParams.toString());
            if (value) {
                next.set(paramName, value);
            } else {
                next.delete(paramName);
            }
            router.replace(`${pathname}?${next.toString()}`);
        },
        [paramName, pathname, router, searchParams]
    );

    return {
        initial: searchParams.get(paramName) ?? "",
        setQuery,
    };
}
