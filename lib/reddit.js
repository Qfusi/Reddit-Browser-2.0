const scopes = [
    "identity",
    "account",
    "mysubreddits",
    "read",
].join(' ');

const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent&${queryParamString.toString()}`

export { LOGIN_URL };