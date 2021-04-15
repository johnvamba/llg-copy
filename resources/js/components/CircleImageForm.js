import React, { useState, useEffect, useRef } from 'react';
import './css/photo-circle.css';
import PencilIcon from '../svg/pencil';
import EmptyImg from '../svg/empty-img';

const CircleImageForm = ({
    className = "",
    src,
    onChangeFile,
    error = null,
	ver2 = false,
	editForm
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
		const img = new Image();
		img.onload = () => {
			if(img.width < 300 || img.height < 300){
				alert("'Images should be atleast 300 x 300 px in png or jpeg file");
				return;
			}
			console.log('img', img.width, img.height);
			setTempUrl( img.src );
		}
		reader.onload = (e2) => {
			img.src = e2.target.result
		}
		reader.readAsDataURL(files[0])
	}

	const uploadInit = (e) => {
		fileInput.current.click();
	}

	if(ver2)
		return <>
		{/* <div className={`photo-circle org-circle`}>
			<img 
				className="rounded-full image"
	            src={tempUrl || `http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
			/>
			<input type="file" ref={fileInput} onChange={imageChange}/>
			<button className="button-pencil" onClick={uploadInit}><PencilIcon fill={'#CF995F'}/></button>
			</div> */}
			{
				tempUrl 
					?
					<div className={`photo-circle org-circle`}>
						<img 
							className="rounded-full image"
							src={tempUrl}
						/>
						<input type="file" ref={fileInput} onChange={imageChange}/>
						<button className="button-pencil" onClick={uploadInit}><PencilIcon fill={'#fff'}/></button>
					</div>
					:
					<div className="photo-circle__empty-img photo-circle__empty-img--inside-banner">
						<EmptyImg />
						<input type="file" ref={fileInput} onChange={imageChange}/>
						<button className="button-pencil" onClick={uploadInit}><PencilIcon fill={'#fff'}/></button>
					</div>
			}
		</>
		
    return <div className={`photo-circle ${className}`}>
		{
			tempUrl 
				? 
				<img
					className="rounded-full image"
					src={ tempUrl }
				/>
				:
				<div className="photo-circle__empty-img">
					<EmptyImg />
				</div>
		}
        {/* <img
            className="rounded-full image"
            src={tempUrl || `http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
        /> */}
        <div className="photo-button">
			<div>
				<button className="primary-btn" onClick={uploadInit}>Upload Photo</button>
				{
					editForm &&
						<button className="primary-btn remove-btn">remove</button>
				}
			</div>
            <input type="file" ref={fileInput} onChange={imageChange}/>
            <p className={error ? 'error' : ''}>{error ? error : 'Images should be atleast 300 x 300 px in png or jpeg file'}</p>
        </div>
    </div>
}

export default CircleImageForm;
//Required on Campus and Organisation