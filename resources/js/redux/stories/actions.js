import {
    SET_STORIES,
    SET_ORG
} from './types';

export const setStories = (params) => ({
    type: SET_STORIES,
    payload: params
})

export const setOrg = (params = null) => ({
    type: SET_ORG,
    payload: params
})