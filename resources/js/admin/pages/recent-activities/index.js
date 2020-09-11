import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import * as RecentActivtiesActions from '../../../redux/recent-activities/actions'

import ActivitySection from './activity-section';

const RecentActivities = () => {
    const todayActivities = useSelector(
            state => state.RecentActivitiesReducer.todayActivities
        );
    const yesterdayActivities = useSelector(
            state => state.RecentActivitiesReducer.yesterdayActivities
        );

    const dispatch = useDispatch();

    useEffect(() => {
        async function getTodayActivities() {
            let {data} = await axios.post('/api/activity/recents', {
                'limit': 3,
                'date': moment()
            });
            dispatch(RecentActivtiesActions.setTodayActivities(data));
        } 

        async function getYesterdayActivities() {
            let {data} = await axios.post('/api/activity/recents', {
                'limit': 3,
                'date': moment().subtract(1, 'days')
            });
            dispatch(RecentActivtiesActions.setYesterdayActivities(data));
        } 

        getTodayActivities();
        getYesterdayActivities();
    }, []);

    return (
        <aside className="flex flex-col xs:2/5 md:2/5 border-l">
            <div className="pl-6 pt-4">
                <h1>Recent Activities</h1>
            </div>

            <ActivitySection title="Today" data={todayActivities} />
            <ActivitySection title="Yesterday" data={yesterdayActivities} />
        </aside>
    )
}

export default RecentActivities;