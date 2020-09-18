import React, { useEffect, useState } from 'react';
import Card from './card';

const NeedsOpen = () => {
    const [total, setTotal] = useState(0)

    useEffect(() => {
        async function fetchData() {
            let {data} = await axios.get('/api/needs/open/total');
            setTotal(data);
        }

        fetchData();
    }, []);

    return (
        <Card
            title="Open Needs"
            amount={total || 0}
        />
    )
}

export default NeedsOpen;