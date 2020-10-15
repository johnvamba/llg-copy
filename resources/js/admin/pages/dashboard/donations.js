import React, { useEffect, useState } from 'react';
import Card from './card';

const Donations = () => {
    const [total, setTotal] = useState({});

    useEffect(() => {
        async function fetchData() {
            let {data} = await axios.get('/api/invoice/donations');
            setTotal(data);
        }

        fetchData();
    }, []);

    return (
        <>
            <Card
                title="Donations this month"
                amount={`$${total.month || 0}`}
            />

            <Card
                title="Total Donations"
                amount={`$${total.donations || 0}`}
            />
        </>
    )
}

export default Donations;