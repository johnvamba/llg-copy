import {
    SET_NEEDS,
    SET_FILTERS
} from './types';

let initialState = {
    filter: false,
    type: null,
    startdate: new Date,
    enddate: new Date,
    min: null,
    max: null,
    dateType: 'type1',
    minSwitch:false,
    maxSwitch:false,
    string: null,
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
                ...payload, 
                min: payload.minSwitch ? (payload.min || 0) : null,
                max: payload.maxSwitch ? (payload.max || 0) : null
            }
        default :
            return state;
    }
}