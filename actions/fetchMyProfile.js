import axios from 'axios';

//actions
const FETCH_MY_PROFILE_SUCCESS = 'FETCH_MY_PROFILE_SUCCESS';
const FETCH_MY_PROFILE_FAILURE = 'FETCH_MY_PROFILE_FAILURE';

//action creators
const fetchMyProfileSuccess = (data) => {
  return {
    type: FETCH_MY_PROFILE_SUCCESS,
    payload: data,
  };
};

const fetchMyProfileFailure = (error) => {
  return {
    type: FETCH_MY_PROFILE_FAILURE,
    payload: error,
  };
};

// async api request with redux-thunk
async function fetchMyProfile(token, user) {
  return new Promise(function(resolve, reject) {
    axios.get(`https://oauth.reddit.com/api/v1/me?raw_json=1`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => res.data)
    .then((data) => {
        if (data == null) {
          throw "FetchProfileNullException";
        }
        return resolve(fetchMyProfileSuccess(data));
      })
      .catch((error) => {
          return reject(fetchMyProfileFailure(error));
      });
  });
};

export {
  FETCH_MY_PROFILE_SUCCESS,
  FETCH_MY_PROFILE_FAILURE,
  fetchMyProfile,
};