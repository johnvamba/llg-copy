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
                <th className="checkbox">
                    <input type='checkbox' checked={checkAll} onChange={e=>setCheckAll(e.target.checked)}/>
                </th>
                <th className="title">Title</th>
                <th className="">Type of Need</th>
                <th className="">Goal</th>
                <th className="">Status</th>
                <th className="">Date Added</th>
                <th className="actions">Actions</th>
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
        <td className="checkbox">
            <input type='checkbox' checked={checkValue} onChange={checkChange}/>
        </td>
        <td className="title">
            <div className="flex"> 
                <img className="title-img" />
                <p onClick={onShowInfo}>
                    { title }
                </p>
            </div>
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
            <td className="actions row-actions">
                <button>
                    <Check/>
                </button>
                <button>
                    <Cross/>
                </button>
            </td> :
            <td className="actions row-actions">
                <Button className="flex text-white bg-blue-500 hover:bg-blue-600" 
                    disabled={status !== 'achieved'}
                    onClick={()=>alert('something')}>
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