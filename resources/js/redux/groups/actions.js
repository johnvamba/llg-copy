import {
    SET_GROUPS
} from './types';

export const setGroups = (params) => ({
    type: SET_GROUPS,
    payload: params
})