import React from 'react';
import ListItem from '../../../components/ListItem'

const RecentActivities = () => {

    return (
        <aside className="w-1/4 flex flex-col border-l">
            <div className="pl-6 pt-4">
                <h1>Recent Activities</h1>
            </div>

            <div className="flex flex-col">
                <div className="w-24 flex justify-center bg-gray-100 rounded-br-full rounded-tr-full py-2 mt-4">
                    <p className="text-gray-600 text-sm">
                        Today
                    </p>
                </div>

                <div className="px-6">
                    <ListItem 
                        avatar={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                        avatarStyle="h-12 w-12"
                        title="john Doe"
                        description="donated"
                        hightLightDescription="$500.00"
                        status="Just now"
                    />

                    <ListItem 
                        avatar={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                        avatarStyle="h-12 w-12"
                        title="john Doe"
                        description="volunteered for a "
                        hightLightDescription="Cleaning Service"
                        status="Just now"
                    />
                </div>
            </div>
        </aside>
    )
}

export default RecentActivities;