import axios from 'axios';

// actions
const ITEM_VOTE_SUCCESS = 'ITEM_VOTE_SUCCESS';
const ITEM_VOTE_FAILURE = 'ITEM_VOTE_FAILURE';

//action creators
// const itemVoteSuccess = (data) => {
//     return {
//         type: ITEM_VOTE_SUCCESS,
//         payload: data,
//     };
// };

// const itemVoteFailure = (error) => {
//     return {
//         type: ITEM_VOTE_FAILURE,
//         payload: error,
//     };
// };

async function itemVote(token, id, dir, type_prefix) {
    try {
        await axios({
            method: 'post',
            url: '/api/cors',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: id,
                dir: dir,
                type_prefix: type_prefix,
            },
        });
        // return resolve(fetchPostsSuccess(res));
    } catch (error) {
        // return reject(fetchPostsFailure(error));
    }
}

export { itemVote, ITEM_VOTE_SUCCESS, ITEM_VOTE_FAILURE };
