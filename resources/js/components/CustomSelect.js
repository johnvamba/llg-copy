import React from 'react';
import Select from 'react-select';

const CustomSelect = ({
    label,
    name,
    data = [],
    errors = {},
    onChange,
    ...rest
}) => {
    return (
        <div className="relative mb-4">
            <label className={`font-thin block text-gray-500 text-sm mb-2`}>
                {label}
            </label>

            <Select
                onChange={value => onChange(value, name)}
                options={data}
                {...rest}
            />

            {errors[name] &&
                <p className="text-red-500 text-xs italic">{errors[name][0]}</p>
            }
        </div>
    )
}

export default CustomSelect;