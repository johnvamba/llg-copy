import React, {useState} from 'react';
import Button from '../../../components/Button'
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setFilters } from '../../../redux/needs/actions';
import Calendar from '../../../svg/calendar'
import SwitchCheckbox from '../../../components/SwitchCheckbox'

const NeedFilter = ({onClose, NeedsReducer}) => {
    const [type, setType] = useState(NeedsReducer.type|| null); //donation
    const [startdate, setStartDate] = useState(NeedsReducer.startdate|| new Date());
    const [enddate, setEndDate] = useState(NeedsReducer.enddate|| new Date());
    const [min, setMin] = useState(NeedsReducer.min || 0);
    const [max, setMax] = useState(NeedsReducer.max || 0);
    const [dateType, selectDateType] = useState('custom');

    const dispatch = useDispatch();

    const clickDispatch = ()=>{
        if(min > max){
            return;
        }
        dispatch( setFilters({ type, startdate, enddate, min, max, dateType }) );
    }

    const reset=() => {
        setType(null)
        setStartDate(new Date)
        setEndDate(new Date)
        setMin(0.00)
        setMax(0.00)
        selectDateType('custom')
        dispatch( setFilters({ 
            type: null, 
            startdate: new Date, 
            enddate: new Date, 
            min: 0.00, 
            max: 0.00, 
            dateType: 'custom', 
            filter: false }) );
    }
    
    return (
        <div className="filter-need form">
            <div className="form-body filter-body">

                <div className="flex justify-between">
                    <div className="form-group checkbox">
                        <label>Minimum Amount </label>
                    {/*
                        <SwitchCheckbox name={'minAmount'} checked={minSwitch} onChange={setMinSwitch}/>
                    */}
                        <div className="input-container">
                            <span className="currency">$</span>
                            <input className="input-field space-l" type="number" placeholder="0.00" value={null} name="goal" onChange={e=>setMin(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group checkbox">
                        <label>Maximum Amount  </label>
                    {/*
                        <SwitchCheckbox name={'maxAmount'} checked={maxSwitch} onChange={setMaxSwitch}/>
                    */}
                        <div className="input-container">
                            <span className="currency">$</span>
                            <input className="input-field space-l" type="number" placeholder="0.00" value={null} name="goal" onChange={e=>setMax(e.target.value)}/>
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
                                selected={startdate} 
                                name="date" 
                                className="input-field space-r"
                                onChange={setStartDate}
                                popperPlacement="bottom-end"
                                popperModifiers={{
                                  offset: {
                                    enabled: true,
                                    offset: '0px, 5px'
                                  },
                                  preventOverflow: {
                                    enabled: true,
                                    escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                                    boundariesElement: 'viewport'
                                  }
                                }}
                            />
                            <i className="icon right-0 absolute mr-2">
                                <Calendar/>
                            </i>
                        </div>
                        <div className="input-container">
                            <DatePicker 
                                dateFormat="MMM dd, yyyy"
                                selected={enddate} 
                                name="date" 
                                className="input-field space-r"
                                onChange={setEndDate}
                                popperPlacement="bottom-end"
                                popperModifiers={{
                                  offset: {
                                    enabled: true,
                                    offset: '0px, 5px'
                                  },
                                  preventOverflow: {
                                    enabled: true,
                                    escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                                    boundariesElement: 'viewport'
                                  }
                                }}
                            />
                            <i className="icon right-0 absolute mr-2">
                                <Calendar/>
                            </i>
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
export default connect(({NeedsReducer})=>{
    return {
        NeedsReducer
    }
},(dispatch)=>{
    return {

    }
})(NeedFilter);