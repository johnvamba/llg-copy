import {
    SET_NEEDS
} from './types';

export const setNeeds = (params) => ({
    type: SET_NEEDS,
    payload: params
})