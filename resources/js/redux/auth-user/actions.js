import {
    SET_PROFILE,
    SET_ROLES,
    SET_ORG
} from './types';

export const setProfile = (params) => ({
    type: SET_PROFILE,
    payload: params
})

export const setRoles = (params) => ({
    type: SET_ROLES,
    payload: params
})

export const setOrg = (params) => ({
    type: SET_ORG,
    payload: params
})