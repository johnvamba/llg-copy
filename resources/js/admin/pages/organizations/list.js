import React from 'react';

const ListItem = ({data, handlePanels}) => {
    const { name, description, active_needs, past_needs } = data
    return (<li onClick={() => handlePanels(data, false, true)}>
        <header>
            <div className="org-list__cover-bg bg-cover bg-center" style={{backgroundImage: "url()"}}>
                <div className="org-list__rounded-img"></div>
            </div>
        </header>
        <div className="org-list__body">
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
        <footer className="org-list__footer">
            <span className="active">{active_needs || 0} Active Needs</span>
            <span className="middle">.</span>
            <span className="past">{past_needs || 0} Past Needs</span>
        </footer>
    </li>)
}

const OrgList = ({ handlePanels, set = [] }) => {
    return (
        <section className="component-body org-list">
            <ul>
                {
                    set.length > 0 && set.map((i, key) => <ListItem key={key} data={i} handlePanels={handlePanels}/>)
                }
            </ul>
        </section>
    )
}
export default OrgList;