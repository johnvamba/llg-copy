import {
    SET_OFFERS,
} from './types';

let initialState = {
    offers: []
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_OFFERS:
            return {
                ...state,
                offers: payload
            }
            break;
        default :
            return state;
            break;
    }
}