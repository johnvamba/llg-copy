import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"
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

const Map = ({markers, lat, lng}) => {
    const [showInfo, setShowInfo] = useState(false);

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
                        onClick={() => { setShowInfo(true) }}
                    >
                        {showInfo &&
                            (
                                <InfoWindow
                                    onCloseClick={() => {
                                        setShowInfo(false);
                                    }}
                                    position={{ lat: parseFloat(org.lat), lng: parseFloat(org.lng) }}
                                >
                                    <div>
                                        <p>{org.name}</p>
                                    </div>
                                </InfoWindow>
                            )
                        }
                    </Marker>
                ))
            }
        </GoogleMap>
    )
}

export default Map;