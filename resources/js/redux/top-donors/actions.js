import {
    SET_TOP_DONORS
} from './types';

export const setTopDonors = (params) => ({
    type: SET_TOP_DONORS,
    payload: params
});
