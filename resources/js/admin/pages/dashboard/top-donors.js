import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as TopDonorsActions from '../../../redux/top-donors/actions';

import ListItem from '../../../components/ListItem'

const TopDonors = () => {
    const topDonors = useSelector(
            state => state.TopDonorsReducer.topDonors
        );

    const dispatch = useDispatch();

    useEffect(() => {
        async function getTopDonors() {
            let {data} = await axios.get('/api/invoice/top-donors');

            dispatch(TopDonorsActions.setTopDonors(data));
        }

        getTopDonors();
    }, []);

    return (
        <div className="flex flex-col w-full p-4 border bg-white rounded-lg">
            <div className="pb-4 text-sm">
                <p>Top Donors</p>
            </div>

            <div className="mx-4">
                {topDonors.map((donor, index) => (
                    <ListItem
                        key={`${donor.id}.${index}`} 
                        avatar={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                        avatarStyle="h-12 w-12"
                        title={donor.name}
                        description={`to Organization`}
                        right={
                            <p className="text-xs">
                                {`$${donor.donated}`}
                            </p>
                        }
                        titleStyle="text-blue-300 font-semibold"
                        containerSyle={`pb-1 border-gray-200 ${topDonors.length === index + 1? " " : "border-b-2"}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default TopDonors