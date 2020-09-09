import React from 'react';
import ListItem from '../../../components/ListItem'

const TopDonors = () => {

    return (
        <div className="flex flex-col w-full p-4 shadow-lg bg-white rounded-lg">
            <div className="px-4 pt-2 pb-4">
                <p>Top Donors</p>
            </div>

            <div className="mx-4">
                <ListItem 
                    avatar={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    avatarStyle="h-12 w-12"
                    title="john Doe"
                    description="to organisation"
                    right={
                        <p className="text-xs">
                            $3,200.00
                        </p>
                    }
                    titleStyle="text-blue-300 font-semibold"
                    containerSyle="border-b-2 border-gray-200 pb-1"
                />

                <ListItem 
                    avatar={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    avatarStyle="h-12 w-12"
                    title="john Doe"
                    description="to organisation"
                    right={
                        <p className="text-xs">
                            $3,200.00
                        </p>
                    }
                    titleStyle="text-blue-300 font-semibold"
                    containerSyle="border-b-2 border-gray-200 pb-1"
                />

                <ListItem 
                    avatar={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    avatarStyle="h-12 w-12"
                    title="john Doe"
                    description="to organisation"
                    right={
                        <p className="text-xs">
                            $3,200.00
                        </p>
                    }
                    titleStyle="text-blue-300 font-semibold"
                    containerSyle="pb-1"
                />
            </div>
        </div>
    )
}

export default TopDonors