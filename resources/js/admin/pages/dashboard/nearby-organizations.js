import React from 'react';
import Map from '../../../components/helpers/map/';

const NearbyOrganizations = () => {
    return (
        <div className="w-full bg-white rounded-lg border">
            <div className="flex flex-row px-4 py-4">
                <div className="flex flex-1 items-center">
                    <p className="text-sm">
                        Nearby Organisations
                    </p>
                </div>

                <div className="flex flex-1 justify-end items-center">
                    <span>
                        <i className="fas fa-sliders-h"></i>
                    </span>
                </div>
            </div>

            <Map 
                isMarkerShown
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.MIX_PLACESAUTOCOMPLETE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

export default NearbyOrganizations;