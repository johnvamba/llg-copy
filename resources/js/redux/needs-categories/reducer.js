import {
    SET_CATEGORIES,
} from './types';

let initialState = {
    categories: []
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
            break;
        default :
            return state;
            break;
    }
}