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

// async api request with redux-thunk
async function fetchComments(token, id, subreddit, sort) {
  return new Promise(function(resolve, reject) {
    axios.get(`https://oauth.reddit.com/${subreddit}/comments/${id}/${sort}.json?raw_json=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => res.data)
    .then((res) => {
        if (res == null) {
          throw "FetchCommentsNullException";
        }
        const data = res[1]?.data?.children;

        return resolve(fetchCommentsSuccess(data));
      })
      .catch((error) => {
          return reject(fetchCommentsFailure(error));
      });
  });
};

export {
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  fetchComments,
};