import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import './css/image-cropper.css';
import "react-image-crop/dist/ReactCrop.css";
// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

export default function ImageCropper({originalImage, aspect = 21/9, onImageCropped, closeCropper, circle = false}) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({aspect: aspect, width: 100, unit: "%"});
  const [completedCrop, setCompletedCrop] = useState(null);
  const onLoad = useCallback((img) => {
    imgRef.current = img;
    setCrop({ aspect, unit: '%', width:100})
  }, []);

  // useEffect(()=>{
  //   setCrop({aspect: aspect, width: 100, unit: '%'})
  // }, [aspect])

  const cropImage = () => {
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise(res => {
      res(canvas.toDataURL('image/jpeg', 1.0))
    })
  }

  useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      return;
    }
    cropImage().then(onImageCropped)
  }, [completedCrop]);

  return (
    <div className="image-cropper">
      <div className="cropper-container">
        <p className="my-2 leading-relaxed text-base">Please crop your image to the right size by clicking and dragging the cross.</p>
        <ReactCrop
          src={originalImage}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={setCrop}
          circularCrop={circle}
          onComplete={(crops)=>setCompletedCrop(crops)}
        />      
        <button
          className="image-button"
          type="button"
          onClick={() => closeCropper(false)}
        >Save
        </button>
      </div>
    </div>
  );
}
