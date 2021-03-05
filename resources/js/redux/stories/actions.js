import {
    SET_STORIES,
    SET_NEED_ID,
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

export const setNeedId = (params = null) => ({
    type: SET_NEED_ID,
    payload: params
})