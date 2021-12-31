import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from "@heroicons/react/outline"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ItemVote from "./ItemVote";
import { timeSince } from "../lib/timeAndDateHelper";

function Comment({comment}) {
    const { data: session } = useSession();
    const [collapsed, setCollapsed] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (comment.data.author !== "[deleted]")
        {
            axios.get(`https://oauth.reddit.com/user/${comment.data.author}/about.json?raw_json=1`, {
                headers: {
                    Authorization: `Bearer ${session.user.accessToken}`,
                },
            })
            .then((res) => res.data)
            .then((res) => {
                setProfileImage(res.data.icon_img ?? res.data.snoovatar_img);
            });
        }
    }, [comment]);

    return (
        <div className="grid grid-cols-12 text-gray-300 border-b-[0.1px] border-zinc-800">
            {collapsed
            ?
                <div className="col-span-12 flex mb-2 ml-4 min-w-fit space-x-4 items-center">
                    <ChevronDoubleUpIcon className="h-5 w-5 cursor-pointer" onClick={() => setCollapsed(false)}/>
                    <img className="h-6 w-6 cursor-pointer rounded-full" src={profileImage} alt="" />
                    <p className="cursor-pointer hover:underline">{comment.data.author}</p>
                    <p className="text-xs text-gray-500">
                        · {timeSince(new Date(comment.data.created * 1000))}
                    </p>
                </div>
            :
                <>
                    <div className="col-span-1 flex flex-col min-w-fit mr-4 items-center space-y-3">
                        <img className="h-6 w-6 cursor-pointer rounded-full" src={profileImage} alt="" />
                        <ChevronDoubleDownIcon className="h-5 w-5 cursor-pointer" onClick={() => setCollapsed(true)}/>
                    </div>

                    <div className="col-span-11 flex flex-col mb-3 items-start space-y-1">
                        <div className="flex items-center space-x-2">
                            <p className="cursor-pointer hover:underline">{comment.data.author}</p>
                            <p className="text-xs text-gray-500">
                                · {timeSince(new Date(comment.data.created * 1000))}
                            </p>
                        </div>
                        <p className="text-sm">{comment.data.body}</p>
                        <ItemVote item={comment} horizontal={true} />
                    </div>
                </>
            }
        </div>
    )
}

export default Comment
