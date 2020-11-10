import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import MapPin from '../svg/map-pin'

const Location = ({
    label,
    name,
    placesSelected,
    className,
    errors,
    ...props
}) => {

    return (
        <div className={`form-group ${className}`} >
            <label>{ label || 'Location'}</label>
            <div className="input-container">
                <i className="icon absolute">
                    <MapPin/>
                </i>
                <Autocomplete
                    className={`input-field space-l `}
                    onPlaceSelected={placesSelected}
                    types={['(regions)']}
                    componentRestrictions={{ country: "au" }}
                    {...props}
                />
                {
                    //<input className="" type="text" placeholder="Enter Location" name="usrnm"/>
                }
                {errors &&
                    <p className="text-red-500 text-xs italic">{errors[0]}</p>
                }
            </div>
        </div>
    )
}

export default Location;