"use client";

import { Lalezar } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const lalezar = Lalezar({
    weight: "400",
    subsets: ["latin"],
});

export default function Logo() {
    const router = useRouter();

    function handleClick() {
        router.push("/");
    }

    return (
        <div
            className="flex justify-center items-center w-full z-10 text-2xl sm:text-4xl cursor-pointer"
            onClick={handleClick}
        >
            <span className={`${lalezar.className} text-pink-600 mr-2`}>CUBEIA</span>
            <Image src="/images/logo.png" width={70} height="70" alt="logo" />
            <span className={`${lalezar.className} text-white ml-2`}>CASINO</span>
        </div>
    );
}
