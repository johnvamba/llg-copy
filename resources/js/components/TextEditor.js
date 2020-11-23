import React, {useState, useEffect} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import './css/text-editor.css'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({rawBlocks = '', handleUpdate, editorState = null, handleEditorState = ()=>{},  ...props}) => {
    const [converted, setConverted] = useState(false);
    // const [changed, setChanged] = useState(false);
    const [imageUpload, setImageUpload] = useState([]);

    useEffect(()=>{
        if(!converted && rawBlocks !== '' && typeof rawBlocks == 'string'){
            handleEditorState( EditorState.createWithContent( convertFromRaw( JSON.parse(rawBlocks) ) ) );
            setConverted(true);
        }
    }, [rawBlocks])


    const handleOnChangeBody = (editorState) => {
        // setChanged(rawBlocks != content)
        handleEditorState(editorState)
        if(handleUpdate){
            const content = JSON.stringify( convertToRaw( editorState.getCurrentContent() ) );
            handleUpdate( content );
        }
    }

    const uploadImageCallBack = (file) => {
        let uploadedImages = imageUpload;
        const imageObject = {
          file: file,
          localSrc: URL.createObjectURL(file),
        }
        uploadedImages.push(imageObject);
        setImageUpload({ uploadedImages: uploadedImages })

        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
          }
        );
    }

    return (
        <div className={`create-story__wysiwyg form-group ${props.className ||''}`}>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleOnChangeBody}    
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { uploadCallback: uploadImageCallBack, previewImage: true, },
                }}
            />
        </div>
    )
}

export default TextEditor;