import React, { useEffect, useState, useCallback } from 'react';
import { 
    GoogleMap, 
    InfoWindow,
    // LoadScript, 
    Marker } from "@react-google-maps/api"
import { Link } from 'react-router-dom';
import MarkerImg from '../../../../assets/images/marker.png';
import OrgsMarker from '../../../../assets/images/orgs.png';
import OffersMarker from '../../../../assets/images/offers.png';
import GroupMarker from '../../../../assets/images/groups.png';
import LocMarker from '../../../../assets/images/churches.png';

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

const ShowWindow = ({org, loading, reload}) => {
    const { name, date_added, site, phone_number, email, description, banner, photo, incomplete = false } = org; // if officially org
    const { privacy = 'Public', participants_count = 0 } = org; // actually group/church
    const { org_count = 0 } = org; //if campus or location

    const knowType = () => {
        switch(org.type){
            case "organisation":
            return "Organisation";
            // case "campus":
            // return ;
            case "campus":
            return "Location";
            case "group":
            return "Group";
            default:
            return "Component";
        }
    }

    if(incomplete) 
        return <header className="info-window">
            <p>An error occured on loading this organisation. </p>
            <a type="button" className="text-blue" onClick={reload}>Click here to try again.</a>
        </header>

    if(loading) 
        return <header className="info-window loading">
            <LoadingScreen title={`Loading ${knowType()}`}/>
        </header>

    if(org.type == 'group') 
        return <header className="info-window">
        <div className="info-photo">
            <div className="org-info_rounded-img" style={{backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}></div>
        </div>
        <div className='org-view__details'>
            <h2>{ name }<span className="float-right">{participants_count} Members</span></h2>
            <p>{ description }</p>
        </div>
    </header>

    if(org.type == 'campus') 
        return <header className="info-window">
            <div className="w-full h-1" style={{backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}></div>
            <div className='org-view__details'>
                <h2>{ name }<span className="float-right">{org_count} Organisations</span></h2>
                <p>{ description }</p>
            </div>
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
    lat: -37.8136,
    lng: 144.9631
}

const displayMap = ({markers, lat, lng, options = {}, ...props}) => {
    const [showItem, setShowItem] = useState({...ordNulls});
    const [center, setCenter] = useState({
        lat, 
        lng
    })
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(false);

    const mks = Array.isArray(markers) ? markers : Object.values(markers);

    const handleClick = async(org) => {
        setLoading(true);
        setShowItem({ lng: org.lng, lat: org.lat });
        setCenter({ lng: org.lng, lat: org.lat });
        setOrg({...org, incomplete: false});
        let url = `/api/web/organizations/${org.id}`;
        if(org.type == 'group')
            url = `/api/web/groups/${org.id}`;
        else if(org.type == 'campus')
            url = `/api/web/campus/${org.id}`;
        api.get(url, {
            clearCacheEntry: org.incomplete
        })
        .then(({data})=> {
            setOrg({...org, ...data.data, incomplete: false})
            // props.onViewOrganization(data);
            setLoading(false)
        }).catch(()=>{
            setOrg({...org, incomplete: true});
            setLoading(false)
        });
    }

    const renderMarker = (org) => {
        switch(org.type){
            case "organisation":
            return OrgsMarker;
            // case "campus":
            // return ;
            case "campus":
            return LocMarker;
            case "group":
            default:
            return GroupMarker;
        }
    }

    return (
        <GoogleMap
            id="nearby-organization"
            mapContainerStyle={containerStyle}
            options={{...defaultMapOptions, ...options}}
            zoom={14}
            center={{
                lat: parseFloat(center.lat),
                lng: parseFloat(center.lng)
            }}
        >
            {
                (showItem.lat && showItem.lng && org) && <InfoWindow
                    onCloseClick={()=>setShowItem({ordNulls})}
                    position={{
                        lat: parseFloat(showItem.lat),
                        lng: parseFloat(showItem.lng)
                    }}
                >
                    <ShowWindow org={org} loading={loading} reload={()=>handleClick(org)}/>
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
                        key={`${org.type}-${org.id}`}
                        icon={renderMarker(org)}
                        position={{ lat: parseFloat(org.lat), lng: parseFloat(org.lng) }}
                        onClick={() => handleClick(org)}
                    />
                ))
            }

        </GoogleMap>
    )
}

export default React.memo(displayMap);