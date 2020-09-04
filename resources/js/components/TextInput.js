import React from 'react';

const TextInput = ({
    label,
    name,
    type,
    placeholder,
    value,
    ...rest
}) => {

    return (
        <div className="mb-4">
            <label className="block text-gray-500 text-sm font-semibold mb-2">
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

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        </div>
    )
}

export default TextInput;