import { useState } from "react";
import { useRecoilValue } from "recoil"
import { subredditIdState } from "../atoms/subredditAtom";
import Posts from "./Posts";
import ProfileHeader from "./ProfileHeader";

function Center() {
    const selectedSubreddit = useRecoilValue(subredditIdState);
    const [sort, setSort] = useState("hot");

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <ProfileHeader />
            </header>
            
            <section className={`flex items-end space-x-7 bg-gradient-to-b from-slate-400 to-black h-80 text-white p-8`}>
                <img className="bg-black h-44 w-44 shadow-2xl rounded-full" src={selectedSubreddit?.icon_img} alt="" />
                <div>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{selectedSubreddit?.display_name}</h1>
                </div>
            </section>

            <div className="pl-2 pr-2">
                <Posts subreddit={selectedSubreddit} sortBy={sort} />
            </div>
        </div>
    )
}

export default Center
