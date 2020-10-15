import {
    SET_ORGANIZATIONS,
} from './types';

let initialState = {
    organizations: []
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_ORGANIZATIONS:
            return {
                ...state,
                organizations: payload
            }
            break;
        default :
            return state;
            break;
    }
}