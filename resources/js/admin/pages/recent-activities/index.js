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
        getAllData();
        // async function getTodayActivities() {
        //     let {data} = await axios.post('/api/activity/recents', {
        //         // 'limit': 3,
        //         'date': moment()
        //     });
        //     dispatch(RecentActivtiesActions.setTodayActivities(data));
        // } 

        // async function getYesterdayActivities() {
        //     let {data} = await axios.post('/api/activity/recents', {
        //         'limit': 3,
        //         'date': moment().subtract(1, 'days')
        //     });
        //     dispatch(RecentActivtiesActions.setYesterdayActivities(data));
        // } 

        // getTodayActivities();
        // getYesterdayActivities();
    }, []);

    const getAllData = () => {
        axios.get('/api/web/activities').then(({data}) => {
            dispatch(RecentActivtiesActions.setTodayActivities(data.today || []));
            dispatch(RecentActivtiesActions.setYesterdayActivities(data.yesterday || []));

        });
    }

    return (
        <div className="flex flex-shrink-0 flex-col w-full md:w-64 xl:w-64 border-l">
            <aside>
                <div className="pl-6 pt-4">
                    <h1>Recent Activities</h1>
                </div>

                <ActivitySection title="Today" data={todayActivities} ver='2'/>
                <ActivitySection title="Yesterday" data={yesterdayActivities} ver='2'/>
            </aside>
        </div>
    )
}

export default RecentActivities;