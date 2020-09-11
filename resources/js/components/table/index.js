import React from 'react';
import Header from './Header';
import Content from './Content';

const Table = ({
    module,
    headers,
    contents
}) => {

    return (
        <div className="rounded shadow bg-white">
            <table className="stripe hover w-full pt-1 pb-1">
                <Header columns={headers}/>
                <Content 
                    rows={contents} 
                    module={module} 
                />
            </table>
        </div>
    )
}

export default Table;