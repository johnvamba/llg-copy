import React from 'react';

const TextArea = ({
    label,
    name,
    type,
    placeholder,
    value,
    errors,
    ...rest
}) => {

    return (
        <div className="relative mb-2">
            <label className="font-thin block text-gray-500 text-sm mb-2">
                {label}
            </label>

            <textarea
                name={name}
                value={value || ``}
                placeholder={placeholder}
                {...rest}
                className={'resize w-full border-b border-gray-dark focus:outline-none'}
            ></textarea>

            {errors[name] &&
                <p className="text-red-500 text-xs italic">{errors[name][0]}</p>
            }
        </div>
    )
}

export default TextArea;