import React from "react";
import CurrencySelectList from "../features/CurrencySelectList";
import Logo from "../ui/Logo";

export default function Header() {
    return (
        <header className="relative w-full">
            <div className="flex justify-end pb-4 sm:absolute top-4 right-4 z-20 w-full sm:w-20">
                <CurrencySelectList />
            </div>
            <div className="z-10 flex justify-center items-center w-full relative p-4 bg-gradient-to-l from-pink-500/30 to-violet-950/50 rounded-2xl mb-4 sm:mb-8">
                <Logo />
            </div>
        </header>
    );
}
