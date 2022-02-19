import ItemVote from './ItemVote';
import Modal from 'react-modal';
import { useState } from 'react';
import ModalPost from './ModalPost';
import { BsPinAngle } from 'react-icons/bs';
import { timeSince } from '../lib/timeAndDateHelper';
import { ShareIcon } from '@heroicons/react/solid';
import { ExternalLinkIcon, MenuIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { subredditClickedState, subredditIdState } from '../atoms/subredditAtom';
import { fetchSubreddit, FETCH_SUBREDDIT_SUCCESS } from '../actions/fetchSubreddit';
import { useSession } from 'next-auth/react';

Modal.setAppElement('#__next');

function ListPostItem({ post, id }) {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [selectedSubreddit, setSelectedSubreddit] = useRecoilState(subredditIdState);
    const [, setSubredditClicked] = useRecoilState(subredditClickedState);

    const handleClick = (e) => {
        if (e.target.id !== 'hyperlink' && !e.target.id.includes('subreddit')) setOpen(true);
    };

    async function handleSubredditClick() {
        try {
            var res = await fetchSubreddit(
                session.user.accessToken,
                post.data.subreddit_name_prefixed
            );
            if (res.type === FETCH_SUBREDDIT_SUCCESS) {
                setSelectedSubreddit(res.payload);
                setSubredditClicked(true);
            }
        } catch (err) {
            console.log(`${err.type} - ${err.payload?.stack}`);
        }
    }

    return (
        <div className="grid grid-cols-12 text-gray-500 py-2 px-4 hover:bg-gray-900 rounded-lg">
            <div className="flex items-center pr-8 justify-between">
                <p className="text-xs hidden 2lg:inline">{id}</p>
                <ItemVote item={post} />
            </div>
            <div className="col-span-11 flex space-x-2 cursor-pointer" onClick={handleClick}>
                {post.data.thumbnail == 'self' ? (
                    <MenuIcon className="w-[70px] h-[70px] border" />
                ) : (
                    <img
                        className="h-[70px] w-[70px] cursor-pointer"
                        src={post.data.thumbnail}
                        alt=""
                    />
                )}
                <div className="flex flex-col grow">
                    <div
                        className="flex space-x-2
                    max-w-xs md:max-w-md lg:max-w-screen-sm
                    xl:max-w-screen-md 2xl:max-w-screen-lg">
                        {post.data.post_hint == 'link' && post.data.crosspost_parent && (
                            <div className="flex bg-orange-500 rounded-full text-white px-2 text-sm items-center space-x-1">
                                <ShareIcon className="w-4 h-4" />
                            </div>
                        )}
                        <p key={post.data.id} className="text-white cursor-pointer">
                            {post.data.title}
                        </p>
                    </div>
                    <div className="flex text-sm space-x-1">
                        {selectedSubreddit ? (
                            <>
                                <p>Posted by</p>
                                <p className="cursor-pointer hover:text-white hover:underline">{`${post.data.author}`}</p>
                            </>
                        ) : (
                            <>
                                <p>Posted to</p>
                                <p
                                    className="cursor-pointer text-orange-200 hover:text-orange-100 hover:underline"
                                    id={`subreddit_${post.data.subreddit_name_prefixed}`}
                                    onClick={handleSubredditClick}>
                                    {post.data.subreddit_name_prefixed}
                                </p>
                                <p>by</p>
                                <p className="cursor-pointer hover:text-white hover:underline">{`${post.data.author}`}</p>
                            </>
                        )}
                        <p>·</p>
                        <p>{timeSince(new Date(post.data.created * 1000))}</p>
                        {post.data.stickied ? (
                            <BsPinAngle className="h-4 w-4 text-green-500" />
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="flex justify-between">
                        <div className="flex text-sm space-x-4">
                            <p className="hover:text-white cursor-pointer">
                                {post.data.num_comments} Comments
                            </p>
                            <p className="hover:text-white cursor-pointer">Save</p>
                            <p className="hover:text-white cursor-pointer">Share</p>
                            <p className="hover:text-white cursor-pointer">Hide</p>
                        </div>
                        <a
                            href={post.data.url}
                            target="_blank"
                            rel="noreferrer"
                            id="hyperlink"
                            className="flex text-xs items-center hover:text-blue-300">
                            ({post.data.domain})
                            <span>
                                <ExternalLinkIcon className="ml-2 h-4 w-4" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            <Modal
                className="text-gray-500 absolute bg-black p-4 outline-none overflow-auto 
                border-x border-gray-900 rounded-md scrollbar-hide inset-y-0
                2xl:inset-x-56 xl:inset-x-44
                lg:inset-x-40 md:inset-x-20
                md:w-auto w-screen"
                isOpen={open}
                onRequestClose={() => {
                    if (open) {
                        setOpen(false);
                    }
                }}
                closeTimeoutMS={200}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.75)'
                    }
                }}>
                <ModalPost post={post} />
            </Modal>
        </div>
    );
}

export default ListPostItem;
