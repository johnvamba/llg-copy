import {
    SET_PROFILE,
    SET_ROLES,
    SET_ORG
} from './types';

let initialState = {
    profile: {},
    roles: {},
    org: {}
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