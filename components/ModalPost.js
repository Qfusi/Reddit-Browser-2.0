import { timeSince } from '../lib/timeAndDateHelper';
import ItemVote from './ItemVote';
import Comments from './Comments';
import MediaContent from './MediaContent';
import { useState } from 'react';
import CrosspostedContent from './CrosspostedContent';
import { ShareIcon } from '@heroicons/react/outline';
import styles from '../styles/ModalPost.module.css';
import DOMPurify from 'dompurify';

function ModalPost({ post }) {
    const [crossposted] = useState(post.data.crosspost_parent);

    return (
        <div>
            <div className="flex">
                <div className="pr-8">
                    <ItemVote item={post} />
                </div>
                <div className="flex-col max-w-screen-lg">
                    <div className="flex text-sm space-x-2">
                        {crossposted && (
                            <div className="flex bg-orange-500 rounded-full text-white px-2 text-sm items-center space-x-1">
                                <ShareIcon className="w-4 h-4" />
                                <p className="">Crosspost</p>
                            </div>
                        )}
                        <p>{post.data.subreddit_name_prefixed}</p>
                        <p>·</p>
                        <p className="cursor-pointer text-blue-500 hover:underline">
                            {post.data.author}
                        </p>
                        <p>·</p>
                        <p>{timeSince(new Date(post.data.created * 1000))}</p>
                    </div>

                    <p key={post.data.id} className="text-white text-xl">
                        {post.data.title}
                    </p>
                </div>
            </div>

            <div className="m-4 space-y-4">
                {crossposted && <CrosspostedContent post={post.data.crosspost_parent_list} />}

                {post.data.is_self && post.data.selftext_html?.length > 0 ? (
                    <div
                        className={`${styles.body} p-4 bg-zinc-900 rounded-lg text-gray-300 text-sm`}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.data.selftext_html)
                        }}></div>
                ) : (
                    <></>
                )}

                {!crossposted && !post.data.is_self && <MediaContent post={post.data} />}

                <div className="flex justify-center items-center bg-zinc-900 h-52 rounded-lg">
                    <textarea
                        className="bg-zinc-900 border-[0.1px] border-gray-900 rounded-lg h-full w-full p-2 text-white resize-none"
                        placeholder="Post something.."
                    />
                </div>

                <Comments
                    id={post.data.id}
                    subreddit={post.data.subreddit_name_prefixed}
                    author={post.data.author}
                />
            </div>
        </div>
    );
}

export default ModalPost;
