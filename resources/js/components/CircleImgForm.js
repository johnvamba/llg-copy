import React, { useState, useEffect, useRef } from 'react';
import './css/photo-circle.css';
import PencilIcon from '../svg/pencil';
import EmptyImg from '../svg/empty-img';

const CircleImgForm = ({
    className = "",
    src,
    onChangeFile,
    error = null,
	droplogo = false
}) => {
	const fileInput = useRef(null)
	const [tempUrl, setTempUrl] = useState(src);

	useEffect(()=>{
		if(tempUrl != src){
			setTempUrl(src)
		}
	}, [src])

	const imageChange = (e) => {
		const { files } = e.target
		if(typeof onChangeFile == 'function'){
			onChangeFile(files[0])
			return
		}
		const reader = new FileReader();
		reader.onload = (e2) => {
			setTempUrl(e2.target.result)
		}
		reader.readAsDataURL(files[0])
	}

	const uploadInit = (e) => {
		fileInput.current.click();
	}

	return <div className={`logo-drop flex justify-center items-center`} onClick={uploadInit}>
		{
			tempUrl &&
			<div className="rounded-full image w-full h-full bg-center bg-cover" style={{backgroundImage:  `url(${tempUrl})`}}></div>
		}
		{/*<img 
			className="rounded-full image"
			src={tempUrl}
		/>*/}
		<input type="file" ref={fileInput} onChange={imageChange}/>
		{
			(droplogo && !src) && <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M22.75 6.49992H19.2833L17.3333 4.33325H10.8333V6.49992H16.3583L18.4167 8.66659H22.75V21.6666H5.41667V11.9166H3.25V21.6666C3.25 22.8583 4.225 23.8333 5.41667 23.8333H22.75C23.9417 23.8333 24.9167 22.8583 24.9167 21.6666V8.66659C24.9167 7.47492 23.9417 6.49992 22.75 6.49992ZM8.66667 15.1666C8.66667 19.9874 14.5058 22.4141 17.9183 19.0016C21.3308 15.5891 18.9042 9.74992 14.0833 9.74992C11.0933 9.74992 8.66667 12.1766 8.66667 15.1666ZM14.0833 11.9166C14.9375 11.9411 15.75 12.2914 16.3543 12.8957C16.9585 13.4999 17.3088 14.3124 17.3333 15.1666C17.3088 16.0208 16.9585 16.8333 16.3543 17.4375C15.75 18.0418 14.9375 18.392 14.0833 18.4166C13.2291 18.392 12.4167 18.0418 11.8124 17.4375C11.2082 16.8333 10.8579 16.0208 10.8333 15.1666C10.8579 14.3124 11.2082 13.4999 11.8124 12.8957C12.4167 12.2914 13.2291 11.9411 14.0833 11.9166ZM5.41667 6.49992H8.66667V4.33325H5.41667V1.08325H3.25V4.33325H0V6.49992H3.25V9.74992H5.41667" fill="#CF995F"/>
			</svg>
		}
	</div>
}

export default CircleImgForm;
//Required on Campus and Organisation