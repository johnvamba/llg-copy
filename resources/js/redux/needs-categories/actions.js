import {
    SET_CATEGORIES
} from './types';

export const setCategories = (params) => ({
    type: SET_CATEGORIES,
    payload: params
})