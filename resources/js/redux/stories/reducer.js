import {
    SET_STORIES,
} from './types';

let initialState = {
    stories: []
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_STORIES:
            return {
                ...state,
                stories: payload
            }
            break;
        default :
            return state;
            break;
    }
}