import {
    SET_TODAY_DONATION,
    SET_WEEK_DONATION,
    SET_MONTH_DONATION
} from './types';

let initialState = {
    todayDonation: 0,
    weekDonation: 0,
    monthDonation: 0,
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_TODAY_DONATION:
            return {
                ...state,
                todayDonation: payload
            }
            break;
        case SET_WEEK_DONATION:
            return {
                ...state,
                weekDonation: payload
            }
            break;
        case SET_MONTH_DONATION:
            return {
                ...state,
                monthDonation: payload
            }
            break;
        default :
            return state;
            break;
    }
}