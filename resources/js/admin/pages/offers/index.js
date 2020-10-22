import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as OffersAction from '../../../redux/offers/actions';
import OffersEmployment from '../../../svg/offers-employment';
import OffersPlus from '../../../svg/offers-plus';

//As test icon only
import OffersCreateForm from './form';
import SingleViewOffer from './single-offer-view';

const Offers = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [showForm, setShowForm] = useState(false);
    const [showSingleOffer, setShowSingleOffer] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    // const offers = useSelector(
    //     state => state.OffersReducer.offers
    // )
  

    const [offers, setOffers] = useState(
        {
            columns : [
                "id",
                "title",
                "type",
                "location",
                "status",
                "date",
            ],
            data: [
                [
                    {
                        id: 1,
                        title: "Sample Title",
                        typee: "Employment",
                        location: "Melbourne City",
                        status: "On going", 
                        date: "08/27/2020",
                        checked: false
                    },
                    {
                        id: 2,
                        title: "Sample Title 2",
                        typee: "Employment",
                        location: "Melbourne City",
                        status: "Achieved", 
                        date: "08/27/2020",
                        checked: false
                    },
                    {
                        id: 3,
                        title: "Sample Title",
                        typee: "Employment",
                        location: "Melbourne City",
                        status: "On going", 
                        date: "08/27/2020",
                        checked: false
                    },
                    {
                        id: 4,
                        title: "Sample Title 2",
                        typee: "Employment",
                        location: "Melbourne City",
                        status: "Achieved", 
                        date: "08/27/2020",
                        checked: false
                    },
                    {
                        id: 5,
                        title: "Sample Title",
                        typee: "Employment",
                        location: "Melbourne City",
                        status: "On going", 
                        date: "08/27/2020",
                        checked: false
                    },
                    {
                        id: 6,
                        title: "Sample Title 2",
                        typee: "Employment",
                        location: "Melbourne City",
                        status: "Achieved", 
                        date: "08/27/2020",
                        checked: false
                    }
                ]
            ]
        }
    )

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.post('/api/offer/lists', {
                'limit': limit
            });

            // console.log(data.data);

            dispatch(OffersAction.setOffers(data))
        }

        fetchData();
    }, [limit]);

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    const handleSingleOffer = (e) => {
        if (e.target.cellIndex === 0 || (e.target.tagName === 'INPUT'))  return;
        setShowSingleOffer(true);

        return {
            style: {
                width: '100px'
            }
        }
        
    }

    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const data = offers.data.map((offer, index) => 
            offer.map(obj => ({ ...obj, checked: !isChecked })
        ))
        setOffers({data : data});
    }

    const handleChange = (id) => {
        setIsChecked(false);
        const data = offers.data.map((offer, index) => 
            offer.map(obj => {
                if (obj.id == id) return { ...obj, checked: !obj.checked }
                else return { ...obj }
            }
        ));
        setOffers({data : data});
    }

    return (
        <>
            <div className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <div className="flex flex-1">
                    <h1>Offers</h1>
                </div>
                <div className="flex flex-1 justify-end" onClick={()=>setShowForm(true)}>
                    <button className="flex rounded-sm">
                        <OffersPlus />
                        <span>Create Offer</span>
                    </button>
                </div>
            </div>
            
            <div className="offers-table flex flex-col p-8">
                <table>
                    <thead className="">
                        <tr>
                            <th className="checkbox">
                                <input type='checkbox' onChange={checkedAll} checked={isChecked} />
                            </th>
                            <th>Title</th>
                            <th>Type of Service</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            offers.data.map((offer, index) => 
                                offer.map((obj, key) => 
                                    <tr onClick={handleSingleOffer}>
                                        <td className="checkbox">
                                            <input type='checkbox' onChange={() => handleChange(obj.id)} checked={obj.checked} />
                                            <label></label>
                                        </td>
                                        <td className="title">
                                            <div className="title-img"></div>
                                            <p>
                                                {obj.title}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="tos">
                                                <OffersEmployment />
                                                <p>{obj.typee}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{obj.location}</p>
                                        </td>
                                        <td>
                                            <div className={`status status--${(obj.status === "Achieved") ? "achieved" : "on-going"}`}>
                                                <span>{obj.status}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{obj.date}</p>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                showForm && 
                <OffersCreateForm setShowForm={setShowForm} />
            }
            {
                showSingleOffer && 
                <SingleViewOffer showSingleOffer={showSingleOffer} setShowSingleOffer={setShowSingleOffer} />
            }
        </>
    )
}

export default Offers