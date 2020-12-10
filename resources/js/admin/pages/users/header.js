import React from 'react';
import OffersPlus from '../../../svg/offers-plus';
//depreciate
const UsersHeader = ({ setShowAddUser }) => {
    return (
        <>
            <section className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <div className="flex flex-1">
                    <h1>Users (7)</h1>
                </div>
                <div className="flex flex-1 justify-end">
                    <button className="primary-btn flex rounded-sm" onClick={() => setShowAddUser(true)}>
                        <OffersPlus />
                        <span>Add User</span>
                    </button>
                </div>
            </section>
        </>
    )
}
export default UsersHeader;