import React, {useEffect, useState} from 'react';
import PencilIcon from '../../../svg/pencil';
import OffersFormCross from '../../../svg/offers-form-cross';
import OffersLocation from '../../../svg/offers-location';
import TabOrgs from './tab-org';
import TabTeams from './tab-team';
import LoadingScreen from '../../../components/LoadingScreen'
import { useSelector } from 'react-redux';

const CampusView = ({ data, handleForm }) => {
    const { name, org_count, team_count, description, location, photo } = data
    const [loading, setLoading] = useState(false);
    const [counts, setCounts] = useState({
        orgs: 0,
        teams: 0
    })
    const [orgs, setOrgs] = useState([]);
    const [teams, setTeams] = useState([]);
    const [pages, setPages] = useState({
        org: 1,
        teams: 1
    })
    const [tab, setTab] = useState('orgs');
    const roles = useSelector(
        state => state.AuthUserReducer.roles
    );
    useEffect(()=>{
        setLoading(true)
        loadTeams()
        loadOrgs()
    }, [data])

    const loadTeams = (clearCache = false) => {
        const token = axios.CancelToken.source();
        api.get(`/api/web/campuses/${data.id}/orgs`, {
            params: {
                page: pages.orgs,
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then((res)=>{
            const { data } = res
            setOrgs(data.data)
        }).finally(()=>{
            setLoading(false)
        })
        return token; //for useEffect
    }

    const loadOrgs = (clearCache = false) => {
        const token = axios.CancelToken.source();
        api.get(`/api/web/campuses/${data.id}/teams`, {
            params: {
                page: pages.teams,
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then((res)=>{
            const { data } = res
            setTeams(data.data)
        }).finally(()=>{
            setLoading(false)
        })
        return token; //for useEffect
    }

    return(
        <section className="campus-view create-form">
            {
                (loading) &&
                <LoadingScreen title={
                    'Loading contents for Location'
                }/>
            }
            <header className="campus-view__header">
                <div className="flex bg-cover bg-center" style={{backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} >
                    <button className="org-form__close" onClick={()=> handleForm({}, false, false)}>
                        <OffersFormCross />
                    </button>
                </div>
            </header>
            <section className="campus-view__body">
                <div className="title flex items-center justify-between">
                    <h2>{name}</h2>
                    {
                        (roles.name === 'admin' || roles.name === 'campus admin') &&
                        <button className="flex items-center" onClick={()=>handleForm(data, true, false)}>
                            <PencilIcon />
                            Edit
                        </button>
                    }
                </div>
                <div className="address flex items-center">
                    <OffersLocation />
                    <label>{location}</label>
                </div>
                <p>{description}</p>
            </section>
            <section className="org-view__tabs offer-edit__opts">
                <ul>
                    <li className={"offer-edit__opts-item w-1/2 " + ((tab === 'orgs') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('orgs')}><h3>Organisations{counts.orgs > 0? ` (${counts.orgs})` : ''}</h3></li>
                    <li className={"offer-edit__opts-item w-1/2 " + ((tab === 'teams') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('teams')}><h3>Teams{counts.orgs > 0? ` (${counts.orgs})` : ''}</h3></li>
                </ul>
            </section>
            <section className="offers-create-form__body">
                { (tab === 'orgs') && <TabOrgs orgs={orgs || []} />}
                { (tab === 'teams') && <TabTeams teams={teams || []} />}
            </section>
        </section>
    )
}

export default CampusView;