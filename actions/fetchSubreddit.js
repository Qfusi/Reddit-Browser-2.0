import axios from 'axios';

//actions
const FETCH_SUBREDDIT_SUCCESS = 'FETCH_SUBREDDIT_SUCCESS';
const FETCH_SUBREDDIT_FAILURE = 'FETCH_SUBREDDIT_FAILURE';

//action creators
const fetchSubredditSuccess = (data) => {
    return {
        type: FETCH_SUBREDDIT_SUCCESS,
        payload: data
    };
};

const fetchSubredditFailure = (error) => {
    return {
        type: FETCH_SUBREDDIT_FAILURE,
        payload: error
    };
};

async function fetchSubreddit(token, subreddit) {
    var response = await axios.get(`https://oauth.reddit.com/${subreddit}/about`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return new Promise(function (resolve, reject) {
        try {
            var subscriptions = response.data.data;
            return resolve(fetchSubredditSuccess(subscriptions));
        } catch (error) {
            return reject(fetchSubredditFailure(error));
        }
    });
}

export { FETCH_SUBREDDIT_SUCCESS, FETCH_SUBREDDIT_FAILURE, fetchSubreddit };
