import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as DonationsActions from '../../../redux/donations/actions';
import Donations from './donations';
import DonationGraph from './donation-graph';
import TopDonors from './top-donors';

const Dashboard = () => {
    const donations = useSelector(
            state => state.DonationsReducer
        );
        
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchDonations() {
            let {data} = await axios.get('/api/invoice/donated-by-terms');

            dispatch(DonationsActions.setTodayDonation(data.today));
            dispatch(DonationsActions.setWeekDonation(data.week));
            dispatch(DonationsActions.setMonthDonation(data.month));
        }

        fetchDonations()
    }, [])

    return (
        <div className="flex flex-col bg-gray-100">
            <div className="flex flex-col shadow-lg w-full bg-white rounded-lg">
                <div className="border-b p-6">
                    <h2>Donations</h2>
                </div>
                <div className="flex flex-row flex-wrap">
                    <Donations 
                        title="Donated today"
                        amount={donations.todayDonation}
                        percentage="12"
                    />

                    <Donations 
                        title="Donated this week"
                        amount={donations.weekDonation}
                    />

                    <Donations 
                        title="Donated this month"
                        amount={donations.monthDonation}
                    />
                </div>
            </div>

            <div className="mt-8 w-full">
                <div className="flex flex-row">
                    <div className="flex flex-1 mr-4">
                        <DonationGraph />
                    </div>

                    <div className="flex flex-1 ml-4">
                        <TopDonors />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;