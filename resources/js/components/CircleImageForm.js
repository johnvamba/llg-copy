import React, { useState, useEffect, useRef } from 'react';
import './css/photo-circle.css';

const CircleImageForm = ({
    className = "",
    src,
    onChangeFile,
    error = null
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
    return <div className={`photo-circle ${className}`}>
        <img
            className="rounded-full image"
            src={tempUrl || `http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
        />
        <div className="photo-button">
            <button onClick={uploadInit}>Upload Photo</button>
            <input type="file" ref={fileInput} onChange={imageChange}/>
            <p>Images should be atleast 300 x 300 px in png or jpeg file</p>
        </div>
    </div>
}

export default CircleImageForm;
//Required on Campus and Organisation