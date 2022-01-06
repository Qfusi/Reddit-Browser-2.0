import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchPosts, FETCH_POSTS_SUCCESS } from '../actions/fetchPosts';
import { subredditClickedState, subSortState, subTopSortState } from '../atoms/subredditAtom';
import ListPostItem from './ListPostItem';
import LinearProgress from '@mui/material/LinearProgress';

function Posts({ subreddit }) {
    const { data: session } = useSession();
    const [loadingPosts, setloadingPosts] = useRecoilState(subredditClickedState);
    const [posts, setPosts] = useState([]);
    const subSort = useRecoilValue(subSortState);
    const subTopSort = useRecoilValue(subTopSortState);

    useEffect(() => {
        async function fetchData() {
            try {
                var res = await fetchPosts(
                    session.user.accessToken,
                    subreddit?.display_name_prefixed,
                    subSort,
                    subTopSort
                );
                if (res.type === FETCH_POSTS_SUCCESS) {
                    setPosts(() => [...res.payload]);
                    setloadingPosts(false);
                }
            } catch (err) {
                console.log(`${err.type} - ${err.payload?.stack}`);
            }
        }
        fetchData();
    }, [session, subreddit, subSort, subTopSort]);

    return (
        <>
            {loadingPosts ? <LinearProgress color="warning" /> : <div className="h-1"></div>}
            <div className="space-y-2">
                {posts.length ? (
                    posts.map((post, i) => (
                        <ListPostItem key={post.data.id} post={post} id={i + 1} />
                    ))
                ) : (
                    <p>loading posts...</p>
                )}
            </div>
        </>
    );
}

export default Posts;
