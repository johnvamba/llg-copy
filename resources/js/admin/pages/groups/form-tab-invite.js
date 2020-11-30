import React, { useState, useEffect } from 'react';
import Search from '../../../svg/search';
import Attachment from '../../../svg/attachment';
import ItemMember from './item-member'
const FormTabInvite = ({data = {}, users = [], setUsers}) => {
    const [suggest, setSuggest] = useState(true)
    const [search, setSearch] = useState('')
    const [members, setMembers] = useState([
        {
            id: 1,
            name: "Random User",
            image: null
        },
        {
            id: 2,
            name: "Random user 3",
            image: null
        },
        {
            id: 3,
            name: "Name 2",
            image: null
        }
    ])
    useEffect(()=>{

    }, [search])

    useEffect(()=>{
        if(data.id) {

        }
    }, [ data ])

    const handleSearch = () => {
        api.get(`/api/web/groups/`)
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
                            <input className="w-full focus:outline-none placeholder-gray-400" type="text" placeholder="Search for NEUMA people" value={search} onChange={e=>setSearch(e)}/>
                        </div>
                    </div>
                </form>
                <section className="invites">
                    {
                        suggest && <h5>Suggested</h5>
                    }
                    <ul>
                        {
                            members.length > 0 && 
                            members.map((i, key)=> <ItemMember key={key} {...i}/>)
                        }
                    </ul>
                </section>
                <footer>
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
                </footer>
            </section>
		</>
	)
}

export default FormTabInvite;