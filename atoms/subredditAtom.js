import { atom } from 'recoil';

export const subredditIdState = atom({
    key: 'subredditIdState',
    default: ''
});

export const subredditClickedState = atom({
    key: 'subredditClickedState',
    default: false
});

export const subSortState = atom({
    key: 'subSortState',
    default: 'hot'
});

export const subTopSortState = atom({
    key: 'subTopSortState',
    default: 'month'
});
