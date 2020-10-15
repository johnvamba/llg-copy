import React from 'react';
import ListItem from '../../../components/ListItem';

const ActivitySection = ({ title, data }) => {

    return (
        <div className="flex flex-col">
            <div className="w-24 flex justify-center bg-gray-100 rounded-br-full rounded-tr-full py-2 mt-4">
                <p className="text-gray-600 text-sm">
                    {title}
                </p>
            </div>

            {data.map((record, index) => (
                <div className="px-6" key={`${record.id}.${index}`}>
                    <ListItem
                        avatar={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                        avatarStyle="h-12 w-12"
                        title={record.user.name}
                        titleStyle="capitalize"
                        description={record.description}
                        shortDescription={record.short_description}
                        status={record.created}
                        statusStyle="font-thin"
                    />
                </div>))
            }

            {data.length === 0 &&
                (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-gray-500 capitalize text-xs">
                            No activity {title}.
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default ActivitySection;