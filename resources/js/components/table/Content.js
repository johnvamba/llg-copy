import React, { useState } from 'react';
import UserActions from '../../admin/pages/users/actions';
import OrganizationActions from '../../admin/pages/organizations/actions';
import NeedsCategoryActions from '../../admin/pages/needs-category/actions';
import NeedsActions from '../../admin/pages/needs/actions';
import OffersActions from '../../admin/pages/offers/actions';
import StoriesActions from '../../admin/pages/stories/actions';
import GroupsActions from '../../admin/pages/groups/actions';

const Content = ({
    module = {},
    columns = [],
    data = {},
    currentPage = 0,
}) => {
    // console.log(data);

    if (data.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={columns.length + 1} className="text-gray-500 border-t px-4 py-8 text-xs">
                        No results found.
                    </td>
                </tr>
            </tbody>
        )
    }

    const actions = row => {
        switch (module.singular) {
            case 'user':
                return <UserActions module={module} row={row} />
                break;
            case 'organisation':
                return <OrganizationActions module={module} row={row} />
                break;
            case 'category':
                return <NeedsCategoryActions module={module} row={row} />
                break;
            case 'need':
                return <NeedsActions module={module} row={row} />
                break;
            case 'offer':
                return <OffersActions module={module} row={row} />
                break;
            case 'story':
                return <StoriesActions module={module} row={row} />
                break;
            case 'group':
                return <GroupsActions module={module} row={row} />
                break;
            default:
                break;
        }
    }

    return (
        <tbody>
            {
                Object.values(data).map((row, index) => (
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
                            key={`${row.id}`}
                        >
                            { actions(row) }
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}

export default Content;