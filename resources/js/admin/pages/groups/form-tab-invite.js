import React, { useState, useEffect } from 'react';
import Search from '../../../svg/search';
import Attachment from '../../../svg/attachment';
import ItemMember from './item-member'
const FormTabInvite = ({data = {}, users = [], setUsers}) => {
    const [suggest, setSuggest] = useState(true)
    const [loading, setLoading] = useState(false)

    const [search, setSearch] = useState('')
    const [members, setMembers] = useState([])

    useEffect(()=>{
        handleSearch();
    }, [search])

    const onChangeSearch= (e)=>{
        setSearch(e.target.value)
        setSuggest(false);
    }

    useEffect(()=>{
        setSuggest(data.id ? true : false)
        if(data.id) {

        }
    }, [ data ])

    const handleInvite = (item, received = false) => {
        item.invite_status = received ? item.invite_status : 'sending'
        setMembers(members.map(i=>i.id == item.id ? item : i))
        if(!received)
            sendInvite(item)

    }
    const sendInvite = (item) => {
        if(data.id && item.id) {
            api.post(`/api/web/groups/invite`, {
                group_id: data.id,
                user_id: item.id
            }).then(({data})=>{
                const { invite_status } = data
                handleInvite({...item, invite_status}, true);
            })
        } else {
            setUsers([...users, item]);
        }
    }

    const handleSearch = () => {
        const token = axios.CancelToken.source();
        setLoading(true)
        api.get(`/api/web/groups/invite`, {
            params: {
                group_id: data.id || null,
                suggest,
                search
            }
        }).then(({data}) => {
            setMembers(data.data)
            setLoading(false)
        }).catch(() => {
        
        }).finally(()=>{

        })
    }

	return(
		<>
            <h3>Invite People</h3>
            <section className="tab__content">
                <p>Let’s help you grow your group by inviting people you may know.
                {
                    (!data.id) && <span>Users will be invited after submit.</span>
                }
                </p>
                
                <form className="w-full">
                    <div className="form-search">
                        <div>
                            <Search />
                            <input className="w-full focus:outline-none placeholder-gray-400" type="text" placeholder="Search for NEUMA people" value={search} onChange={onChangeSearch}/>
                        </div>
                    </div>
                </form>
                <section className="invites">
                    {
                        suggest && <h5>Suggested</h5>
                    }
                    {
                        loading && <h5>Loading...</h5>
                    }
                    <ul>
                        {
                            members.length > 0 && 
                            members.map((i, key)=> <ItemMember key={key} {...i} handleInvite={handleInvite} />)
                        }
                    </ul>
                </section>
                {/*<footer>
                    <div>
                        <label>Share Link</label>
                        <div className="share__container">
                            <div>
                                <Attachment />
                                <span>neuma_jasndauh3SDqeslkdsl123lskdade219039</span>
                            </div>
                            <button>Copy</button>
                        </div>
                    </div>
                </footer>*/}
            </section>
		</>
	)
}

export default FormTabInvite;