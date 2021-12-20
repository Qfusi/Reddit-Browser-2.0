import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid"
import { useState } from "react";

function Post({ post, id }) {
    const [upvoteEffect, setUpvoteEffect] = useState(false);
    const [downvoteEffect, setDownvoteEffect] = useState(false);

    return (
        <div className="grid grid-cols-12 text-gray-500 py-2 px-4 hover:bg-gray-900 rounded-lg">
            <div className="flex items-center pr-8">
                <p className="text-xs hidden md:inline">{id}</p>
                <div className="col-span-1 flex flex-col space-y-1 ml-auto items-center">
                    <ArrowUpIcon className={`h-5 w-5 hover:text-orange-500 transition-colors ease-out delay-150 cursor-pointer
                        ${upvoteEffect && "animate-pulse"}`} 
                        onClick={() => {
                            setUpvoteEffect(true);
                            post.data.score++;
                        }}
                        onAnimationEnd={() => setUpvoteEffect(false)}
                    />
                    <p className="text-xs">{post.data.score}</p>
                    <ArrowDownIcon className={`h-5 w-5 hover:text-blue-500 transition-colors ease-out delay-150 cursor-pointer
                        ${downvoteEffect && "animate-pulse"}`} 
                        onClick={() => {
                            setDownvoteEffect(true);
                            post.data.score--;
                        }}
                        onAnimationEnd={() => setDownvoteEffect(false)}
                    />
                </div>
            </div>
            <div className="col-span-9 flex space-x-2">
                {post.data.thumbnail && <img className="h-16 w-16 cursor-pointer" src={post.data.thumbnail} alt="" />}
                <div className="flex flex-col truncate max-w-screen-lg">
                    <p key={post.data.id} className="text-white cursor-pointer">
                        {post.data.title}
                    </p>
                    <div className="flex">
                        <p className="text-sm">
                            {`Submitted ${new Date(post.data.created).toLocaleString()}`}
                        </p>
                    </div>
                    <div className="flex text-sm space-x-1">
                        <p>By</p>
                        <p className="cursor-pointer hover:text-white">
                            {`${post.data.author}`}
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 grid-rows-2 items-center justify-items-center ml-auto md:ml-0 text-sm">
                <p className="hover:text-white cursor-pointer">Share</p>
                <p className="hover:text-white cursor-pointer">Save</p>
                <p className="hover:text-white cursor-pointer">Comments</p>
                <p className="hover:text-white cursor-pointer">Hide</p>
            </div>
        </div>
    )
}

export default Post
