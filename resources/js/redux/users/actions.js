import {
    SET_USERS
} from './types';

export const setUsers = (params) => ({
    type: SET_USERS,
    payload: params
});