import React from 'react';
import Donations from './donations';
import DonationGraph from './donation-graph';
import TopDonors from './top-donors';

const Dashboard = () => {

    return (
        <div className="flex flex-col bg-gray-100">
            <div className="flex flex-col shadow-lg w-full bg-white rounded-lg">
                <div className="border-b p-6">
                    <h2>Donations</h2>
                </div>
                <div className="flex flex-row flex-wrap">
                    <Donations 
                        title="Donated today"
                        amount="4,231.00"
                        percentage="12"
                    />

                    <Donations 
                        title="Donated this week"
                        amount="32,231.00"
                    />

                    <Donations 
                        title="Donated this month"
                        amount="62,231.00"
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