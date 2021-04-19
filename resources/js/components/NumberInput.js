import React, { useState, useEffect } from 'react';
// import { parsePhone } from '../components/helpers/validator';

const NumberInput = ({ name, value, onChange=()=>{}, placeholder = 'Enter value' }) => {
	const [unparse, setUnparsed] = useState();
	
	return <>
        <input 
      		className="input-field"
      		type="text"
      		value=""
      		/>
		<input
            type="hidden"
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder} />
	</>
}

export default NumberInput;