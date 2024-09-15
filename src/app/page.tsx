import TagFilter from "@/components/features/TagFilter";
import GameList from "@/components/features/GameList";
import StudioFilter from "@/components/features/StudioFilter";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function CasinoLobby() {
    return (
        <>
            <div className="flex flex-col justify-center items-center w-full relative p-8 bg-gradient-to-r from-violet-950/20 to-violet-950/60 rounded-2xl mb-4 sm:mb-8">
                <SectionHeading>Tags</SectionHeading>
                <TagFilter />
            </div>
            <div className="flex flex-col justify-center items-center w-full relative p-8 bg-gradient-to-r from-violet-950/20 to-violet-950/60 rounded-2xl mb-4 sm:mb-8">
                <SectionHeading>Studios</SectionHeading>
                <StudioFilter />
            </div>

            <div className="flex flex-col items-center">
                <GameList />
            </div>
        </>
    );
}
