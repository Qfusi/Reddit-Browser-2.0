import axios from 'axios';

//actions
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

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

async function fetchPosts(token, subreddit, sort) {
  return new Promise(async function(resolve, reject) {
    try {
      var response = await axios.get(`https://oauth.reddit.com/${subreddit}/${sort}.json?limit=75`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      var posts = response.data.data.children;
      return resolve(fetchPostsSuccess(posts));
    } catch (error) {
      return reject(fetchPostsFailure(error));
    }
  });
};

export {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  fetchPosts,
};