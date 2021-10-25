import {
    SET_ORGANIZATIONS,
    SET_PANEL_ORG,
    SET_PANEL_SHOW,
    SET_LOADING
} from './types';

let initialState = {
    organizations: [],
    loading: false,
    show: null,
    org: {}
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ORGANIZATIONS:
            return {
                ...state,
                organizations: payload
            }
        case SET_PANEL_ORG:
            return {
                ...state,
                org: payload
            }
        case SET_PANEL_SHOW:
            return {
                ...state,
                show: payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
            }
        default :
            return state;
            break;
    }
}