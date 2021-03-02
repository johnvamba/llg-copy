import {
    SET_PROFILE,
    SET_ROLES,
    SET_ORG,
    SET_LOC
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

export const setLoc = (params) => ({
    type: SET_LOC,
    payload: params
})