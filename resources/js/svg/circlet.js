import React from "react";

const Circlet = ({strokeColor = '#2F80ED'})=>{
	return (<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="7.5" cy="7.5" r="5.5" stroke={strokeColor} strokeWidth="4"/>
	</svg>)
}
export default Circlet