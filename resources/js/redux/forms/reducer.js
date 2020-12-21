import {
    OPENFORM,
} from './actions';

let initialState = {
    type: null,
    data: {}
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case OPENFORM:
        return {
            ...state,
            ...payload
        }
        default :
        return state;
    }
}