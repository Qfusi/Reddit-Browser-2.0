import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { fetchPosts, FETCH_POSTS_SUCCESS } from "../actions/fetchPosts";
import { subredditClickedState } from "../atoms/subredditAtom";
import Post from "./Post";

function Posts({ subreddit, sortBy }) {
    const { data: session } = useSession();
    const [loadingPosts, setloadingPosts] = useRecoilState(subredditClickedState);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts(session.user.accessToken, subreddit?.display_name_prefixed, sortBy)
        .then((res) => {
            if (res.type === FETCH_POSTS_SUCCESS) {
                setPosts(() => [...res.payload]);
                console.log(res.payload);
                setloadingPosts(false);
            }
        })
        .catch((err) => {
            console.log(`${err.type} - ${err.payload?.stack}`);
        });
    }, [session, subreddit, sortBy]);

    return (
        <>
            {loadingPosts ? 
            <div className="flex flex-col h-72 w-full justify-center items-center space-y-5">
                    <p className="text-white text-sm">Loading Posts...</p>
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-600 h-12 w-12 mb-4"></div>
            </div> 
                : 
            <div className="space-y-2">
                {posts.length ? posts.map((post, i) => (
                    <Post key={post.data.id} post={post} id={i + 1} />
                )) : <p>loading posts...</p>}
            </div>
            }
        </>
    )
}

export default Posts
