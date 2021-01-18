import React from 'react';
import CampusIcon from '../../../svg/campus';

import './campus.css';

const CampusList = ({ campuses = [], setShowView }) => {
    return(
        <section className="component-body campus-list">
            <ul className="flex items-center flex-wrap">
                {
                    campuses.length > 0 && campuses.map((i, k)=> <li key={k} onClick={()=>setShowView(i, false, true)}>
                        <header>
                            <div className="flex bg-cover bg-center" style={{backgroundImage: `url(${i.photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} />
                        </header>
                        <section className="campus-list__body">
                            <h2>{i.name || 'Missing'} 
                            {
                                i.accessed && 
                                <span className="accessed">Has Access</span>
                            }
                            </h2>
                            <p>{i.description}</p>
                            <div className="flex items-center">
                                <CampusIcon />
                                <label>{i.org_count || 0} Organisations</label>
                            </div>
                        </section>
                    </li>)
                }
            </ul>
        </section>
    )
}

export default CampusList;