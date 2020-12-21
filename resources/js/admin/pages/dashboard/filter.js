import React, {useState} from 'react';
import Button from '../../../components/Button'
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setFilters } from '../../../redux/needs/actions';
import Calendar from '../../../svg/calendar'
import SwitchCheckbox from '../../../components/SwitchCheckbox'

const DashboardFilter = ({onClose, generate}) => {
    const [startdate, setStartDate] = useState(startdate|| new Date());
    const [enddate, setEndDate] = useState(enddate|| new Date());
    const [dateType, selectDateType] = useState('custom');
    const [needs, setNeeds] = useState({
        open: false,
        mets: false,
    })
    const [types, setTypes] = useState({
        donations: false,
        fundraise: false,
        volunteer: false
    })

    const dispatch = useDispatch();

    const clickDispatch = ()=>{
        if(minSwitch && maxSwitch && min > max){
            return;
        }
        if(typeof generate == 'function')
            generate({
                ...needs,
                types,
                dateType,
                startdate,
                enddate
            })
    }

    return (
        <div className="form dashboard-filter">
            <div className="form-body filter-body">
                <div className="form-group">
                    <label>Needs</label>
                    <div className="flex mt-2">
                        <div className="form-check mr-4">
                            <input type="checkbox" className="form-check-input" id="open" 
                            checked={needs.open} onChange={e=>setNeeds({...needs, open: e.target.checked})}/>
                            <label className="form-check-label" htmlFor="open">Open Needs</label>
                        </div>
                        <div className="form-check mr-4">
                            <input type="checkbox" className="form-check-input" id="mets" 
                            checked={needs.mets} onChange={e=>setNeeds({...needs, mets: e.target.checked})}/>
                            <label className="form-check-label" htmlFor="mets">Needs Met</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Type of Need</label>
                    <div className="flex mt-2">
                        <div className="form-check mr-4">
                            <input type="checkbox" className="form-check-input" id="donations" 
                            checked={types.donations} onChange={e=>setTypes({...types, donations: e.target.checked})}/>
                            <label className="form-check-label" htmlFor="donations">Donations</label>
                        </div>
                        <div className="form-check mr-4">
                            <input type="checkbox" className="form-check-input" id="fundraise" 
                            checked={types.fundraise} onChange={e=>setTypes({...types, fundraise: e.target.checked})}/>
                            <label className="form-check-label" htmlFor="fundraise">Fundraise</label>
                        </div>
                        <div className="form-check mr-4">
                            <input type="checkbox" className="form-check-input" id="volunteer" 
                            checked={types.volunteer} onChange={e=>setTypes({...types, volunteer: e.target.checked})}/>
                            <label className="form-check-label" htmlFor="volunteer">Volunteer</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Select Date Range Added</label>
                    <div className='flex mt-2'>
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
            <div className="filter-footer flex p-3 px-4">
                <div className="flex-grow-1"/>
                <Button className="primary-btn" onClick={clickDispatch}>Generate</Button>
            </div>
        </div>
    )
}
export default DashboardFilter