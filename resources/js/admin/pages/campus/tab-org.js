import React from 'react';
import PersonIcon from '../../../svg/person';

const TabOrgs = () => {
    return(
        <section className="tab-org">
            <ul>
                <li>
                    <img
                        className="rounded-full"
                        src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    />
                    <div className="tab-org__details">
                        <div>
                            <h2>Organisation Name</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur...</p>
                        </div>
                        <button>
                            <PersonIcon />
                            384 Members
                        </button>
                    </div>
                </li>
                <li>
                    <img
                        className="rounded-full"
                        src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    />
                    <div className="tab-org__details">
                        <div>
                            <h2>Organisation Name</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur...</p>
                        </div>
                        <button>
                            <PersonIcon />
                            384 Members
                        </button>
                    </div>
                </li>
                <li>
                    <img
                        className="rounded-full"
                        src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    />
                    <div className="tab-org__details">
                        <div>
                            <h2>Organisation Name</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur...</p>
                        </div>
                        <button>
                            <PersonIcon />
                            384 Members
                        </button>
                    </div>
                </li>
                <li>
                    <img
                        className="rounded-full"
                        src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    />
                    <div className="tab-org__details">
                        <div>
                            <h2>Organisation Name</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur...</p>
                        </div>
                        <button>
                            <PersonIcon />
                            384 Members
                        </button>
                    </div>
                </li>
            </ul>
        </section>
    )   
}

export default TabOrgs;