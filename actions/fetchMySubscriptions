import axios from 'axios';

//actions
const FETCH_MY_SUBSCRIPTIONS_SUCCESS = 'FETCH_MY_SUBSCRIPTIONS_SUCCESS';
const FETCH_MY_SUBSCRIPTIONS_FAILURE = 'FETCH_MY_SUBSCRIPTIONS_FAILURE';

//action creators
const fetchMySubscriptionsSuccess = (data) => {
  return {
    type: FETCH_MY_SUBSCRIPTIONS_SUCCESS,
    payload: data,
  };
};

const fetchMySubscriptionsFailure = (error) => {
  return {
    type: FETCH_MY_SUBSCRIPTIONS_FAILURE,
    payload: error,
  };
};

// async api request with redux-thunk
async function fetchMySubscriptions(token) {
  return new Promise(function(resolve, reject) {
    axios.get(`https://oauth.reddit.com/subreddits/mine/subscriber?limit=75`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => res.data)
    .then((res) => {
        if (res == null) {
          throw "FetchProfileNullException";
        }
        const data = res.data.children;
        return resolve(fetchMySubscriptionsSuccess(data));
      })
      .catch((error) => {
          return reject(fetchMySubscriptionsFailure(error));
      });
  });
};

export {
    FETCH_MY_SUBSCRIPTIONS_SUCCESS,
    FETCH_MY_SUBSCRIPTIONS_FAILURE,
  fetchMySubscriptions,
};