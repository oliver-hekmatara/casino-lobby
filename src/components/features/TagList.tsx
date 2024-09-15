"use client";

import { useCasinoData } from "@/context/CasinoDataContext";
import { useGameFilter } from "@/context/GameFilterProvider";
import React from "react";

export default function TagList() {
    const { setSelectedTags, selectedTags } = useGameFilter();
    const { tags } = useCasinoData();

    function handleClick(id: number = 0) {
        setSelectedTags((prevState: number[]) => {
            if (id === 0) return [];

            // If the tag is already in the array, remove it.
            if (prevState.includes(id)) {
                return prevState.filter((tagId) => tagId !== id);
            }

            // Otherwise, add the tag to the array
            return [...prevState, id];
        });
    }

    return (
        <ul className="flex flex-wrap gap-3 justify-center">
            <li>
                <button
                    onClick={() => handleClick(0)}
                    className={`border border-violet-600 hover:border-violet-400  py-2 px-5 rounded-full text-sm text-violet-200 hover:text-white transition-all duration-200 
                            ${selectedTags.length === 0 ? "bg-violet-600" : "bg-transparent"}`}
                >
                    All
                </button>
            </li>
            {tags.map((tag) => (
                <li key={tag.id}>
                    <button
                        onClick={() => handleClick(tag.id)}
                        className={`border border-violet-600 hover:border-violet-400  py-2 px-5 rounded-full text-sm text-violet-200 hover:text-white transition-all duration-200 
                            ${selectedTags.includes(tag.id) ? "bg-violet-600" : "bg-transparent"}`}
                    >
                        {tag.name}
                    </button>
                </li>
            ))}
        </ul>
    );
}
