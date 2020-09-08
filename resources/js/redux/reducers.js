import {combineReducers} from 'redux';
import {reducer as UsersReducer} from './users/reducer';

const appReducers = combineReducers({
    UsersReducer: UsersReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STATE') {
        state = 'undefined';
    }

    return appReducers(state, action);
}

export default rootReducer;