import {
    SET_SEARCH
} from './types';

export const setSearch = (params) => ({
    type: SET_SEARCH,
    payload: params
});