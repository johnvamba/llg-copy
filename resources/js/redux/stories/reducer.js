import {
    SET_STORIES,
    SET_NEED_ID,
    SET_ORG
} from './types';

let initialState = {
    stories: [],
    org: null,
    need_id: null
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
        case SET_NEED_ID:
            return {
                ...state,
                need_id: payload
            }
        default :
            return state;
            break;
    }
}