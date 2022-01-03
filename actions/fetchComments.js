import axios from 'axios';

//actions
const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

//action creators
const fetchCommentsSuccess = (data) => {
    return {
        type: FETCH_COMMENTS_SUCCESS,
        payload: data,
    };
};

const fetchCommentsFailure = (error) => {
    return {
        type: FETCH_COMMENTS_FAILURE,
        payload: error,
    };
};

async function fetchComments(token, id, subreddit, sort) {
    var response = await axios.get(
        `https://oauth.reddit.com/${subreddit}/comments/${id}/${sort}.json?raw_json=1`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return new Promise(function (resolve, reject) {
        try {
            var comments = response?.data[1]?.data?.children;
            return resolve(fetchCommentsSuccess(comments));
        } catch (error) {
            return reject(fetchCommentsFailure(error));
        }
    });
}

export { FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE, fetchComments };
