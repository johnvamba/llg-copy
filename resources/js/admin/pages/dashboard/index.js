import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as DonationsActions from '../../../redux/donations/actions';
import Card from './card';
import NeedsOpen from './needs-open';
import NeedsMet from './needs-met';
import OffersHelp from './offers-help';
import Donations from './donations';
import UserMonitoring from './user-monitoring/';
import DonationGraph from './donation-graph';
import TopDonors from './top-donors';
import RecentNeeds from './recent-needs';
import NearbyOrganizations from './nearby-organizations';

const Dashboard = () => {

    return (
        <>
            <div className="h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <div className="flex flex-1">
                    <h1>Dashboard</h1>
                </div>

                <div className="flex flex-1 justify-end">
                    <button className="bg-blue-400 text-white px-4 py-2 rounded-sm">
                        Generate Report
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col bg-gray-100 px-12 pt-8 pb-8">
                <div className="flex flex-row space-x-3">
                    <NeedsOpen />
                    
                    <NeedsMet />
                    
                    <OffersHelp />

                    <Donations />
                </div>

                <div className="mt-8 w-full">
                    <div className="flex flex-row space-x-4">
                        <div className="flex-1">
                            <DonationGraph />
                        </div>

                        <div className="flex flex-initial flex-col w-64">
                            <UserMonitoring />
                            <RecentNeeds />
                        </div>
                    </div>
                </div>

                <div className="mt-8 w-full">
                    <div className="flex flex-row">
                        <div className="flex flex-1 mr-4">
                            <NearbyOrganizations />
                        </div>

                        <div className="flex flex-1 ml-4">
                            <TopDonors />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;