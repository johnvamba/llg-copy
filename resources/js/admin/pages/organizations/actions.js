import React from 'react';
import Button from '../../../components/Button'
import { NavLink } from 'react-router-dom';
import { swalDelete } from '../../../components/helpers/alerts';

const OrganizationActions = ({module = {}, row = {}}) => {

    const handleDelete = async (row) => {
        let swal = await swalDelete(module.singular);
        const { data } = await axios.delete(`/api/${module.endpoint}/${row.id}`);
    }

    return (
        <>
            <NavLink to={`${module.path}/edit/${row.id}`}>
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
        </>
    )
}
export default OrganizationActions;