import React, { useState, useCallback } from 'react';
import BannerImage from '../components/BannerImage';
import ImageCropper from '../components/ImageCropper'
import CircleImgForm from '../components/CircleImgForm';

import EmptyImg from '../svg/empty-img';

const OrgLogos = ({images, cropper = {}, setImages, openCropper, handleImages, errors = {}, design = 1 }) => {
    const handleBanner = (image)=>{
        setImages({
            ...images,
            [cropper.type || 'banner']: image
        })
    }
    
	if(cropper.url)
	{
        return <div className="fixed inset-0 cropper">
        <ImageCropper aspect={(cropper.type == 'banner') ? 14/5 : 1} originalImage={cropper.url} 
            onImageCropped={handleBanner}
            circle={ cropper.type == 'photo'}
            closeCropper={()=>openCropper({...cropper, url: null})} />
        </div>
    }

	if(design==1)
		return <div className="flex upload-containers mt-4">
			<div className="flex flex-column flex-shrink mr-4" style={{width: '105px'}}>
				<label>Your Logo</label>
				<CircleImgForm ver2={true} src={images.photo} droplogo={true} onChangeFile={(file)=>handleImages(file, 'photo', true)}/>
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