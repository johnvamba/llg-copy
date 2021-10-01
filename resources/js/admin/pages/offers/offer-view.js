import React, { useState, useEffect } from 'react';
import OffersEmployment from '../../../svg/offers-employment';
import Circlet from '../../../svg/circlet';

import OffersViewEdit from '../../../svg/offers-view-edit';
import OffersViewWeb from '../../../svg/offers-view-web';
import OffersViewPhone from '../../../svg/offers-view-phone';
import MapMini from '../../../components/helpers/map/index-mini';

import { volunteer } from '../needs/categorylist';
import { Other } from '../needs/categories'
import { connect, useSelector } from 'react-redux';


const OfferView = ({ setShowOfferEdit, data = {}, remove=()=>{}, handleForm, toClose}) => {
    const roles = useSelector(({AuthUserReducer}) => AuthUserReducer.roles);    

    const { title, type, location, business_name, by_user, status, business_site, business_contact, photo, description, date, lng, lat } = data
    const catIcon = volunteer.find(i=>i.name == type);

    const addHttp = () => {
        let newLink = encodeURI(business_site);
        return newLink.search(/^(http|https)/) >= 0 ? newLink : 'http://' + newLink; 
    }

    const switchStatus=()=>{
        switch(status){
            case 'approved':
            return <label>Approved</label>;
            case 'pending':
            return <label>Pending</label>;
            case 'denied':
            case 'dennied':
            return <label>Denied</label>;
            default:
            return <label>Unknown</label>;
        }
    }

    const fillCirclet=()=>{
        switch(status){
            case 'approved':
            return "#52CC8A";
            case 'pending':
            return '#2F80ED';
            case 'dennied':
            default:
            return '#DDB335'
        }
    }

    return(
        <div className="view-offer">
            <div className="view-offer__header flex flex-wrap items-center">
                <div className="view-offer__header-left flex flex-wrap flex-grow">
                    <Circlet stroke={fillCirclet} />
                    {switchStatus()}
                </div>
                <button onClick={remove} className="text-red-500 mr-3">
                    Delete
                </button>
                <div className="view-offer__header-right flex flex-wrap" onClick={() => setShowOfferEdit(true)} >
                    <OffersViewEdit />
                    <label>Edit</label>
                </div>
                <span className="ver-divider"></span>
                <button className="" onClick={toClose}>
                    <i className="">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13" stroke="#98999B" strokeWidth="1.5"/>
                            <path d="M13 1L1 13" stroke="#98999B" strokeWidth="1.5"/>
                        </svg>
                    </i>
                </button>
            </div>
            <div className="view-offer__body">
                {
                    photo &&
                    <div className="bg-cover bg-center" style={{backgroundImage: `url(${photo})`}}></div>
                }
                <div className="view-offer__body-title flex">
                    <h2>{title}</h2>
                    <label>{date}</label>
                </div>
                    <div className="under-title flex flex-wrap">
                    {
                        catIcon ? 
                        <catIcon.svg_class active={true} style={{width: '15px !important', height: '15px !important' }}/> :
                        <Other active={true} style={{width: '15px !important', height: '15px !important' }} />
                    }
                        <label>{type}</label>
                    </div>
                <div className="view-map">
                    <label>Location</label>                    
                    <div className="google-map">
                        <MapMini lat={lat} lng={lng}/>
                    </div>
                </div>
                <label className="view-offer__about">About</label>
                <p>{ description }</p>
                <div className="view-offer__bottom flex">
                    <div>
                        <label>Offer By</label>
                        <h3>{by_user}</h3>
                        <label>Business</label>
                        <h3>{business_name}</h3>
                        {
                            business_site &&
                            <div className="flex">
                                <OffersViewWeb />
                                <a className="link" href={addHttp()} target="_blank">{business_site}</a>
                            </div>
                        }
                        {
                            business_contact && 
                            <div className="flex">
                                <OffersViewPhone />
                                <a className="link" href="#">{ business_contact }</a>
                            </div>
                        }
                    </div>
                    {
                        business_site &&
                        <div>
                            <a className='button' href={addHttp()} target="_blank">View Website</a>
                        </div>
                    }
                </div>
            </div>
            {
                (roles.name == 'admin' || roles.name == 'campus admin') &&
                <section className="story-counts">
                    <button onClick={()=>handleForm(data, false, false, true)}>
                        <svg width="45" height="20" viewBox="0 0 45 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.67082 4.81825L9.86249 2.84408C9.93832 2.05075 10.6792 1.51242 11.4275 1.70575C12.5533 1.99742 13.3442 3.04325 13.3442 4.24242V6.77159C13.3442 7.33409 13.3442 7.61575 13.4658 7.82158C13.535 7.93908 13.63 8.03825 13.7433 8.10909C13.9433 8.23492 14.2158 8.23492 14.76 8.23492H15.09C16.5092 8.23492 17.2183 8.23492 17.655 8.55992C17.9825 8.80409 18.2133 9.16159 18.305 9.56659C18.4267 10.1083 18.1542 10.7858 17.6083 12.1391L17.3367 12.8141C17.1791 13.205 17.1146 13.6273 17.1483 14.0474C17.3417 16.4424 15.4425 18.4599 13.1208 18.3274L4.43415 17.8283C3.48499 17.7741 3.01082 17.7466 2.58249 17.3674C2.15332 16.9883 2.07249 16.5974 1.91165 15.8166C1.56935 14.1554 1.58497 12.4404 1.95749 10.7858C2.19332 9.74575 3.18665 9.18575 4.21249 9.31909C6.93249 9.66909 9.39832 7.63659 9.67082 4.81908V4.81825Z" stroke="#98999B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.83331 9.58325L5.71915 9.96409C4.98007 12.4278 5.01994 15.0597 5.83331 17.4999" stroke="#98999B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M34.6708 15.1817L34.8625 17.1559C34.9383 17.9492 35.6792 18.4876 36.4275 18.2942C37.5533 18.0026 38.3442 16.9567 38.3442 15.7576V13.2284C38.3442 12.6659 38.3442 12.3842 38.4658 12.1784C38.535 12.0609 38.63 11.9617 38.7433 11.8909C38.9433 11.7651 39.2158 11.7651 39.76 11.7651H40.09C41.5092 11.7651 42.2183 11.7651 42.655 11.4401C42.9825 11.1959 43.2133 10.8384 43.305 10.4334C43.4267 9.89175 43.1542 9.21425 42.6083 7.86091L42.3367 7.18591C42.1791 6.79497 42.1146 6.37273 42.1483 5.95258C42.3417 3.55758 40.4425 1.54008 38.1208 1.67258L29.4342 2.17175C28.485 2.22591 28.0108 2.25341 27.5825 2.63258C27.1533 3.01175 27.0725 3.40258 26.9117 4.18341C26.5693 5.84457 26.585 7.5596 26.9575 9.21425C27.1933 10.2542 28.1867 10.8142 29.2125 10.6809C31.9325 10.3309 34.3983 12.3634 34.6708 15.1809V15.1817Z" stroke="#98999B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M30.8333 10.4167L30.7191 10.0359C29.9801 7.57218 30.0199 4.9403 30.8333 2.50008" stroke="#98999B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        { data.report_count || 0 } Report Use
                    </button>
                </section>
            }
        </div>
    )
}

export default OfferView