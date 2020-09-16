import {combineReducers} from 'redux';
import {reducer as UsersReducer} from './users/reducer';
import {reducer as RecentActivitiesReducer} from './recent-activities/reducer';
import {reducer as TopDonorsReducer} from './top-donors/reducer';
import {reducer as OrganizationsReducer} from './organizations/reducer';
import {reducer as DonationsReducer} from './donations/reducer';
import {reducer as NeedsCategoriesReducer} from './needs-categories/reducer';
import {reducer as NeedsReducer} from './needs/reducer';
import {reducer as OffersReducer} from './offers/reducer';
import {reducer as StoriesReducer} from './stories/reducer';

const appReducers = combineReducers({
    UsersReducer: UsersReducer,
    RecentActivitiesReducer: RecentActivitiesReducer,
    TopDonorsReducer: TopDonorsReducer,
    OrganizationsReducer: OrganizationsReducer,
    DonationsReducer: DonationsReducer,
    NeedsCategoriesReducer: NeedsCategoriesReducer,
    NeedsReducer: NeedsReducer,
    OffersReducer: OffersReducer,
    StoriesReducer: StoriesReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STATE') {
        state = 'undefined';
    }

    return appReducers(state, action);
}

export default rootReducer;