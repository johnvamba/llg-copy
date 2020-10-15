import {
    SET_ORGANIZATIONS
} from './types';

export const setOrganizations = (params) => ({
    type: SET_ORGANIZATIONS,
    payload: params
})