import React, { useRef, useEffect } from 'react';

const ListItem = ({data, handlePanels}) => {
    const { name, description, active_needs, past_needs, photo, banner, accessable } = data
    return (<li onClick={() => handlePanels(data, false, true)}>
        <header>
            <div className="org-list__cover-bg bg-cover bg-center" style={{backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} >
                <div className="org-list__rounded-img" style={{backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} ></div>
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
            {
                accessable && <span>
                    <span className="middle">.</span>
                    <span className="accessable">Accessable</span>
                </span>
            }
        </footer>
    </li>)
}

const OrgList = ({ handlePanels, set = [], triggerPage = () =>{} }) => {
    const scrolling = ({ target }) => {
        if(target.scrollTop + target.clientHeight >= target.scrollHeight)
            triggerPage()
    }

    return (
        <section className="component-body org-list" onScroll={scrolling}>
            <ul>
                {
                    set.length > 0 && set.map((i, key) => <ListItem key={key} data={i} handlePanels={handlePanels}/>)
                }
            </ul>
        </section>
    )
}
export default OrgList;