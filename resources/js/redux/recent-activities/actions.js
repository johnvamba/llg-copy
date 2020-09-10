import {
    SET_TODAY_ACTIVITIES,
    SET_YESTERDAY_ACTIVITIES,
} from './types';

export const setTodayActivities = (params) => ({
    type: SET_TODAY_ACTIVITIES,
    payload: params
});

export const setYesterdayActivities = (params) => ({
    type: SET_YESTERDAY_ACTIVITIES,
    payload: params
});