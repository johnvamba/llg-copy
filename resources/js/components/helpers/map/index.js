import React, { useEffect, useState, useCallback } from 'react';
import { 
    GoogleMap, 
    InfoWindow,
    // LoadScript, 
    Marker } from "@react-google-maps/api"
import { Link } from 'react-router-dom';
import MarkerImg from '../../../../assets/images/marker.png';
import OrgMarker from '../../../../assets/images/orgmarker.png';
import LoadingScreen from '../../LoadingScreen'

import Style from './style';

const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: true,
    streetViewControl: false,
    scrollwheel: true,
    styles: Style.mapStyle
};

const containerStyle = {
    width: '100%',
    height: '440px'
};

const OrgWindow = ({org, loading}) => {
    const { name, date_added, site, phone_number, email, description, banner, photo } = org;

    if(loading) 
        return <header className="info-window loading">
            <LoadingScreen title="Loading Organisation"/>
        </header>

    return <header className="info-window">
        <div className="info-photo">
            <div className="org-info_rounded-img" style={{backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}></div>
        </div>
        <div className='org-view__details'>
            <h2>{ name }<span className="float-right">Joined {date_added}</span></h2>
            {
                site &&
                <div className="org-view__info-with-icon">
                    <i className="fas fa-globe text-gray-400"></i>
                    <label>{site || ''}</label>
                </div>
            }
            {
                (phone_number || email) && 
                <div className="org-view__info-with-icon--two">
                    <div className="org-view__info-with-icon">
                        <i className="fas fa-phone-alt text-gray-400"></i>
                        <label>{phone_number || ''}</label>
                    </div>
                    <div className="org-view__info-with-icon">
                        <i className="fas fa-envelope text-gray-400"></i>
                        <label>{email || ''}</label>
                    </div>
                </div>
            }
            <p>{description}</p>
            {/*<Link to={`/organizations/${org.id}`}>See More</Link>*/}
        </div>
    </header>
}

const ordNulls = {
    lng: null,
    lat: null,
}

const displayMap = ({markers, lat, lng, options = {}, ...props}) => {
    const [showItem, setShowItem] = useState({...ordNulls});
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(false);

    const mks = Array.isArray(markers) ? markers : Object.values(markers);

    const handleClick = async(org) => {
        setLoading(true);
        setShowItem({ lng: org.lng, lat: org.lat });
        setOrg(org);
        api.get(`/api/web/organizations/${org.id}`)
        .then(({data})=> {
            setOrg({...org, ...data.data})
            // props.onViewOrganization(data);
            setLoading(false)
        });
    }

    return (
        <GoogleMap
            id="nearby-organization"
            mapContainerStyle={containerStyle}
            options={{...defaultMapOptions, ...options}}
            zoom={14}
            center={{lat: parseFloat(lat), lng: parseFloat(lng)}}
        >
            {
                (showItem.lat && showItem.lng && org) && <InfoWindow
                    onCloseClick={()=>setShowItem({ordNulls})}
                    position={{
                        lat: parseFloat(showItem.lat),
                        lng: parseFloat(showItem.lng)
                    }}
                >
                    <OrgWindow org={org} loading={loading}/>
                </InfoWindow>
            }
            <Marker
                className="MapPin"
                icon={MarkerImg}
                position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
            />
            {
                mks.map((org, key) => (
                    <Marker
                        className="Mappin"
                        key={key}
                        icon={OrgMarker}
                        position={{ lat: parseFloat(org.lat), lng: parseFloat(org.lng) }}
                        onClick={() => handleClick(org)}
                    />
                ))
            }

        </GoogleMap>
    )
}

export default React.memo(displayMap);