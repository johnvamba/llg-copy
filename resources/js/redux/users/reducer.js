import {
    SET_USERS
} from './types';

let initialState = {
    users: []
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_USERS:
            return {
                ...state,
                users: payload
            }
            break;
        default :
            return state;
            break;
    }
}