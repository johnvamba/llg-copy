import {
    SET_NEEDS,
    SET_FILTERS
} from './types';

let initialState = {
    type: null,
    date: new Date(),
    min: 0.00,
    max: 0.00,
    dateType: 'type1',
    needs: []
}

export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_NEEDS:
            return {
                ...state,
                needs: payload
            }
        case SET_FILTERS:
            return {
                ...state,
                ...payload
            }
        default :
            return state;
    }
}