import axios from 'axios';
import { BASE_QUERY_URL } from '../lib/reddit';

//actions
// const FETCH_POSTS_SUCCESS = 'FETCH_MY_PROFILE_SUCCESS';
// const FETCH_POSTS_FAILURE = 'FETCH_MY_PROFILE_FAILURE';

// //action creators
// const fetchPostsSuccess = (data) => {
//   return {
//     type: FETCH_POSTS_SUCCESS,
//     payload: data,
//   };
// };

// const fetchPostsFailure = (error) => {
//   return {
//     type: FETCH_POSTS_FAILURE,
//     payload: error,
//   };
// };

// async api request with redux-thunk
async function postVote(token, id, dir) {
    axios.post(`${BASE_QUERY_URL}api/vote?dir=${dir}&id=t3_${id}&rank=2`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
          console.log(err)
    });
};

export {
  postVote,
};