import React, {useState} from 'react';
import PencilIcon from '../../../svg/pencil';
import OffersFormCross from '../../../svg/offers-form-cross';
import OffersLocation from '../../../svg/offers-location';
import TabOrgs from './tab-org';
import TabTeams from './tab-team';


const CampusView = ({ setShowView, handleEdit }) => {

    const [tab, setTab] = useState('orgs');

    return(
        <section className="campus-view create-form">
            <header className="campus-view__header">
                <div className="flex bg-cover bg-center" style={{backgroundImage: "url()"}}>
                    <button className="org-form__close" onClick={() => setShowView(false)}>
                        <OffersFormCross />
                    </button>
                </div>
            </header>
            <section className="campus-view__body">
                <div className="title flex items-center justify-between">
                    <h2>Melbourne City</h2>
                    <button className="flex items-center" onClick={handleEdit}>
                        <PencilIcon />
                        Edit
                    </button>
                </div>
                <div className="address flex items-center">
                    <OffersLocation />
                    <label>Location Address Here</label>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                </p>
            </section>
            <section className="org-view__tabs offer-edit__opts">
                <ul>
                    <li className={"offer-edit__opts-item w-1/2 " + ((tab === 'orgs') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('orgs')}><h3>Organisations (24)</h3></li>
                    <li className={"offer-edit__opts-item w-1/2 " + ((tab === 'teams') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('teams')}><h3>Teams (2)</h3></li>
                </ul>
            </section>
            <section className="offers-create-form__body">
                { (tab === 'orgs') && <TabOrgs />}
                { (tab === 'teams') && <TabTeams />}
            </section>
        </section>
    )
}

export default CampusView;