import React from 'react';

const Team = ({photo, name, email}) => (<li>
        <div className="tab-members__left items-center">
            <img
                className="rounded-full"
                src={photo || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}
            />
            <div className="tab-members__item-details">
                <label>{name || 'missing-name'}</label>
                <p>{email || 'missing-email'}</p>
            </div>
        </div>
        <button className="tab-members__right">
            <i className="text-sm fas fa-ellipsis-h"></i>
        </button>
    </li>)

const TabTeams = ({teams = []}) => {
    return(
        <section className="tab-teams tab-members">
            <ul>
                {
                    teams.map((i, k) => <Team key={k} {...i} />)
                }
            </ul>
        </section>
    )   
}

export default TabTeams;