import {
    SET_NEEDS,
    SET_FILTERS
} from './types';

let initialState = {
    filter: false,
    type: null,
    startdate: new Date,
    enddate: new Date,
    min: 0.00,
    max: 0.00,
    dateType: 'type1',
    //not needed
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