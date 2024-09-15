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

    // Build the map: studioId => Set of game tags and blocked currencies
    games.forEach((game) => {
        if (!studioTagMap.has(game.studioId)) {
            studioTagMap.set(game.studioId, new Set());
        }
        game.gameTags.forEach((tag) => {
            studioTagMap.get(game.studioId)?.add(tag);
        });
    });

    // Process each studio and map tags and blocked currencies
    const processedStudios = studios.map((studio) => {
        const gameTags = Array.from(studioTagMap.get(studio.id) || []); // Ensure gameTags is an array
        const blockedCurrencies = studio.blockedCurrencies || ""; // Ensure blockedCurrencies is a string

        // Map studio's blocked currencies
        studioCurrencyMap.set(studio.id, blockedCurrencies);

        return {
            ...studio,
            gameTags,
        };
    });

    // Update all games with blocked currencies data.
    const processedGames = games.map((game) => {
        const studioBlockedCurrencies = studioCurrencyMap.get(game.studioId) || "";

        return {
            ...game,
            blockedCurrencies: studioBlockedCurrencies,
        };
    });

    return {
        ...data,
        studios: processedStudios,
        games: processedGames,
    };
}
