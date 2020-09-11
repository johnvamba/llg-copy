import React from 'react';

const Header = ({
    columns = []
}) => {

    return (
        <thead>
            <tr>
                {columns.map((data,index) => {
                    if (data == 'id') {
                        return (
                            <th 
                                className="border-r px-4 py-2" 
                                key={`${data.id}.${index}`}
                            >
                                #
                            </th>
                        );
                    }

                    return (
                        <th 
                            className="border-r px-4 py-2 capitalize" 
                            key={`${data.id}.${index}`}
                        >
                            {data}
                        </th>
                    )
                })}
                <th key={`${columns}`}>
                    Action
                </th>
            </tr>
        </thead>
    )
}

export default Header