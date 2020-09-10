import {combineReducers} from 'redux';
import {reducer as UsersReducer} from './users/reducer';
import {reducer as RecentActivitiesReducer} from './recent-activities/reducer';
import {reducer as TopDonorsReducer} from './top-donors/reducer';

const appReducers = combineReducers({
    UsersReducer: UsersReducer,
    RecentActivitiesReducer: RecentActivitiesReducer,
    TopDonorsReducer: TopDonorsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STATE') {
        state = 'undefined';
    }

    return appReducers(state, action);
}

export default rootReducer;