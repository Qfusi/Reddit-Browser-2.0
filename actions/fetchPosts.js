import axios from 'axios';

//actions
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

//action creators
const fetchPostsSuccess = (data) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: data
    };
};

const fetchPostsFailure = (error) => {
    return {
        type: FETCH_POSTS_FAILURE,
        payload: error
    };
};

async function fetchPosts(token, subreddit, sort, sortTop) {
    var response = null;
    if (subreddit !== undefined) {
        response = await axios.get(
            `https://oauth.reddit.com/${subreddit}/${sort}.json?limit=75&t=${sortTop}&raw_json=1`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                timeout: 5000
            }
        );
    } else {
        response = await axios.get(
            `https://oauth.reddit.com/${sort}?limit=75&t=${sortTop}&raw_json=1`, //TODO
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                timeout: 5000
            }
        );
    }

    return new Promise(function (resolve, reject) {
        try {
            var posts = response.data.data.children;
            return resolve(fetchPostsSuccess(posts));
        } catch (error) {
            return reject(fetchPostsFailure(error));
        }
    });
}

export { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, fetchPosts };
