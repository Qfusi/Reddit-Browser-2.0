import { useSession } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchPosts, FETCH_POSTS_SUCCESS } from '../actions/fetchPosts';
import { subredditClickedState, subSortState, subTopSortState } from '../atoms/subredditAtom';
import ListPostItem from './ListPostItem';
import LinearProgress from '@mui/material/LinearProgress';
import { Transition } from '@headlessui/react';

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
                }
                setloadingPosts(false);
            } catch (err) {
                setloadingPosts(false);
                setPosts([]);
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
                    <div className="flex h-60 items-center justify-center">
                        <Transition
                            as={Fragment}
                            show={!loadingPosts}
                            appear={true}
                            enter="transition ease-out duration-1000"
                            enterFrom="opacity-0 -translate-y-20"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-out duration-500"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 -translate-y-20">
                            <div className="flex flex-col h-24 px-6 items-center justify-center text-black text-lg bg-red-500 rounded-full">
                                <p>Something went wrong</p>
                                <p>(╯°□°)╯︵ ┻━┻</p>
                            </div>
                        </Transition>
                    </div>
                )}
            </div>
        </>
    );
}

export default Posts;
