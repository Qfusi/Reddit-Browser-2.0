const scopes = [
    "identity",
    "account",
    "mysubreddits",
    "read",
    "vote",
    

    // "edit",
    // "flair",
    // "history",
    // "modconfig",
    // "modflair",
    // "modlog",
    // "modposts",
    // "modwiki",
    // "mysubreddits",
    // "privatemessages",
    // "read",
    // "report",
    // "save",
    // "submit",
    // "subscribe",
    // "wikiedit",
    // "wikiread"
].join(' ');

const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent&${queryParamString.toString()}`
const BASE_QUERY_URL = `https://oauth.reddit.com/`

export { LOGIN_URL };
export { BASE_QUERY_URL };