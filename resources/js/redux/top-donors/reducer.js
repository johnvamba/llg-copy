import {
    SET_TOP_DONORS,
} from './types';

let initialState = {
    topDonors: []
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_TOP_DONORS:
            return {
                ...state,
                topDonors: payload
            }
            break;
        default :
            return state;
            break;
    }
}