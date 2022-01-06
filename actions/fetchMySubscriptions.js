import axios from 'axios';

//actions
const FETCH_MY_SUBSCRIPTIONS_SUCCESS = 'FETCH_MY_SUBSCRIPTIONS_SUCCESS';
const FETCH_MY_SUBSCRIPTIONS_FAILURE = 'FETCH_MY_SUBSCRIPTIONS_FAILURE';

//action creators
const fetchMySubscriptionsSuccess = (data) => {
    return {
        type: FETCH_MY_SUBSCRIPTIONS_SUCCESS,
        payload: data
    };
};

const fetchMySubscriptionsFailure = (error) => {
    return {
        type: FETCH_MY_SUBSCRIPTIONS_FAILURE,
        payload: error
    };
};

async function fetchMySubscriptions(token) {
    var response = await axios.get(`https://oauth.reddit.com/subreddits/mine/subscriber?limit=75`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return new Promise(function (resolve, reject) {
        try {
            var subscriptions = response.data.data.children;
            return resolve(fetchMySubscriptionsSuccess(subscriptions));
        } catch (error) {
            return reject(fetchMySubscriptionsFailure(error));
        }
    });
}

export { FETCH_MY_SUBSCRIPTIONS_SUCCESS, FETCH_MY_SUBSCRIPTIONS_FAILURE, fetchMySubscriptions };
