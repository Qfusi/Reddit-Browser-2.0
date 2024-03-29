import { HomeIcon } from '@heroicons/react/outline';
import { CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
    fetchMySubscriptions,
    FETCH_MY_SUBSCRIPTIONS_SUCCESS
} from '../actions/fetchMySubscriptions';
import { subredditClickedState, subredditIdState } from '../atoms/subredditAtom';
import Searchbar from './Searchbar';

function Sidebar() {
    const { data: session } = useSession();
    const [subreddits, setSubreddits] = useState([]);
    const [selectedSubreddit, setSelectedSubreddit] = useRecoilState(subredditIdState);
    const [, setSubredditClicked] = useRecoilState(subredditClickedState);

    useEffect(() => {
        async function fetchData() {
            try {
                var res = await fetchMySubscriptions(session.user.accessToken);
                if (res.type === FETCH_MY_SUBSCRIPTIONS_SUCCESS) {
                    const subreddits = res.payload.sort((a, b) =>
                        a.data.display_name.localeCompare(b.data.display_name)
                    );
                    setSubreddits(() => [...subreddits]);
                }
            } catch (err) {
                console.log(`${err.type} - ${err.payload?.stack}`);
            }
        }
        fetchData();
    }, [session]);

    return (
        <div
            className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900
        overflow-y-scroll h-screen scrollbar-hide hidden md:inline-flex pb-36
        sm:max-w-[12rem] lg:max-w-[15rem]">
            <div className="space-y-4">
                <button
                    className={`flex items-center space-x-2 hover:text-white ${
                        !selectedSubreddit && 'text-orange-500'
                    }`}
                    onClick={() => {
                        if (selectedSubreddit) {
                            setSelectedSubreddit('');
                            setSubredditClicked(true);
                        }
                    }}>
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>

                <Searchbar />

                <hr className="border-t-[0.1px] border-gray-900" />

                {subreddits.length ? (
                    subreddits.map((subreddit) => (
                        <p
                            key={subreddit.data.id}
                            className={`cursor-pointer hover:text-white
                    ${subreddit.data.id == selectedSubreddit.id ? 'text-orange-500' : ''}
                    `}
                            onClick={() => {
                                if (subreddit.data.id !== selectedSubreddit.id) {
                                    setSelectedSubreddit(subreddit.data);
                                    setSubredditClicked(true);
                                }
                            }}>
                            {subreddit.data.display_name}
                        </p>
                    ))
                ) : (
                    <div className="flex flex-col justify-center items-center space-y-7">
                        <p>loading subreddits...</p>
                        <CircularProgress color="warning" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
