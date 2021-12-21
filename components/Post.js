import { useState } from "react";
import PostVote from "./PostVote";

function Post({ post, id }) {
    return (
        <div className="grid grid-cols-12 text-gray-500 py-2 px-4 hover:bg-gray-900 rounded-lg">
            <div className="flex items-center pr-8">
                <p className="text-xs hidden md:inline">{id}</p>
                <PostVote post={post} />
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
