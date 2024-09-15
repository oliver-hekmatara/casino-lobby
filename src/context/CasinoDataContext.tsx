"use client";

import { CasinoData } from "@/types/casinoTypes";
import React, { createContext, useContext } from "react";

type CasinoContextProviderProps = {
    children: React.ReactNode;
    casinoData: CasinoData;
};

const initialData = {
    games: [],
    studios: [],
    tags: [],
};

const CasinoContext = createContext<CasinoData>(initialData);

export function CasinoProvider({ children, casinoData }: CasinoContextProviderProps) {
    const { games, studios, tags } = casinoData;
    const contextValues = { games, studios, tags };

    return <CasinoContext.Provider value={contextValues}>{children}</CasinoContext.Provider>;
}

export const useCasinoData = () => useContext(CasinoContext);
