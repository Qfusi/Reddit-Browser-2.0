import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid"
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { postVote } from "../actions/postVote";

function PostVote({ post }) {
    const { data: session } = useSession();
    const [originalVoteState, setOriginalVoteState] = useState(undefined);
    const [localVoteState, setLocalVoteState] = useState(undefined);
    const [scoreStyle, setScoreStyle] = useState("");
    const [localScoreAddition, setLocalScoreAddition] = useState(0);
    const [upvoteEffect, setUpvoteEffect] = useState(false);
    const [downvoteEffect, setDownvoteEffect] = useState(false);

    useEffect(() => { // set value only on initial render
        if (originalVoteState == undefined) {
            setOriginalVoteState(post.data.likes)
            setLocalVoteState(post.data.likes)
        }
    }, []);

    useEffect(() => {
        if (post.data.likes) {
            setLocalVoteState(true);
            setScoreStyle("orange");
            setLocalScoreAddition(1);
        }
        else if (post.data.likes == false) {
            setLocalVoteState(false);
            setScoreStyle("blue");
            setLocalScoreAddition(-1);
        }
        else {
            setLocalVoteState(null);
            setScoreStyle("");
            setLocalScoreAddition(0);
        }
    }, [post.data.likes]);

    function setPostLike(vote) {
        if (post.data.likes == vote) {
            post.data.likes = null;
        } else if (!post.data.likes && vote) {
            post.data.likes = true;
        } else if (post.data.likes && !vote) {
            post.data.likes = false;
        } else {
            post.data.likes = vote;
        }
    }

    useEffect(() => {
        if (localVoteState != originalVoteState) {
            debouncedVote(localVoteState, originalVoteState);
        }
    }, [localVoteState, originalVoteState]);

    const debouncedVote = useCallback(
        debounce((localVoteState, originalVoteState) => {
            if (localVoteState != originalVoteState) {
                var dir = 0;
                if (localVoteState) {
                    dir = 1;
                } else if (localVoteState == false) {
                    dir = -1;
                }
                postVote(session.user.accessToken, post.data.id, dir)
                .then((res) => { // Silent responses for now
                    // console.log(res);
                })
                .catch((err) => {
                    // console.log(err);
                });
            }
        }, 20000), []
    );

    return (
        <div className="col-span-1 flex flex-col space-y-1 ml-auto items-center">
        <ArrowUpIcon className={`h-5 w-5 hover:text-orange-500 transition-colors ease-out delay-150 cursor-pointer
            ${upvoteEffect && "animate-pulse"}
            ${localVoteState && "text-orange-500"}`}
            onClick={() => {
                setUpvoteEffect(true);
                setPostLike(true);
            }}
            onAnimationEnd={() => setUpvoteEffect(false)}
        />
        <p className={`text-xs text-${scoreStyle}-500`}>{post.data.score + localScoreAddition}</p>
        <ArrowDownIcon className={`h-5 w-5 hover:text-blue-500 transition-colors ease-out cursor-pointer
            ${downvoteEffect && "animate-pulse"}
            ${localVoteState == false && "text-blue-500"}`}
            onClick={() => {
                setDownvoteEffect(true);
                setPostLike(false);
            }}
            onAnimationEnd={() => setDownvoteEffect(false)}
        />
    </div>
    )
}

export default PostVote
