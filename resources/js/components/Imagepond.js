import React, {useState, useEffect} from 'react';
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
    reloadFiles = [],
    ...props
}) => {
    const [files, setFiles] = useState([]);

    const handleImage = (error, file)=>{
        if(!error && file){
            setFiles([file]);
            let reader = new FileReader();
            reader.onload = (e) => {
                imageSelected(e.target.result);
            };
            reader.readAsDataURL(file.file);
        }
    }

    return (
        <div className={`form-group  ${errors && 'form-error'} ${className} `} >
            <label htmlFor="InputPhoto">{ label || 'Feature Image'}</label>
            {
                (files.length <= 0 && photo) ? <div className="photo-container relative">
                    <img className={'feat-photo'} src={photo} />
                    <button className="flex absolute rounded-sm" type="button" onClick={({target})=>handleImage(null, target.files.length > 0 ? target.files[0] : null )}>
                        <Pencil fill={'#ffffff'} /> 
                        <span className="ml-1">Upload Image</span>
                    </button>
                    <input type="file" className="feat-photo-input" id="InputPhoto"/>
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