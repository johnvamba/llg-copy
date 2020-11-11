import {
    SET_NEEDS,
    SET_FILTERS
} from './types';

export const setNeeds = (params) => ({
    type: SET_NEEDS,
    payload: params
})


export const setFilters = (set) => ({
    type: SET_FILTERS,
    payload: { filter: true, ...set }
})