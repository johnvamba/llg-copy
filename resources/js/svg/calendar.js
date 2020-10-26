import React from "react";

const Calendar = ({fill = '#44CE94', className})=>{
	return (<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="1" y="1.36841" width="13.0855" height="11.6316" rx="1.2" stroke="#99A6B7" strokeWidth="1.5"/>
		<rect x="3.18115" width="2.34868" height="1.73353" rx="0.5" fill="#99A6B7"/>
		<rect x="9.72412" width="2.34868" height="1.73353" rx="0.5" fill="#99A6B7"/>
		<rect x="3.4502" y="3.52771" width="1.8862" height="1.8862" rx="0.4" fill="#99A6B7"/>
		<rect x="6.68359" y="3.52771" width="1.8862" height="1.8862" rx="0.4" fill="#99A6B7"/>
		<rect x="9.91699" y="3.52771" width="1.8862" height="1.8862" rx="0.4" fill="#99A6B7"/>
		<rect x="3.4502" y="6.7522" width="1.8862" height="1.8862" rx="0.4" fill="#99A6B7"/>
		<rect x="6.68359" y="6.75208" width="1.8862" height="1.8862" rx="0.4" fill="#99A6B7"/>
		<rect x="9.91699" y="6.75208" width="1.8862" height="1.8862" rx="0.4" fill="#99A6B7"/>
	</svg>)
}
export default Calendar