import axios from 'axios';

// actions
const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS';
const POST_VOTE_FAILURE = 'POST_VOTE_FAILURE';

//action creators
const postVoteSuccess = (data) => {
  return {
    type: POST_VOTE_SUCCESS,
    payload: data,
  };
};

const postVoteFailure = (error) => {
  return {
    type: POST_VOTE_FAILURE,
    payload: error,
  };
};

async function postVote(token, id, dir) {
    axios({
        method: 'post',
        url: '/api/cors',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            "id": id,
            "dir": dir
        }
    }).then(res => { //Silent responses for now
        // return resolve(fetchPostsSuccess(res));
    }).catch(error => {
        // return reject(fetchPostsFailure(error));
    });
};

export {
  postVote,
  POST_VOTE_SUCCESS,
  POST_VOTE_FAILURE
};