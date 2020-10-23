import React from "react";

const Filter = ({activated})=>{
	const color = activated ? "#109CF1" : "#323C47"
	return (<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 2.66663H16" stroke={color} strokeWidth="1.25" strokeLinecap="round"/>
		<path d="M1 8.5H16" stroke={color} strokeWidth="1.25" strokeLinecap="round"/>
		<path d="M1 14.3333H16" stroke={color} strokeWidth="1.25" strokeLinecap="round"/>
		<circle cx="12.6667" cy="2.66667" r="1.66667" fill="white" stroke={color} strokeWidth="1.25" strokeLinecap="round"/>
		<circle cx="4.33317" cy="8.50004" r="1.66667" fill="white" stroke={color} strokeWidth="1.25" strokeLinecap="round"/>
		<circle cx="8.50016" cy="14.3333" r="1.66667" fill="white" stroke={color} strokeWidth="1.25" strokeLinecap="round"/>
	</svg>
)
}
export default Filter