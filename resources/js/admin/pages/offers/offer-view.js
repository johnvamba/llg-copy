import React, { useState, useEffect } from 'react';
import OffersEmployment from '../../../svg/offers-employment';
import Circlet from '../../../svg/circlet';

import OffersViewEdit from '../../../svg/offers-view-edit';
import OffersViewWeb from '../../../svg/offers-view-web';
import OffersViewPhone from '../../../svg/offers-view-phone';
import MapMini from '../../../components/helpers/map/index-mini';

import { volunteer } from '../needs/categorylist';
import { Other } from '../needs/categories'

const OfferView = ({ setShowOfferEdit, data = {} }) => {
    // const [ title, setTitle ] = useState('')
    // const [ type, setType ] = useState('')
    // const [ location, setLocation ] = useState('')
    // const [ business_name, setBusiness_name ] = useState('')
    // const [ status, setStatus ] = useState('')
    // const [ business_site, setBusiness_site ] = useState('')
    // const [ business_contact, setBusiness_contact ] = useState('')
    // const [ photo, setPhoto ] = useState('')
    // const [ description, setDescription ] = useState('')
    // const [ date, setDate ] = useState('')

    // const [ loading, setLoading ] = useState(false);

    // useEffect(() => {
    //     if(data.id){

    //     }
    // }, [data])

    const { title, type, location, business_name, status, business_site, business_contact, photo, description, date, lng, lat } = data
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
            <div className="view-offer__header flex flex-wrap">
                <div className="view-offer__header-left flex flex-wrap">
                    <Circlet stroke={fillCirclet} />
                    {switchStatus()}
                </div>
                <div className="view-offer__header-right flex flex-wrap" onClick={() => setShowOfferEdit(true)} >
                    <OffersViewEdit />
                    <label>Edit</label>
                </div>
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
        </div>
    )
}

export default OfferView