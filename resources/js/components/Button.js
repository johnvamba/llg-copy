import React from 'react';

const Button = ({
    title,
    type,
    style,
    onClick,
    ...rest
}) => {

    return (
        <button
            {...rest}
            type={type || `button`}
            onClick={onClick}
            className={`p-2 rounded w-full ${style}`}
        >
            {title}
        </button>
    )
}

export default Button;