"use client";

import { Currency } from "@/types/currencyEnums";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from "react";

type GameFilterContextType = {
    selectedStudios: number[];
    selectedTags: number[];
    selectedCurrency: string;
    setSelectedStudios: Dispatch<SetStateAction<number[]>>;
    setSelectedTags: Dispatch<SetStateAction<number[]>>;
    setSelectedCurrency: Dispatch<SetStateAction<string>>;
};

const initialData = {
    selectedStudios: [],
    selectedTags: [],
    selectedCurrency: Currency.EUR,
    setSelectedStudios: () => {},
    setSelectedTags: () => {},
    setSelectedCurrency: () => {},
};

const GameFilterContext = createContext<GameFilterContextType>(initialData);

export function GameFilterProvider({ children }: { children: React.ReactNode }) {
    const [selectedStudios, setSelectedStudios] = useState<number[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [selectedCurrency, setSelectedCurrency] = useState<string>(Currency.EUR);

    const contextValues = useMemo(
        () => ({
            selectedStudios,
            selectedTags,
            selectedCurrency,
            setSelectedStudios,
            setSelectedTags,
            setSelectedCurrency,
        }),
        [selectedStudios, selectedTags, selectedCurrency]
    );

    return (
        <GameFilterContext.Provider value={contextValues}>{children}</GameFilterContext.Provider>
    );
}

export const useGameFilter = () => useContext(GameFilterContext);
