"use client";

import { useGameFilter } from "@/context/GameFilterProvider";
import { Currency } from "@/types/currencyEnums";
import React from "react";

export default function CurrencySelectList() {
    const currencies = [Currency.EUR, Currency.USD, Currency.mBTC];
    const { selectedCurrency, setSelectedCurrency } = useGameFilter();

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCurrency(event.target.value);
    }

    return (
        <select
            value={selectedCurrency}
            onChange={handleChange}
            className="text-pink-500 text-xs bg-violet-950 outline outline-violet-500 rounded-lg block w-20 p-2 border-r-8 border-transparent cursor-pointer"
        >
            {currencies.map((currency, index) => (
                <option value={currency} key={index}>
                    {currency}
                </option>
            ))}
        </select>
    );
}
