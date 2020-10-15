import {
    SET_TODAY_ACTIVITIES,
    SET_YESTERDAY_ACTIVITIES,
} from './types';

let initialState = {
    todayActivities: [],
    yesterdayActivities: []
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_TODAY_ACTIVITIES:
            return {
                ...state,
                todayActivities: payload
            }
            break;
        case SET_YESTERDAY_ACTIVITIES:
            return {
                ...state,
                yesterdayActivities: payload
            }
            break;
        default :
            return state;
            break;
    }
}