import React, { useState, useCallback } from 'react';
import BannerImage from '../components/BannerImage';
import ImageCropper from '../components/ImageCropper'
import CircleImgForm from '../components/CircleImgForm';

import EmptyImg from '../svg/empty-img';

const OrgLogos = ({images, cropper, setImages, openCropper, handleImages, errors = {}, design = 1 }) => {
    const handleBanner = (banner)=>{
        setImages({
            ...images,
            banner
        })
    }
	if(cropper)
	{
        return <div className="fixed inset-0 cropper">
        <ImageCropper aspect={14/5} originalImage={cropper} 
            onImageCropped={handleBanner}
            closeCropper={()=>openCropper(null)} />
        </div>
    }

	if(design==1)
		return <div className="flex upload-containers mt-4">
			<div className="flex flex-column flex-shrink mr-4" style={{width: '105px'}}>
				<label>Your Logo</label>
				<CircleImgForm ver2={true} src={images.photo} droplogo={true} onChangeFile={(file)=>handleImages(file, 'photo')}/>
				{	
					errors.photo && <p className="my-2 text-red-500">{errors.photo}</p>
				}
			</div>
			<div className="flex flex-column flex-grow">
				<label>Your Banner</label>
				<BannerImage className={'banner-drop flex justify-center items-center flex-row'} src={images.banner} onChangeFile={(file)=>handleImages(file, 'banner', true)}>
            		{
            			images.banner && <span/>
            		}
            	</BannerImage>
            	{	
					errors.banner && <p className="my-2 text-red-500">{errors.banner}</p>
				}
			</div>
		</div>

}

export default OrgLogos;