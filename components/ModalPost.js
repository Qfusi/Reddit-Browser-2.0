import ItemVote from "./ItemVote"
import { timeSince } from "../lib/timeAndDateHelper"
import Comments from "./Comments"
import { useEffect, useState } from "react";

function ModalPost({post}) {
    const [media, setMedia] = useState();

    useEffect(() => {
        if (!post.data.url.endsWith(".gif")) {
            setMedia(post.data.url.substr(0, post.data.url.lastIndexOf(".")) + ".mp4");
        }
    }, [post]);

    var hint = post.data.post_hint;
    console.log(post);

    if (hint == "image") {

    }
    if (hint == "hosted:video") { // reddit hosted

    }
    if (hint == "rich:video") { // i.e youtube hosted

    }

    return (
        <div>
            <div className="flex">
                <div className="pr-8">
                    <ItemVote item={post} />
                </div>
                <div className="flex-col truncate max-w-screen-lg">
                    <div className="flex text-sm space-x-2">
                        <p>
                            Posted in {post.data.subreddit_name_prefixed} by
                        </p>
                        <p className="cursor-pointer hover:text-white">
                            {post.data.author}
                        </p>
                        <p>
                            {timeSince(new Date(post.data.created * 1000))}
                        </p>
                    </div>

                    <p key={post.data.id} className="text-white text-xl">
                        {post.data.title}
                    </p>

                </div>
            </div>

            <div className="m-4 space-y-4">
                <div className="flex justify-center bg-zinc-900 rounded-lg">
                    {media ? 
                        <video autoPlay loop controls preload="auto" >
                            <source src={media} type="video/mp4"/>
                        </video>
                        : 
                        <img className="max-h-screen w-auto h-auto max-w-2xl rounded-lg" src={post.data.url} alt="" />
                    }

                </div>
                
                {post.data.selftext && 
                <div className="p-4 bg-zinc-900 rounded-lg text-gray-300 text-sm">
                    <p>{post.data.selftext}</p>
                </div>}
                

                <div className="flex justify-center items-center bg-zinc-900 h-52 rounded-lg p-4">
                    <textarea className="bg-zinc-900 border rounded-lg h-full w-full p-2 text-white resize-none"  placeholder="Post something.." />
                </div>

                <Comments id={post.data.id} subreddit={post.data.subreddit_name_prefixed} />
            </div>
        </div>
    )
}

export default ModalPost
