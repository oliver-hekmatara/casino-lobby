import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { GameFilterProvider } from "@/context/GameFilterProvider";
import { CasinoData } from "@/types/casinoTypes";
import { fetchCasinoData } from "@/services/apiService";
import { CasinoProvider } from "@/context/CasinoDataContext";

export const metadata: Metadata = {
    title: "Casino Lobby",
    description: "Casino Lobby Project For Cubeia",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Initial data fetch (server side), pass response to casino data context.
    const data: CasinoData = await fetchCasinoData();

    return (
        <html lang="en">
            <body
                className={`antialiased p-4 sm:p-8  flex flex-col items-center w-full bg-dark-violet text-white`}
            >
                <CasinoProvider casinoData={data}>
                    <GameFilterProvider>
                        <div className="w-full max-w-[1400px]">
                            <Header />
                            <main>{children}</main>
                        </div>
                    </GameFilterProvider>
                </CasinoProvider>
            </body>
        </html>
    );
}
