import {
    SET_SEARCH
} from './types';

let initialState = {
    search: null
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_SEARCH:
            return {
                ...state,
                search: payload != '' ? payload : null 
            }
            break;
        default :
            return state;
            break;
    }
}