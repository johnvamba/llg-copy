import React, {useState, useEffect, useRef} from 'react';
import { FilePond, File, registerPlugin } from 'react-filepond'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImagePreview)

import Pencil from '../svg/pencil';

const Imagepond = ({
    label,
    name,
    photo,
    imageSelected,
    updateFiles,
    className = '',
    errors,
    cropped = false,
    reloadFiles = [],
    ...props
}) => {
    const [files, setFiles] = useState([]);
    const input = useRef(null);
    const handleImage = (error, file, update = false)=>{
        if(!error && file){
            setFiles([file]);
            let reader = new FileReader();
            reader.onload = (e) => {
                imageSelected(e.target.result);
            };
            reader.readAsDataURL(update ? file : file.file);
        }
    }
    useEffect(() => {
        if(cropped) {
            setFiles([]);
        }
    }, [cropped])

    return (
        <div className={`form-group  ${errors && 'form-error'} ${className} `} >
            <label htmlFor="InputPhoto">{ label || 'Feature Image'}</label>
            {
                (files.length <= 0 && photo) ? <div className="photo-container relative">
                    <img className={'feat-photo'} src={photo} />
                    <button className="flex absolute rounded-sm" type="button" onClick={()=>input.current.click()}>
                        <Pencil fill={'#ffffff'} /> 
                        <span className="ml-1">Upload Image</span>
                    </button>
                    <input type="file" ref={input} className="feat-photo-input" onChange={({target})=>handleImage(null, (target.files && target.files.length > 0) ? target.files[0] : null, true )} id="InputPhoto"/>
                </div> : 
                <FilePond
                    files={files}
                    onaddfile={handleImage}
                    onupdatefiles={updateFiles}
                    allowMultiple={false}
                    name="files"
                    labelIdle='Drag & Drop or <span class="filepond--label-action">Browse</span>'
                />
            }
            {
                (errors || false) && <span className="text-xs pt-1 text-red-500 italic">Missing photo</span>
            }
        </div>
    )
}

export default Imagepond;