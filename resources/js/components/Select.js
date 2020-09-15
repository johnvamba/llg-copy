import React from 'react';

const Select = ({
    label,
    name,
    value,
    data,
    errors,
    ...rest
}) => {
    return (
        <div className="relative mb-4">
            <label className={`font-thin block text-gray-500 text-sm mb-2`}>
                {label}
            </label>

            <select
                name={name}
                className={`border bg-white border-gray-400 focus:border-primary appearance-none rouded-lg px-3 py-2 appearance-none outline-none w-full`}
                {...rest}
                value={value}
            >
                <option value=""></option>
                {data.map(opt => (
                    <option key={`${opt.id}.${opt.value}`} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>

            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ${errors[name] ? "mt-4" : "mt-8"} `}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>

            {errors[name] &&
                <p className="text-red-500 text-xs italic">{errors[name][0]}</p>
            }
        </div>
    )
}

export default Select;