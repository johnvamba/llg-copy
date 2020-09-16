import {
    SET_STORIES
} from './types';

export const setStories = (params) => ({
    type: SET_STORIES,
    payload: params
})