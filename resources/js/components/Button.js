import React from 'react';

const Button = ({
    type,
    className = "",
    onClick,
    children,
    ...rest
}) => (
    <button
        type={type || `button`}
        onClick={onClick}
        className={`p-2 rounded focus:outline-none px-4 ${className}`}
        {...rest}
    >
        {children}
    </button>
)

export default Button;