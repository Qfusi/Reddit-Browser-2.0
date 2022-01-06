import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { itemVote } from '../actions/itemVote';

function ItemVote({ item, horizontal }) {
    const { data: session } = useSession();
    const [originalVoteState, setOriginalVoteState] = useState(undefined);
    const [localVoteState, setLocalVoteState] = useState(undefined);
    const [scoreStyle, setScoreStyle] = useState('');
    const [localScoreAddition, setLocalScoreAddition] = useState(0);
    const [upvoteEffect, setUpvoteEffect] = useState(false);
    const [downvoteEffect, setDownvoteEffect] = useState(false);

    useEffect(() => {
        // set value only on initial render
        if (originalVoteState == undefined) {
            setOriginalVoteState(item.data.likes);
            setLocalVoteState(item.data.likes);
        }
    }, []);

    useEffect(() => {
        if (item.data.likes) {
            setLocalVoteState(true);
            setScoreStyle('orange');
            setLocalScoreAddition(1);
        } else if (item.data.likes == false) {
            setLocalVoteState(false);
            setScoreStyle('blue');
            setLocalScoreAddition(-1);
        } else {
            setLocalVoteState(null);
            setScoreStyle('');
            setLocalScoreAddition(0);
        }
    }, [item.data.likes]);

    function setItemLike(vote) {
        if (item.data.likes == vote) {
            item.data.likes = null;
        } else if (!item.data.likes && vote) {
            item.data.likes = true;
        } else if (item.data.likes && !vote) {
            item.data.likes = false;
        } else {
            item.data.likes = vote;
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
                itemVote(session.user.accessToken, item.data.id, dir, item.kind)
                    .then(() => {
                        // Silent responses for now
                        // console.log(res);
                    })
                    .catch(() => {
                        // console.log(err);
                    });
            }
        }, 10000),
        []
    );

    return (
        <div
            className={`flex space-y-1 items-center 
    ${horizontal ? 'space-x-2' : 'flex-col'}`}>
            <ArrowUpIcon
                className={`h-5 w-5 hover:text-orange-500 transition-colors ease-out delay-150 cursor-pointer
            ${upvoteEffect && 'animate-pulse'}
            ${localVoteState && 'text-orange-500'}`}
                onClick={() => {
                    setUpvoteEffect(true);
                    setItemLike(true);
                }}
                onAnimationEnd={() => setUpvoteEffect(false)}
            />
            <p className={`text-xs text-${scoreStyle}-500`}>
                {item.data.score + localScoreAddition}
            </p>
            <ArrowDownIcon
                className={`h-5 w-5 hover:text-blue-500 transition-colors ease-out cursor-pointer
            ${downvoteEffect && 'animate-pulse'}
            ${localVoteState == false && 'text-blue-500'}`}
                onClick={() => {
                    setDownvoteEffect(true);
                    setItemLike(false);
                }}
                onAnimationEnd={() => setDownvoteEffect(false)}
            />
        </div>
    );
}

export default ItemVote;
