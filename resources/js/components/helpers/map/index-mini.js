import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import Style from './style';
import MarkerImg from '../../../../assets/images/marker.png';

const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    scrollwheel: false,
    styles: Style.mapStyle
};

const defaultContainerStyle = {
    width: '100%',
    height: '100%'
};

const MapMini = ({id = "map-mini", mapOptions={}, containerStyle={}, markers = [], lat=-33.868782, lng=151.207583, zoom=14, ...props}) => {

    const handleClick = async(org) => {
        let {data} = await axios.get(`/api/organizations/${org}`);
        props.onViewOrganization(data);
    }
    return (
        <GoogleMap
            id={id}
            mapContainerStyle={{...defaultContainerStyle, ...containerStyle}}
            options={{...defaultMapOptions, ...mapOptions}}
            zoom={zoom}
            center={{lat: lat, lng: lng}}
        >
            {
                <Marker
                    key={'target'}
                    icon={MarkerImg}
                    position={{ lat: lat, lng: lng }}
                    // onClick={() => { handleClick(org.id) }}
                />
            }
        </GoogleMap>
    )
}

export default MapMini;