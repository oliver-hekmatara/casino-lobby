"use client";

import { useCasinoData } from "@/context/CasinoDataContext";
import { useGameFilter } from "@/context/GameFilterProvider";
import React, { useState } from "react";

export default function StudioFilter() {
    const [showAllStudios, setShowAllStudios] = useState<boolean>(false);
    const { setSelectedStudios, selectedStudios, selectedTags } = useGameFilter();
    const { studios } = useCasinoData();

    const filteredStudios =
        selectedTags.length === 0
            ? studios
            : studios.filter((studio) => studio.gameTags.some((tag) => selectedTags.includes(tag)));

    function handleStudioClick(id: number = 0) {
        setSelectedStudios((prevState: number[]) => {
            if (id === 0) return [];
            return prevState.includes(id)
                ? prevState.filter((studioId) => studioId !== id)
                : [...prevState, id];
        });
    }

    function handleToggleStudios() {
        setShowAllStudios((prev) => !prev);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <ul
                className={`relative grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 auto-rows-max overflow-hidden ${
                    showAllStudios ? "h-auto" : "h-[60px]"
                } gap-[10px] cursor-pointer`}
            >
                <li className="relative flex h-[60px] w-[100px] cursor-pointer">
                    <div
                        className={`absolute overflow-hidden inset-0 h-[60px] w-[100px] flex justify-center items-center bg-violet-700 text-sm ${
                            selectedStudios.length ? "" : "border"
                        }`}
                    >
                        <button onClick={() => handleStudioClick(0)}>SHOW ALL</button>
                    </div>
                </li>
                {filteredStudios.map((studio) => (
                    <li key={studio.id} className="relative flex h-[60px] w-[100px] cursor-pointer">
                        <div
                            className={`absolute overflow-hidden inset-0 h-[60px] w-[100px] ${
                                selectedStudios.includes(studio.id) ? "border" : ""
                            }`}
                        >
                            <img
                                src={studio.imageUrl}
                                className="w-full h-full object-cover hover:h-[65px] transition-all duration-200"
                                onClick={() => handleStudioClick(studio.id)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center items-center mt-8">
                <button
                    className="bg-violet-600 hover:bg-violet-500 py-2 px-5 rounded text-sm text-pink-100 hover:text-white transition-all duration-200"
                    onClick={handleToggleStudios}
                >
                    {showAllStudios ? "Hide studios" : "Show all studios"}
                </button>
            </div>
        </div>
    );
}
