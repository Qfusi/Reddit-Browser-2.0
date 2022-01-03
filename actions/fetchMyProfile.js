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

async function fetchMyProfile(token) {
    var response = await axios.get(
        `https://oauth.reddit.com/api/v1/me?raw_json=1`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return new Promise(function (resolve, reject) {
        try {
            var profile = response.data;
            return resolve(fetchMyProfileSuccess(profile));
        } catch (error) {
            return reject(fetchMyProfileFailure(error));
        }
    });
}

export { FETCH_MY_PROFILE_SUCCESS, FETCH_MY_PROFILE_FAILURE, fetchMyProfile };
