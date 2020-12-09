import React, { useState, useEffect, useRef } from 'react';
import './css/photo-circle.css';
import Camera from '../svg/camera';
import EmptyImg from '../svg/empty-img';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const BannerImage = ({
    className = "",
    src,
    onChangeFile,
    error = null,
    ver2 = false,
    height = '150px',
    width = '100%',
    ...props
}) => {
	const fileInput = useRef(null)
	const [tempUrl, setTempUrl] = useState(null);

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

    return <div className={`banner-photo ${className} ${!tempUrl ? 'banner-photo--empty' : ''}`} style={{height, width, backgroundImage: `url(${tempUrl || ''})`}}>
		{
			!props.children && <EmptyImg />
		}
        <button className={`banner-button`} onClick={uploadInit}>
        	<Camera />
        	Add Cover
        </button>
        <input type="file" ref={fileInput} onChange={imageChange}/>
        { props.children }
    </div>
}

export default BannerImage;
//Required on Campus and Organisation