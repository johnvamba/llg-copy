import {
    SET_NEEDS,
} from './types';

let initialState = {
    needs: []
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_NEEDS:
            return {
                ...state,
                needs: payload
            }
            break;
        default :
            return state;
            break;
    }
}