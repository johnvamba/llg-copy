import {
    SET_STORIES,
    SET_ORG
} from './types';

let initialState = {
    stories: [],
    org: null,
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_STORIES:
            return {
                ...state,
                stories: payload
            }
            break;
        case SET_ORG:
            return {
                ...state,
                org: payload 
            }
        default :
            return state;
            break;
    }
}