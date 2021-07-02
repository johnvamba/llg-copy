import React, { useState } from 'react';
import { swalSuccess, swalError } from '../../../components/helpers/alerts';
import Swal from 'sweetalert2';

const TabMembers = ({ members = [], loading = false, reloadMembers=()=>{}, disableResend = false, orgId = null }) => {
    return (
        <section className="tab-members">
            {
                !loading ?
                <ul>
                    {
                        members.length > 0 && members.map((i, k)=><MemberItem key={k} {...i} reloadMembers={reloadMembers} disableResend={disableResend} orgId={orgId}/>)
                    }
                </ul> : <div>Loading...</div>
            }
        </section>
    )
}

const MemberItem = ({id = null,image = null, name='', email='', contact='', invite_status = null, reloadMembers, disableResend = false, orgId = null}) => {
    const [loading, setLoading] = useState(false);
    const [loadInfo, setLoadInfo] = useState('Modifying User');

    const onReinvite = () => {
        setLoading(true)
        setLoadInfo("Resending Invite to User");
        api.post(`/api/web/organizations/${orgId}/resendInvite`, {
            invite_id: id
        })
        .then(()=>{
            swalSuccess("Invitation resent!")
        }).catch(()=>{

        }).finally(()=>{
            setLoading(false)
            setLoadInfo('')
        })
    }

    const onDelete = () => {
        setLoading(true)
        setLoadInfo("Deleting user");
        Swal.fire({
            title: 'Are you sure?',
            text: `You will remove ${invite_status == "pending" ? "invited" : "crew"} named ${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                let output = {
                    member_id: id
                };
                if(invite_status == 'pending') {
                    output ={
                        invite_id: id
                    }
                }
                 api.post(`/api/web/organizations/${orgId}/removeUser`, output)
                .then(()=>{
                    swalSuccess("Removed Crew")
                    reloadMembers()
                }).catch(()=>{

                }).finally(()=>{
                    setLoading(false)
                    setLoadInfo('')
                })
            } else {
                setLoading(false)
                setLoadInfo('')
            }
        })
       
    }

    return (<li>
        <div className="tab-members__left">
            {
                <img
                    className="rounded-full"
                    src={image || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}
                />
            }
            {
                <div className="tab-members__item-details">
                <label>{name}</label>
                {
                    loading ? <p>{loadInfo}</p> : <>
                        <p>{email}</p>
                        <p>{contact}</p>
                        { invite_status == 'pending' && <p>Invite Pending</p>}
                    </>
                }
            </div>
            }
        </div>
        <div className="dropdown">
        <button className="tab-members__right dropdown-toggle" type="button" id={`drpdwn-${id}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="text-sm fas fa-ellipsis-h"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby={`drpdwn-${id}`}>
            {
                !disableResend && <button class="btn btn-sm dropdown-item" type="button" onClick={onReinvite}>Resend Invite</button>
            }
            <button class="btn btn-sm dropdown-item" type="button" onClick={onDelete}>Delete {invite_status == "pending" ? "Invite": "User"}</button>
          </div>
        </div>
    </li>)
}
export default TabMembers;