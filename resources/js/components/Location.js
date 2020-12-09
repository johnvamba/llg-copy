import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import MapPin from '../svg/map-pin'

const Location = ({
    label,
    name,
    placesSelected,
    className,
    cNContainer = '',
    errors,
    defaultValue,
    ...props
}) => {

    return (
        <div className={`form-group ${className}`} >
            <label>{ label || 'Location'}</label>
            <div className={`input-container ${cNContainer}`}>
                <i className="icon absolute map-pin">
                    <MapPin/>
                </i>
                <Autocomplete
                    apiKey={process.env.MIX_PLACESAUTOCOMPLETE_API_KEY || ''}
                    className={`input-field space-l `}
                    defaultValue={defaultValue}
                    onPlaceSelected={placesSelected}
                    types={['(regions)']}
                    componentRestrictions={{ country: "au" }}
                    {...props}
                />
                {
                    //<input className="" type="text" placeholder="Enter Location" name="usrnm"/>
                }
            </div>
            {errors &&
                <span className="text-red-500 text-xs italic">{ Array.isArray(errors) ? errors[0] : errors}</span>
            }
        </div>
    )
}

export default Location;