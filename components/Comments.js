import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchComments, FETCH_COMMENTS_SUCCESS } from '../actions/fetchComments';
import Comment from './Comment';
import LinearProgress from '@mui/material/LinearProgress';

function Comments({ id, subreddit, author }) {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [sort] = useState('top');

    useEffect(() => {
        async function fetchData() {
            try {
                var res = await fetchComments(session.user.accessToken, id, subreddit, sort);

                if (res.type === FETCH_COMMENTS_SUCCESS) {
                    setComments(() => [...res.payload]);
                }
            } catch (err) {
                console.log(`${err.type} - ${err.payload?.stack}`);
            }
        }
        fetchData();
    }, [session, subreddit]);

    return (
        <div className="bg-zinc-900 rounded-lg overflow-hidden">
            {comments.length ? <div className="h-1"></div> : <LinearProgress color="warning" />}
            <div className="px-4 space-y-3 mt-3">
                {comments.length ? (
                    comments
                        .filter((comment) => comment.data.author)
                        .map((comment, i) => (
                            <Comment
                                key={comment.data.id}
                                comment={comment}
                                isPostAuthor={author === comment.data.author}
                                id={i + 1}
                            />
                        ))
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export default Comments;
