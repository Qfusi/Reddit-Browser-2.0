import { useState } from "react";
import { timeSince } from "../lib/timeAndDateHelper";
import Player from "./Player";

function CrosspostedContent({ post }) {
    const [selectedPost, setPost] = useState(post[0]);
    return (
        <div className="bg-zinc-900 border border-gray-900 rounded-lg text-sm">
            <div className="flex-col truncate max-w-screen-lg px-3 py-1">
                <div className="flex space-x-2 items-center">
                    <p className="cursor-pointer hover:underline">
                        {selectedPost.subreddit_name_prefixed}
                    </p>
                    <p>·</p>
                    <p className="cursor-pointer hover:underline">
                        {selectedPost.author}
                    </p>
                    <p>·</p>
                    <p>
                        {timeSince(new Date(selectedPost.created * 1000))}
                    </p>
                </div>
                <p key={selectedPost.id} className="inline-block text-white cursor-pointer">
                    {selectedPost.title}
                </p>
            </div>
            <Player post={selectedPost} />
            <div className="flex space-x-2 px-3 py-1">
                <p>{selectedPost.score} points</p>
                <p>·</p>
                <p className="hover:underline">{selectedPost.num_comments} comments</p>
            </div>
        </div>
    )
}

export default CrosspostedContent
