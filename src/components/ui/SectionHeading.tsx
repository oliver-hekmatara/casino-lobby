import React from "react";

type Props = {
    children: React.ReactNode;
};

export default function SectionHeading({ children }: Props) {
    return <h2 className="text-lg mb-8 text-violet-200">{children}</h2>;
}
