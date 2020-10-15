import React, { useEffect, useState } from 'react';
import Card from './card';

const NeedsMet = () => {
    const [total, setTotal] = useState(0)

    useEffect(() => {
        async function fetchData() {
            let {data} = await axios.get('/api/needs-mets/total');
            setTotal(data);
        }

        fetchData();
    }, []);

    return (
        <Card
            title="Total Needs Met"
            amount={total || 0}
        />
    )
}

export default NeedsMet;