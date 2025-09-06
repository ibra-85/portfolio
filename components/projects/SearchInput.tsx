"use client";

import { forwardRef } from "react";
import { Search, X } from "lucide-react";

type Props = {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
};

const SearchInput = forwardRef<HTMLInputElement, Props>(function SearchInput(
    { value, onChange, placeholder = "Rechercher un projet..." },
    ref
) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden />
            <input
                ref={ref}
                id="project-search"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-[#1A1A1A] border border-[#333333] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#555555] transition-colors"
            />
            {value && (
                <button
                    aria-label="Effacer la recherche"
                    onClick={() => onChange("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10"
                >
                    <X size={16} className="text-white/80" />
                </button>
            )}
        </div>
    );
});

export default SearchInput;