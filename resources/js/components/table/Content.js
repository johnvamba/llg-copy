import React from 'react';
import Button from '../../components/Button'
import { NavLink } from 'react-router-dom';

const Content = ({ 
    module = {},
    rows = {}
}) => {
    let {columns, data} = rows;

    const handleDelete = async (row) => {
        const {data} = await axios.delete(`/api/${module.name}/${row.id}`);

        console.log(data);
        window.location.href = `/admin/${module.name}`;
    }

    return (
        <tbody>
            {data &&
                data.map((row, index) => (
                    <tr key={`${row}.${index}`} className="hover:bg-gray-100">
                       {columns.map((column, i) => (
                            <td 
                                className="border px-4 py-1" 
                                key={`${column}.${i}`}
                            >
                                {row[column]}
                            </td>   
                       ))}

                       <td
                            className="border px-4 py-1"
                            key={`${row.id}.${index}`}
                        >
                            <div className="flex flex-wrap justify-center items-center">
                                <NavLink to={`/${module.name}/edit/${row.id}`}>
                                    <Button
                                        className="m-2 bg-blue-500 text-xs text-white hover:bg-blue-600"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </NavLink>

                                <Button
                                    onClick={() => handleDelete(row)}
                                    className="m-2 bg-red-500 text-xs text-white hover:bg-red-600"
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </div>
                       </td>
                    </tr>
                ))
            }
        </tbody>
    )
}

export default Content;