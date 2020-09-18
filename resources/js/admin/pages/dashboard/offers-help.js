import React, { useEffect, useState } from 'react';
import Card from './card';

const OffersHelp = () => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.get('/api/service-offer/help/total');
            setTotal(data);
        }

        fetchData();
    }, []);

    return (
        <Card
            title="Offer to Help"
            amount={total}
        />
    )
}

export default OffersHelp;