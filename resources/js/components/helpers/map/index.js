import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import Style from './style';

const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    scrollwheel: false,
    styles: Style.mapStyle
};

const containerStyle = {
    width: '100%',
    height: '440px'
};

const Map = ({markers, lat, lng, ...props}) => {

    const handleClick = async(org) => {
        let {data} = await axios.get(`/api/organizations/${org}`);
        props.onViewOrganization(data);
    }

    return (
        <GoogleMap
            id="nearby-organization"
            mapContainerStyle={containerStyle}
            options={defaultMapOptions}
            zoom={14}
            center={{lat: lat, lng: lng}}
        >
            {
                markers.map(org => (
                    <Marker
                        key={org.id}
                        position={{ lat: parseFloat(org.lat), lng: parseFloat(org.lng) }}
                        onClick={() => { handleClick(org.id) }}
                    />
                ))
            }
        </GoogleMap>
    )
}

export default Map;