import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as OffersAction from '../../../redux/offers/actions';
import DataTable from '../../../components/layout/DataTable';
import Button from '../../../components/Button';
import OffersEmployment from '../../../svg/offers-employment';
import OffersMechanic from '../../../svg/offers-mechanic';
import OffersCleaning from '../../../svg/offers-cleaning';
import OffersPlus from '../../../svg/offers-plus';

//As test icon only
import OffersCreateForm from './form';
import SingleViewOffer from './single-offer-view';

const Offers = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [showForm, setShowForm] = useState(false);
    const [showSingleOffer, setShowSingleOffer] = useState(false);

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
                        date: "08/27/2020"
                    },
                    {
                        id: 2,
                        title: "Sample Title 2",
                        typee: "Employment",
                        location: "Melbourne City",
                        status: "Achieved", 
                        date: "08/27/2020"
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
                <table className="table">
                    <thead className="">
                        <tr>
                            <th className="checkbox">
                                <input type='checkbox'/>
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
                                            <input type='checkbox'/>
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
                        
                        {/* <tr onClick={handleSingleOffer}>
                            <td className="checkbox">
                                <input type='checkbox'/>
                            </td>
                            <td className="title">
                                <div className="title-img"></div>
                                <p>
                                    Sample Title Here
                                </p>
                            </td>
                            <td>
                                <div className="tos">
                                    <OffersMechanic />
                                    <p>Mechanic</p>
                                </div>
                            </td>
                            <td>
                                <p>Melbourne City</p>
                            </td>
                            <td>
                                <div className="status status--achieved">
                                    <span>Achieved</span>
                                </div>
                            </td>
                            <td>
                                <p>08/27/2020</p>
                            </td>
                        </tr>
                        <tr onClick={handleSingleOffer}>
                            <td className="checkbox">
                                <input type='checkbox'/>
                            </td>
                            <td className="title">
                                <div className="title-img"></div>
                                <p>
                                    Sample Title Here
                                </p>
                            </td>
                            <td>
                                <div className="tos">
                                    <OffersCleaning />
                                    <p>Cleaning</p>
                                </div>
                            </td>
                            <td>
                                <p>Melbourne City</p>
                            </td>
                            <td>
                                <div className="status status--achieved">
                                    <span>Achieved</span>
                                </div>
                            </td>
                            <td>
                                <p>08/27/2020</p>
                            </td>
                        </tr> */}
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