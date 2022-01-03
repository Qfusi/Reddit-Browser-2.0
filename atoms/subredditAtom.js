import { atom } from 'recoil';

export const subredditIdState = atom({
    key: 'subredditIdState',
    default: '',
});

export const subredditClickedState = atom({
    key: 'subredditClickedState',
    default: false,
});
