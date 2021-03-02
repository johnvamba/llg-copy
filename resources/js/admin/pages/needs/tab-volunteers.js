import React from 'react';

const TabMembers = ({ members = [], loading = false }) => {
    return (
        <section className="tab-members px-0">
            {
                !loading ?
                <ul className="px-0 overflow-y-scroll" style={{maxHeight: '29rem'}}>
                    {
                        members.length > 0 && members.map((i, k)=><MemberItem key={k} {...i} />)
                    }
                </ul> : <div>Loading...</div>
            }
        </section>
    )
}

const MemberItem = ({image = null, name='', email='', contact='', custom_date = null}) => {
    return (<li className="unflex">
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
        <span className="tab-members__right text-xs text-gray-400">{custom_date}</span>
    </li>)
}
export default TabMembers;