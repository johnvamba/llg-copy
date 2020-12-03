import React from 'react';
import PersonIcon from '../../../svg/person';

const Org = ({ name, description, members_count, photo}) => (<li>
        <img
            className="rounded-full"
            src={photo || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}
        />
        <div className="tab-org__details">
            <div>
                <h2>{name || 'missing-name'}</h2>
                <p>{description || ''}</p>
            </div>
            <button>
                <PersonIcon />
                { members_count || 0} Members
            </button>
        </div>
    </li>)

const TabOrgs = ({ orgs = [] }) => {
    return(
        <section className="tab-org">
            <ul>
                {
                    orgs.map((i, k) => <Org key={k} {...i} />)
                }
            </ul>
        </section>
    )   
}

export default TabOrgs;