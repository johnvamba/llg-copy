import {
    SET_GROUPS,
} from './types';

let initialState = {
    groups: []
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_GROUPS:
            return {
                ...state,
                groups: payload
            }
            break;
        default :
            return state;
            break;
    }
}