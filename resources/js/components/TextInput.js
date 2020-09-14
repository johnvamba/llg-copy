import React from 'react';

const TextInput = ({
    label,
    labelStyle,
    name,
    type,
    placeholder,
    value,
    errors,
    ...rest
}) => {

    return (
        <div className="relative mb-4">
            <label className={`font-thin ${labelStyle} block text-gray-500 text-sm mb-2`}>
                {label}
            </label>

            <input
                {...rest}
                name={name}
                value={value || ``}
                type={type || `text`}
                placeholder={placeholder}
                className="w-full border-b border-t-0 border-l-0 border-r-0 border-grey-dark
                focus:outline-none"
            />

            {errors[name] && 
                <p className="text-red-500 text-xs italic">{errors[name][0]}</p>
            }
        </div>
    )
}

export default TextInput;