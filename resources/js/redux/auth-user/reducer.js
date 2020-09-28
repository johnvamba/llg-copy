import {
    SET_PROFILE,
    SET_ROLES,
} from './types';

let initialState = {
    profile: {},
    roles: {},
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: payload
            }
            break;
        case SET_ROLES:
            return {
                ...state,
                roles: payload
            }
            break;
        default :
            return state;
            break;
    }
}