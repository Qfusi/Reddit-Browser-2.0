import axios from 'axios';

//actions
const FETCH_POSTS_SUCCESS = 'FETCH_MY_PROFILE_SUCCESS';
const FETCH_POSTS_FAILURE = 'FETCH_MY_PROFILE_FAILURE';

//action creators
const fetchPostsSuccess = (data) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: data,
  };
};

const fetchPostsFailure = (error) => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error,
  };
};

// async api request with redux-thunk
async function fetchPosts(token, subreddit, sort) {
  return new Promise(function(resolve, reject) {
    axios.get(`https://oauth.reddit.com/${subreddit}/${sort}.json?limit=75`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => res.data)
    .then((res) => {
        if (res == null) {
          throw "FetchPostsNullException";
        }
        const data = res.data.children;

        return resolve(fetchPostsSuccess(data));
      })
      .catch((error) => {
          return reject(fetchPostsFailure(error));
      });
  });
};

export {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  fetchPosts,
};