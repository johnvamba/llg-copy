import React, { useEffect, useState } from 'react';
import ListItem from '../../../components/ListItem';

const RecentNeeds = () => {
    const [needs, setNeeds] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.get('/api/need/recent-added');
            setNeeds(data)
        }

        fetchData();
    }, []);

    return (
        <div className="bg-white p-4 mb-4 rounded-lg border">
            <h2 className="pt-2 pb-2 text-sm">Recently Added Needs</h2>

            {
                needs.map((need, index) => (
                    <ListItem
                        key={`${need}.${index}`}
                        avatar={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                        avatarStyle="h-12 w-12"
                        title={need.title}
                        titleStyle="text-gray-dark"
                        status={need.type.name}
                        statusStyle="text-blue-300"
                        containerSyle={`${index+1 == needs.length ? "border-b-0" : "border-b"}`}
                    />
                ))
            }
        </div>
    )
}

export default RecentNeeds;