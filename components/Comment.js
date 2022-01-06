import { MinusSmIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ItemVote from './ItemVote';
import { timeSince } from '../lib/timeAndDateHelper';
import { BsPinAngle } from 'react-icons/bs';
import { PlusSmIcon } from '@heroicons/react/solid';

function Comment({ comment }) {
    const { data: session } = useSession();
    const [collapsed, setCollapsed] = useState(false);
    const [author, setAuthor] = useState(null);

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
        <div className="grid grid-cols-12 text-gray-300 border-b-[0.1px] border-zinc-800">
            {collapsed ? (
                <div className="col-span-12 flex mb-2 ml-4 min-w-fit space-x-4 items-center">
                    <PlusSmIcon
                        className="h-5 w-5 cursor-pointer hover:text-white hover:scale-110"
                        onClick={() => setCollapsed(false)}
                    />
                    <img
                        className="h-6 w-6 cursor-pointer rounded-full"
                        src={author?.icon_img ?? author?.snoovatar_img}
                        alt=""
                    />
                    <p className="cursor-pointer hover:underline">{comment.data.author}</p>
                    <p className="text-xs text-gray-500">
                        · {timeSince(new Date(comment.data.created * 1000))}
                    </p>
                    {comment.data.stickied ? <BsPinAngle className="h-4 w-4 text-green-500" /> : ''}
                </div>
            ) : (
                <>
                    <div className="col-span-1 flex flex-col min-w-fit mr-4 items-center space-y-3">
                        <img
                            className="h-6 w-6 cursor-pointer rounded-full"
                            src={author?.icon_img ?? author?.snoovatar_img}
                            alt=""
                        />
                        <MinusSmIcon
                            className="h-5 w-5 cursor-pointer hover:text-white hover:scale-110"
                            onClick={() => setCollapsed(true)}
                        />
                    </div>

                    <div className="col-span-11 flex flex-col mb-3 items-start space-y-1">
                        <div className="flex items-center space-x-2">
                            <p className="cursor-pointer hover:underline">{comment.data.author}</p>
                            <p className="text-xs text-gray-500">
                                · {timeSince(new Date(comment.data.created * 1000))}
                            </p>
                            {comment.data.stickied ? (
                                <BsPinAngle className="h-4 w-4 text-green-500" />
                            ) : (
                                ''
                            )}
                            {comment.data.mod ? (
                                <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                            ) : (
                                ''
                            )}{' '}
                            {/*TODO*/}
                        </div>
                        <p className="text-sm">{comment.data.body}</p>
                        <ItemVote item={comment} horizontal={true} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Comment;
