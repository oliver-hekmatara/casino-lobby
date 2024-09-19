"use client";

import { useState, useEffect, useMemo } from "react";
import { useCasinoData } from "@/context/CasinoDataContext";
import { Game } from "@/types/casinoTypes";
import { useGameFilter } from "@/context/GameFilterProvider";

const GAMES_PER_LOAD = 20; // Number of games to load per click

export default function GameList() {
    const [visibleGames, setVisibleGames] = useState<Game[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(GAMES_PER_LOAD);
    const { selectedCurrency, selectedTags, selectedStudios } = useGameFilter();
    const { games } = useCasinoData();

    const filteredGames = useMemo(() => {
        return games.filter((game) => {
            const tagMatches =
                selectedTags.length === 0 ||
                selectedTags.some((tag) => game.gameTags.includes(tag));

            const studioMatches =
                selectedStudios.length === 0 || selectedStudios.includes(game.studioId);

            const currencyMatches =
                selectedCurrency === null || !game.blockedCurrencies.includes(selectedCurrency);

            // Include games that matches these filters
            return tagMatches && studioMatches && currencyMatches;
        });
    }, [games, selectedTags, selectedStudios, selectedCurrency]);

    // Initialize the visible games when filters change
    useEffect(() => {
        setVisibleGames(filteredGames.slice(0, GAMES_PER_LOAD));
        setCurrentIndex(GAMES_PER_LOAD);
    }, [filteredGames]);

    const handleLoadMore = () => {
        // Append the next set of games to the visible list
        setVisibleGames((prevGames) => [
            ...prevGames,
            ...filteredGames.slice(currentIndex, currentIndex + GAMES_PER_LOAD),
        ]);

        // Increment the index
        setCurrentIndex((prevIndex) => prevIndex + GAMES_PER_LOAD);

        // Scroll down to the newly loaded content
        setTimeout(() => {
            window.scrollBy({
                top: 840,
                behavior: "smooth",
            });
        }, 100);
    };

    return (
        <div className="container mx-auto">
            {visibleGames.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                    {visibleGames.map((game) => (
                        <li
                            key={game.id}
                            className="p-[1px] bg-gradient-to-bl from-pink-700 to-violet-500 rounded cursor-pointer"
                        >
                            <div className="flex flex-col justify-center items-center w-full text-sm">
                                <div className="flex w-full h-52">
                                    <img
                                        src={game.imageUrl}
                                        alt={game.name}
                                        className="w-full h-auto object-cover rounded-t"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="w-full text-center p-5  bg-dark-violet rounded-b">
                                    <h4 className="bg-violet-950/80  text-violet-300 px-3 py-1 w-auto inline-block text-xs rounded-full">
                                        {game.studioName}
                                    </h4>
                                    <h3 className="mt-4 text-pink-200 text-md">{game.name}</h3>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="w-full text-center mt-10">
                    No games available with the selected filters.
                </div>
            )}

            {currentIndex < filteredGames.length && (
                <div className="flex justify-center w-full mt-10">
                    <button
                        onClick={handleLoadMore}
                        className="bg-pink-700 hover:bg-pink-600 py-4 px-10 rounded text-sm text-pink-100 hover:text-white transition-all duration-200"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
