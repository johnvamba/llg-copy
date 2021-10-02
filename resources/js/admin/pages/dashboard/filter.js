import React, {useState} from 'react';
import Button from '../../../components/Button'
import DatePicker from 'react-datepicker';
import { selectStyle, selectStylePaddingZero, loadOrganization, loadCampus } from '../../../components/helpers/async_options';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setFilters } from '../../../redux/needs/actions';
import Calendar from '../../../svg/calendar'
import SwitchCheckbox from '../../../components/SwitchCheckbox'
import AsyncSelect from 'react-select/async';

const DashboardFilter = ({onClose, generate, setPicker}) => {
    const [startdate, setStartDate] = useState(startdate|| new Date());
    const [enddate, setEndDate] = useState(enddate|| new Date());
    const [dateType, selectDateType] = useState('custom');
    const [campus, setCampus] = useState(null)
    const [org, setOrg] = useState(null)
    const [errors, setErrors] = useState({})
    const [needs, setNeeds] = useState({
        open: false,
        mets: true,
    })
    const [types, setTypes] = useState({
        donations: true,
        fundraise: true,
        volunteer: true
    })
    const roles = useSelector( ({AuthUserReducer}) => AuthUserReducer.roles);
    const u_id = useSelector( ({AuthUserReducer}) => AuthUserReducer.profile ? AuthUserReducer.profile.profile.user_id : null);

    const dispatch = useDispatch();

    const clickDispatch = ()=>{
        let obj = {
            ...needs, ...types, dateType, 
            startdate: startdate.toUTCString(), 
            enddate: enddate.toUTCString(),
            u_id
        }

        if((roles.name == 'campus admin' || roles.name == 'admin') && !_.isEmpty(org))
            obj.org = org.id;

        if(roles.name == 'admin' && !_.isEmpty(campus))
            obj.campus = campus.id;

        if(typeof generate == 'function'){
            generate(obj)
            return;
        }
        
        const url = new URLSearchParams(obj).toString();
        window.open(`/needs/print?${url}`, '__blank');
    }
    const changeRadioOption = (value = false, option = 'open', disable = 'mets') => {
        setNeeds({ ...needs, [option]: value ? value : false, [disable]: false })
    }

    return (
        <div className="form dashboard-filter">
            <div className="form-body filter-body overflow-visible">
                <div className="form-group">
                    <label>Needs</label>
                    <div className="flex mt-2">
                        <div className="flex items-center mr-4">
                            <input type="radio" className="form-radio cursor-pointer mr-2" 
                                name="radio" 
                                value="public" 
                                checked={needs.open} 
                                onChange={e=>changeRadioOption(e.target.checked, "open", "mets")} 
                            />
                            {
                            /*<input type="checkbox" className="form-check-input" id="open"  checked={needs.open} onChange={e=>setNeeds({...needs, open: e.target.checked})}/>*/
                            }
                            <label className="form-check-label" htmlFor="open">Transactions</label>
                        </div>
                        <div className="flex items-center">
                            <input type="radio" className="form-radio cursor-pointer mr-2" 
                                name="radio" 
                                value="public" 
                                checked={needs.mets} 
                                onChange={e=>changeRadioOption(e.target.checked, "mets", "open")} 
                                />
                            {
                            /*<input type="checkbox" className="form-check-input" id="mets" 
                                checked={needs.mets} onChange={e=>setNeeds({...needs, mets: e.target.checked})}/>*/
                            }
                            <label className="form-check-label" htmlFor="mets">Needs</label>
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
                                onCalendarClose={()=> setPicker(false)}
                                onCalendarOpen={()=> setPicker(true)}
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
                                onCalendarClose={()=> setPicker(false)}
                                onCalendarOpen={()=> setPicker(true)}
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
                {
                    //Set user priveledges here.. campus users will need to know what organization is asking for need.
                    (roles.name == 'admin') && <div className={`form-group w-full ${errors.campus && 'form-error'}`}>
                        <label>Location</label>
                        <AsyncSelect
                            styles={selectStylePaddingZero}
                            loadOptions={loadCampus}
                            defaultOptions
                            cacheOptions
                            isClearable
                            value={campus}
                            placeholder="Location"
                            onChange={setCampus}
                            />
                        {
                            (errors.campus || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Location</span>
                        }
                    </div>
                }
                {
                    //Set user priveledges here.. campus users will need to know what organization is asking for need.
                    (roles.name == 'admin' || roles.name == 'campus admin') && <div className={`form-group w-full ${errors.organization && 'form-error'}`}>
                        <label>Organisation</label>
                        <AsyncSelect
                            key={campus ? campus.id : 'default'}
                            styles={selectStylePaddingZero}
                            loadOptions={(x,cb)=>loadOrganization(x, cb, { campus: campus ? campus.id:null })}
                            defaultOptions
                            isClearable
                            value={org}
                            placeholder="Organisation"
                            onChange={setOrg}
                            />
                        {
                            (errors.organization || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Organisation</span>
                        }
                    </div>
                }
            </div>
            <div className="filter-footer flex p-3 px-4">
                <div className="flex-grow-1"/>
                <Button className="primary-btn" onClick={clickDispatch}>Generate</Button>
            </div>
        </div>
    )
}
export default DashboardFilter