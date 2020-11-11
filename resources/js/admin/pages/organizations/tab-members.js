import React from 'react';

const TabMembers = ({ members = [], loading = false }) => {
    return (
        <section className="tab-members">
            {
                !loading ?
                <ul>
                    {
                        members.length > 0 && members.map((i, k)=><MemberItem key={k} {...i} />)
                    }
                </ul> : <div>Loading...</div>
            }
        </section>
    )
}

const MemberItem = ({image = null, name='', email='', contact=''}) => {
    return (<li>
        <div className="tab-members__left">
            {
                <img
                    className="rounded-full"
                    src={image || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}
                />
            }
            <div className="tab-members__item-details">
                <label>{name}</label>
                <p>{email}</p>
                <p>{contact}</p>
            </div>
        </div>
        <button className="tab-members__right">
            <i className="text-sm fas fa-ellipsis-h"></i>
        </button>
    </li>)
}
export default TabMembers;