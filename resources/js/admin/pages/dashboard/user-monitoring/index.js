import React, {useEffect, useState} from 'react';
import Monitor from './monitor';

const UserMonitoring = ({ title, total }) => {
    const [monitor, setMonitor] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.get('/api/user/stats');
            setMonitor(data)
        }

        fetchData();
    }, []);

    return (
        <div className="bg-white p-4 mb-6 rounded-lg border">
            <p className="pt-2 pb-4 text-sm">Users</p>

            {
                Object.keys(monitor).map((stats, index) => (
                    <Monitor 
                        key={`${stats}`}
                        title={stats}
                        total={monitor[stats]}
                    />
                ))
            }
        </div>
    )
}

export default UserMonitoring;