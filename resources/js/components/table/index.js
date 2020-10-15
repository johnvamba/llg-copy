import React from 'react';
import Header from './Header';
import Content from './Content';

const Table = ({
    module,
    headers,
    data = [],
    currentPage,
}) => {

    const records = data.length > 0 ? data[currentPage - 1] : [];

    return (
        <div className="rounded shadow bg-white">
            <table className="stripe hover w-full pt-1 pb-1">
                <Header columns={headers}/>
                <Content 
                    columns={headers}
                    data={records} 
                    module={module} 
                    currentPage={currentPage}
                />
            </table>
        </div>
    )
}

export default Table;