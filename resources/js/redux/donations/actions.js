import {
    SET_TODAY_DONATION,
    SET_WEEK_DONATION,
    SET_MONTH_DONATION,
} from './types';

export const setTodayDonation = (params) => ({
    type: SET_TODAY_DONATION,
    payload: params
})

export const setWeekDonation = (params) => ({
    type: SET_WEEK_DONATION,
    payload: params
})

export const setMonthDonation = (params) => ({
    type: SET_MONTH_DONATION,
    payload: params
})