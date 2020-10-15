import React from 'react';
import Autocomplete from 'react-google-autocomplete';

const Location = ({
    label,
    name,
    placesSelected,
    className,
    errors,
    ...props
}) => {

    return (
        <div className="relative mb-4">
            <label className={`font-thin block text-gray-500 text-sm mb-2`}>
                {label}
            </label>

            <Autocomplete
                className={`outline-none w-full ${className}`}
                onPlaceSelected={placesSelected}
                types={['(regions)']}
                componentRestrictions={{ country: "au" }}
                {...props}
            />

            {errors[name] &&
                <p className="text-red-500 text-xs italic">{errors[name][0]}</p>
            }
        </div>
    )
}

export default Location;