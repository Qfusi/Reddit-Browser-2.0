import { HomeIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Sidebar() {
    const { data: session, status } = useSession();
    const [subreddits, setSubreddits] = useState([]);

    return (
        <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white" onClick={signOut}>
                    <HomeIcon className="h-5 w-5" />
                    <p>Sign out</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />


                {/* Subreddits */}
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
                <p className="cursor-pointer hover:text-white">Subreddit</p>
            </div>
        </div>
    )
}

export default Sidebar
