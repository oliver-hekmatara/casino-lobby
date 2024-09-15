import TagList from "@/components/features/TagList";
import GameList from "@/components/features/GameList";
import StudioList from "@/components/features/StudioList";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function CasinoLobby() {
    return (
        <>
            <div className="flex flex-col justify-center items-center w-full relative p-8 bg-gradient-to-r from-violet-950/20 to-violet-950/60 rounded-2xl mb-4 sm:mb-8">
                <SectionHeading>Categories</SectionHeading>
                <TagList />
            </div>
            <div className="flex flex-col justify-center items-center w-full relative p-8 bg-gradient-to-r from-violet-950/20 to-violet-950/60 rounded-2xl mb-4 sm:mb-8">
                <SectionHeading>Studios</SectionHeading>
                <StudioList />
            </div>

            <div className="flex flex-col items-center">
                <GameList />
            </div>
        </>
    );
}
