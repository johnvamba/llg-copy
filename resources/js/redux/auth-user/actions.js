import {
    SET_PROFILE,
    SET_ROLES,
} from './types';

export const setProfile = (params) => ({
    type: SET_PROFILE,
    payload: params
})

export const setRoles = (params) => ({
    type: SET_ROLES,
    payload: params
})