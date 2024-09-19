import { CasinoData } from "@/types/casinoTypes";

const fallbackData: CasinoData = {
    games: [],
    studios: [],
    tags: [],
};

// Fetch data and preprocess it
export async function fetchCasinoData(): Promise<CasinoData> {
    const casinoDataUrl = "https://cubeia-code-tests.s3.eu-west-1.amazonaws.com/lobby.json";

    try {
        const response = await fetch(casinoDataUrl, { cache: "no-store" });

        if (!response.ok) throw new Error("Failed to load casino data.");

        const data: CasinoData = await response.json();

        return preprocessCasinoData(data);
    } catch (error) {
        console.error(error);
        return fallbackData;
    }
}

function preprocessCasinoData(data: CasinoData): CasinoData {
    const { games, studios } = data;

    // Map studios to their respective tags based on the games they have
    const studioTagMap = new Map<number, Set<number>>();

    // Map studios to their blocked currencies
    const studioCurrencyMap = new Map<number, string>();

    // Map studios to their respective names
    const studioNameMap = new Map<number, string>();

    games.forEach((game) => {
        if (!studioTagMap.has(game.studioId)) {
            // Initialize studioTagMap with studio id and an empty set (if not already initialized)
            studioTagMap.set(game.studioId, new Set());
        }
        game.gameTags.forEach((tag) => {
            // Game tags are added to their corresponding studio (no duplicates since using a set).
            studioTagMap.get(game.studioId)?.add(tag);
        });
    });

    const processedStudios = studios.map((studio) => {
        const gameTags = Array.from(studioTagMap.get(studio.id) || []);

        // Map studio id's with blocked currencies
        studioCurrencyMap.set(studio.id, studio.blockedCurrencies || "");

        //Map studio id's with names
        studioNameMap.set(studio.id, studio.name);

        return {
            ...studio,
            gameTags,
        };
    });

    const processedGames = games.map((game) => {
        const blockedCurrencies = studioCurrencyMap.get(game.studioId) || "";
        const studioName = studioNameMap.get(game.studioId) || "Unknown studio";

        return {
            ...game,
            blockedCurrencies: blockedCurrencies,
            studioName: studioName,
        };
    });

    return {
        ...data,
        studios: processedStudios,
        games: processedGames,
    };
}
