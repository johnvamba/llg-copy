import React from 'react';
import Table from '../table/';
import Pagination from '../table/Pagination';
import Button from '../Button';
import { NavLink } from 'react-router-dom';

const DataTable = ({
    module = {},
    records = [],
    currentPage,
    changeLimit,
    changePage,
}) => {

    const handleLimit = (e) => {
        changeLimit(e.target.value);
    }

    return (
        <div>
            <div className="flex flex-row">
                <div className="flex flex-1 items-center">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mr-2" htmlFor="grid-state">
                        Show
                    </label>
                    <div className="relative">
                        <select onChange={handleLimit} className="block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 justify-end py-2">
                    <NavLink to={`${module.path}/create`}>
                        <Button className="uppercase text-xs text-white bg-blue-500 hover:bg-blue-600" title="test">
                            <i className="fas fa-plus pr-2"></i>
                            <span>{`add ${module.singular}`}</span>
                        </Button>
                    </NavLink>
                </div>
            </div>

            <Table
                module={module}
                headers={records.columns}
                data={records.data}
                currentPage={currentPage}
            />

            <Pagination 
                currentPage={currentPage}
                records={records.data} 
                onChangePage={changePage}
            />
        </div>
    )
}

export default DataTable;