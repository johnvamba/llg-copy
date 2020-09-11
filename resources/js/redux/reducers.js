import {combineReducers} from 'redux';
import {reducer as UsersReducer} from './users/reducer';
import {reducer as RecentActivitiesReducer} from './recent-activities/reducer';
import {reducer as TopDonorsReducer} from './top-donors/reducer';
import {reducer as OrganizationsReducer} from './organizations/reducer';
import {reducer as DonationsReducer} from './donations/reducer';

const appReducers = combineReducers({
    UsersReducer: UsersReducer,
    RecentActivitiesReducer: RecentActivitiesReducer,
    TopDonorsReducer: TopDonorsReducer,
    OrganizationsReducer: OrganizationsReducer,
    DonationsReducer: DonationsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STATE') {
        state = 'undefined';
    }

    return appReducers(state, action);
}

export default rootReducer;