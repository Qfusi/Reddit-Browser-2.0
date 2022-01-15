import { ArrowsExpandIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ItemVote from './ItemVote';
import { timeSince } from '../lib/timeAndDateHelper';
import { BsPinAngle } from 'react-icons/bs';
import styles from '../styles/Comment.module.css';
import DOMPurify from 'dompurify';

function Comment({ comment, isPostAuthor }) {
    const { data: session } = useSession();
    const [subTree] = useState(comment.data?.replies?.data?.children);
    const [collapsed, setCollapsed] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [author, setAuthor] = useState(null);

    const animationEnd = (collapse) => {
        if (fadeOut) {
            setFadeOut(false);
            setCollapsed(collapse);
        }
    };

    useEffect(() => {
        async function fetchAuthor() {
            if (comment.data.author !== '[deleted]') {
                try {
                    var res = await axios.get(
                        `https://oauth.reddit.com/user/${comment.data.author}/about.json?raw_json=1`,
                        {
                            headers: {
                                Authorization: `Bearer ${session.user.accessToken}`
                            }
                        }
                    );
                    setAuthor(res.data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchAuthor();
    }, [comment]);

    return (
        <>
            {collapsed ? ( //Fix so this doesn't re-render but rather hide content - otherwise we get unecessary API calls, re-renders and comment state is lost
                <div
                    className={`grid grid-cols-24 text-gray-300 ${
                        fadeOut ? 'animate-fade-out-left' : 'animate-fade-in-right'
                    }`}
                    onAnimationEnd={() => animationEnd(false)}>
                    <div className="col-span-1 flex items-center min-w-fit mr-4 justify-center">
                        <ArrowsExpandIcon
                            className={`h-4 w-4 cursor-pointer hover:text-white hover:scale-105`}
                            onClick={() => setFadeOut(true)}
                        />
                    </div>
                    <div className="col-span-23 flex min-w-fit space-x-4 items-center">
                        <img
                            className="h-6 w-6 cursor-pointer rounded-full hover:scale-110 transition-all"
                            src={author?.icon_img ?? author?.snoovatar_img}
                            alt=""
                        />
                        <p
                            className={`cursor-pointer ${
                                isPostAuthor
                                    ? 'px-2 bg rounded-lg bg-blue-800 hover:bg-blue-600'
                                    : 'text-blue-500 hover:underline'
                            }`}>
                            {comment.data.author}
                        </p>
                        <p className="text-xs text-gray-500">
                            · {timeSince(new Date(comment.data.created * 1000))}
                        </p>
                        {comment.data.stickied ? (
                            <BsPinAngle className="h-4 w-4 text-green-500" />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            ) : (
                <div
                    className={`grid grid-cols-24 text-gray-300 ${
                        fadeOut ? 'animate-fade-out-left' : 'animate-fade-in-right'
                    }`}
                    onAnimationEnd={() => animationEnd(true)}>
                    <div className="col-span-1 flex flex-col min-w-fit mr-4 items-center space-y-3">
                        <img
                            className="h-6 w-6 min-h-fit min-w-fit cursor-pointer rounded-full hover:scale-110 transition-all"
                            src={author?.icon_img ?? author?.snoovatar_img}
                            alt=""
                        />
                        <div
                            className="flex justify-center group w-5 h-full cursor-pointer"
                            onClick={() => setFadeOut(true)}>
                            <div className="w-0.5 h-full bg-zinc-800 group-hover:bg-zinc-500"></div>
                        </div>
                    </div>

                    <div className="col-span-23 flex flex-col items-start space-y-1">
                        <div className="flex items-center space-x-2">
                            <p
                                className={`cursor-pointer ${
                                    isPostAuthor
                                        ? 'px-2 bg rounded-lg bg-blue-800 hover:bg-blue-600'
                                        : 'text-blue-500 hover:underline'
                                }`}>
                                {comment.data.author}
                            </p>
                            <p className="text-xs text-gray-500">
                                · {timeSince(new Date(comment.data.created * 1000))}
                            </p>
                            {comment.data.stickied ? (
                                <BsPinAngle className="h-4 w-4 text-green-500" />
                            ) : (
                                <></>
                            )}
                            {comment.data.mod ? (
                                <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div
                            className={`${styles.comment} text-sm pb-2`}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(comment.data.body_html)
                            }}></div>
                        <ItemVote item={comment} horizontal={true} />

                        {/* children */}
                        <div>
                            <div className="space-y-2 mt-2">
                                {subTree?.length ? (
                                    subTree
                                        .filter((comment) => comment.data.author)
                                        .map((child, i) => (
                                            <Comment
                                                key={child.data.id}
                                                comment={child}
                                                isPostAuthor={author === child.data.author}
                                                id={i + 1}
                                            />
                                        ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Comment;
