import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchComments, FETCH_COMMENTS_SUCCESS } from "../actions/fetchComments";
import Comment from "./Comment"

function Comments({ id, subreddit}) {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [sort, setSort] = useState("top");

    useEffect(() => {
        fetchComments(session.user.accessToken, id, subreddit, "top")
        .then((res) => {
            if (res.type === FETCH_COMMENTS_SUCCESS) {
                setComments(() => [...res.payload]);
            }
        })
        .catch((err) => {
            console.log(`${err.type} - ${err.payload?.stack}`);
        });
    }, [session, subreddit]);

    return (
        <div className="bg-zinc-900 rounded-lg p-4 space-y-10">
            {comments.length ? comments.map((comment, i) => (
                <Comment key={comment.data.id} comment={comment} id={i + 1} />
            )) : <p>loading comments..</p>}
        </div>
    )
}

export default Comments
