export type Game = {
    id: number;
    name: string;
    imageUrl: string;
    studioId: number;
    gameTags: number[];
    blockedCurrencies: string;
};

export type Studio = {
    id: number;
    name: string;
    imageUrl: string;
    gameTags: number[];
    blockedCurrencies: string;
};

export type Tag = {
    id: number;
    name: string;
};

export type CasinoData = {
    games: Game[];
    studios: Studio[];
    tags: Tag[];
};
