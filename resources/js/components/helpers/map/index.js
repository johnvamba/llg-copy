import React, { useEffect } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps"
import Marker from './marker';
import Style from './style';

const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    scrollwheel: false,
    styles: Style.mapStyle
};

const Map = withScriptjs(withGoogleMap((props) => {

    const center = {
        lat: -33.868782,
        lng: 151.207583
    }

    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={center}
            mapTypeId='roadmap'
            defaultOptions={defaultMapOptions}
            defaultZoom={14}
        >
            {props.isMarkerShown && 
                <Marker 
                    {...center}
                    props={props}
                />
            }
        </GoogleMap >
    )
}))

export default Map;