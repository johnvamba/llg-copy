import React, {useState} from 'react';
import Button from '../../../components/Button'
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setFilters } from '../../../redux/needs/actions';

const NeedFilter = ({onClose}) => {
    const [type, setType] = useState(null); //donation
    const [date, setDate] = useState(new Date());
    const [min, setMin] = useState(0.00);
    const [max, setMax] = useState(0.00);
    const [dateType, selectDateType] = useState('custom');

    const dispatch = useDispatch();

    const clickDispatch = ()=>{
        setFilters({ type, date, min, max, dateType })
    }

    const reset=() => {
        setType(null)
        setDate(new Date)
        setMin(0.00)
        setMax(0.00)
        selectDateType('custom')
    }
    
    return (
        <div className="filter-need form">
            <div className="form-body filter-body">
                <div className="flex justify-between">
                    <div className="form-group">
                        <label>Minimum Amount</label>
                        <div className="input-container">
                            <span className="currency">$</span>
                            <input className="input-field space-l" type="number" placeholder="0.00" value={min} name="goal" onChange={e=>setMin(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Maximum Amount</label>
                        <div className="input-container">
                            <span className="currency">$</span>
                            <input className="input-field space-l" type="number" placeholder="0.00" value={max} name="goal" onChange={e=>setMax(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Type of Need</label>
                    <div className="button-group">
                        <Button className={type=='donation' ? 'active': ''} onClick={()=>setType('donation')}>Donation</Button>
                        <Button className={type=='fundraise' ? 'active': ''} onClick={()=>setType('fundraise')}>Fundraise</Button>
                        <Button className={type=='volunteer' ? 'active': ''} onClick={()=>setType('volunteer')}>Volunteer</Button>
                    </div>
                </div>
                <div className="form-group">
                    <label>Select Date Range Added</label>
                    <div className='flex'>
                        <div className="input-container">
                            <select name="date-type" value={dateType} onChange={(e)=>selectDateType(e.target.value)}>
                                <option value="type1">Weekly</option>
                                <option value="custom">Custom Date</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <DatePicker 
                                dateFormat="MMM dd, yyyy"
                                selected={date} 
                                name="date" 
                                showPopperArrow={false} 
                                className="input-field space-r"
                                onChange={(date)=>setDate(date)}
                            />
                        </div>
                        <div className="input-container">
                            <DatePicker 
                                dateFormat="MMM dd, yyyy"
                                selected={date} 
                                name="date" 
                                showPopperArrow={false} 
                                className="input-field space-r"
                                onChange={(date)=>setDate(date)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="filter-footer flex">
                <a href='#' className="text-clear flex-grow" onClick={reset}>Clear Filters</a>
                <a href='#' className="flex-none pr-5" onClick={onClose}>Cancel</a>
                <a href='#' className="text-primary flex-none" onClick={clickDispatch}>Apply</a>
            </div>
        </div>
    )
}
export default NeedFilter;