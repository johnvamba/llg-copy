import React from 'react';
import {useSelector} from 'react-redux';

const Pagination = ({
    records = [],
    currentPage,
    offset,
    handleChangePage
}) => {
    const isFirstPage = () => {
        return offset === 0 && currentPage > 1;
    };

    const isLastPage = () => {
        return (offset + 1) < records.length;
    };

    return (
        <ul className="flex flex-row mt-4">
            {isFirstPage() &&
                <li>
                    <button className="px-2">
                        <i className="fa fa-arrow-left"></i>
                    </button>
                </li>
            }

            {records.map((data, index) => (
                <li key={`${data}.${index}`}>
                    <button className="px-2">
                        {parseInt(index) + 1}
                    </button>
                </li>
            ))}

           {isLastPage() && 
                <li>
                    <button className="px-2">
                        <i className="fa fa-arrow-right"></i>
                    </button>
                </li> 
           }
        </ul>
    )
}

export default Pagination;