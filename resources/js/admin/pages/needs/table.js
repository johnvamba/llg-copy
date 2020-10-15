import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
// import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'

const NeedTable = ({tab = null, data = [], showInfo})=> {
    const [checkAll, setCheckAll] = useState(false)
    const [needs, setNeeds] = useState(data)

    const handleRowCheckbox = (item, input)=>{
        setCheckAll(false)
        item.checked = input;
        setNeeds(needs.map(i => i.id == item ? item : i))
    }

    const handleCheckAll = ()=>{
        setCheckAll(!checkAll)

        setNeeds(needs.map(i=> {
            i.checked = !checkAll;
            return i;
        }))
    }

    return <table className="table">
        <thead className="bg-white tb-head">
            <tr>
                <th className="pl-2">
                    <input type='checkbox' checked={checkAll} onChange={e=>setCheckAll(e.target.checked)}/>
                </th>
                <th className="w-2/7">Title</th>
                <th className="w-1/7">Type of Need</th>
                <th className="w-1/7">Goal</th>
                <th className="w-1/7">Status</th>
                <th className="w-1/7">Date Added</th>
                <th className="w-1/7">Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                needs.length > 0 && 
                    needs.map((i, ind) => <RowTable key={ind} 
                        tab={tab} 
                        {...i} 
                        checkValue={i.checked}
                        checkChange={e=>handleRowCheckbox(i,e.target.checked)}
                        onShowInfo={()=>showInfo(i)}/>
                    )
            }
        </tbody>
    </table>
}

const RowTable = ({checkValue = false, checkChange, title ="Untitled", type = "Donation", goal = "N/A", status = "achieved", date = "Missing", writeStory = ()=>{}, onShowInfo}) => {
    const switchStatus=()=>{
        switch(status){
            case 'achieved':
            return <span className="label label-success">Achieved</span>;
            case 'on-going':
            return <span className="label label-active">On-Going</span>;
            case 'pending':
            return <span className="label label-pending">Pending</span>;
            default:
            return <span className="label label-secondary">Unknown</span>;
        }
    }
    return <tr>
        <td>
            <input type='checkbox' checked={checkValue} onChange={checkChange}/>
        </td>
        <td className="title">
            <div className="title-img"></div>
            <p onClick={onShowInfo}>
                { title }
            </p>
        </td>
        <td>
            {
                type
            }
        </td>
        <td className="col-currency">
            {
                (goal !== "N/A") ? ( <p><span className="currency">$</span>25.00</p>) : <p>N/A</p>
            }
        </td>
        <td>
            {
                switchStatus()
            }
        </td>
        <td>
            { date }
        </td>
        {
            status == 'pending' ?
            <td className="row-actions">
                <Button>
                    <Check/>
                </Button>
                <Button>
                    <Cross/>
                </Button>
            </td> :
            <td className="row-actions">
                <Button className="flex text-white bg-blue-500 hover:bg-blue-600" disabled={status !== 'achieved'}>
                    <Quill/>
                    Write a Story
                </Button>
            </td>
        }
    </tr>
}

NeedTable.defaultProps = {
    type: 'approved',
    data: [] // rows
}

export default NeedTable;