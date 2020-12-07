import React, { useState, useEffect, useRef } from 'react';
import './css/time-input.css'

const TimeInput = ({value, onChange}) => {
	const refHour = useRef(null);
	const refMinute = useRef(null);
	const [hour, setHour] = useState('00');
	const [minute, setMinute] = useState('00');
    const [meridiem, setMeridiem] = useState('AM');
	const [init, setInit] = useState(false);
    useEffect(()=>{
    	if(value != '' && typeof value == 'string'){
    		const regex = /([0-9]{2}):([0-9]{2})\W(AM|PM)/g;
    		const check = [...value.matchAll(regex)];
    		if(!init) {
    			// console.log('check??', check);
    			setHour(check[0] ? check[0][1] : '00')
    			setMinute(check[0] ? check[0][2] : '00')
    			setMeridiem(check[0] ? check[0][3] : 'AM')
    			setInit(true)
    		}
    	}
    }, [value]);

    useEffect(()=>{
    	if(typeof onChange == 'function')
    		onChange(hour +':'+minute+" "+meridiem);
    }, [hour, minute, meridiem]);

    const changeHour = (value) => {
    	if(parseInt(value) > 12){
    		const hour = Math.floor(value / 10);
    		setHour(hour >= 10 ? hour : `0${hour}`);
    		setMinute(parseInt(value) % 10);
    		if(refHour.current)
    			refHour.current.blur();
    		if(refMinute.current)
    			refMinute.current.focus();
    	} else {
    		setHour(value);
    	}
    }

    const changeMinute = (value) => {
    	const parsed = parseInt(value); 
    	if(parsed > 59) {
    		setMinute(59)
    	} else {
    		setMinute(parsed > 10 ? parsed : `0${parsed}`)
    	}
    }

    const minuteBlur = ()=>{
    	if(minute.length == 1 && parseInt(minute) < 10)
    		setMinute(`0${minute}`)
    }

	return <div className="input-container time-input">
        <div className="time-group">
            <input type="text" ref={refHour} pattern="[0-9]{2}" placeholder="--" value={hour} 
        	onChange={(e)=>changeHour(e.target.value)}/>
        	<span className="colon-divider">:</span>
        	<input type="text" ref={refMinute} pattern="[0-9]{2}" placeholder="--" value={minute} 
        	onChange={(e)=>changeMinute(e.target.value)} onBlur={minuteBlur}/>
        </div>
        <span className={`time-toggle time-am ${meridiem =='AM' ? 'active':''}`} onClick={()=>setMeridiem('AM')}>AM</span>
        <span className={`time-toggle time-pm ${meridiem =='PM' ? 'active':''}`} onClick={()=>setMeridiem('PM')}>PM</span>
    </div>
}

export default TimeInput