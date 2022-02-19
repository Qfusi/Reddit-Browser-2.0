import axios from 'axios';

//actions
const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS';
const FETCH_SEARCH_RESULTS_FAILURE = 'FETCH_SEARCH_RESULTS_FAILURE';

//action creators
const fetchSearchResultsSuccess = (data) => {
    return {
        type: FETCH_SEARCH_RESULTS_SUCCESS,
        payload: data
    };
};

const fetchSearchResultsFailure = (error) => {
    return {
        type: FETCH_SEARCH_RESULTS_FAILURE,
        payload: error
    };
};

async function fetchSearchResults(token, query) {
    var response = await axios.get(
        `https://oauth.reddit.com/api/search_reddit_names.json?query=${query}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return new Promise(function (resolve, reject) {
        try {
            var subscriptions = response.data.names;
            return resolve(fetchSearchResultsSuccess(subscriptions));
        } catch (error) {
            return reject(fetchSearchResultsFailure(error));
        }
    });
}

export { FETCH_SEARCH_RESULTS_SUCCESS, FETCH_SEARCH_RESULTS_FAILURE, fetchSearchResults };
