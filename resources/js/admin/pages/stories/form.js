import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
//import Select from '../../../components/Select';
import { Link } from 'react-router-dom';
import { swalCreate } from '../../../components/helpers/alerts';
import ReactTagInput from "@pathofdev/react-tag-input";
import OffersFormCross from '../../../svg/offers-form-cross';
import StoriesHouseIcon from '../../../svg/stories-house';
import Browse from '../../../svg/browse';
import StoriesPublishIcon from '../../../svg/stories-publish';
import OffersViewEdit from '../../../svg/offers-view-edit';
import StoriesModal from './modal';
import "@pathofdev/react-tag-input/build/index.css";

const StoriesForm = ({ state, setState, setShowViewStory }) => {
    const [errors, setErrors] = useState({});
    const [tags, setTags] = useState([]);
    const [form, setForm] = useState({});
    const [modal, setModal] = useState(false);

    // temporary has value
    const [hasFeaturedImage, setHasFeaturedImage] = useState(true);
    
    const toggle = () => setModal(!modal);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        let errors = "";

        try {
            Object.keys(form).map(key => {
                formData.append(key, form[key]);
            });

            formData.append('tags', JSON.stringify(tags));

            let response = await axios.post('/api/stories', formData)

            await swalCreate("/admin/stories")
        } catch (err) {
            let { data } = err.response;

            errors = data.errors;
        }

        setErrors(errors || {});
    }

    const handleChange = (e) => {
        let inputs = { ...form };
        inputs[e.target.name] = e.target.value;
        setForm(inputs);
    }

    const handleUpload = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            delete form['media'];
            return ;
        }

        createImage(files[0]);
    }

    const createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            let inputs = { ...form };
            inputs['media'] = e.target.result;
            setForm(inputs);
        };
        reader.readAsDataURL(file);
    }

    const handleClose = () => {
        setState(false);
        setShowViewStory(false);
    }


    return (
        <>
            <section className="create-story">
                <section className="create-story__header">
                    <h2>{ (state == 'create') ? 'Create' : 'Edit' } Story</h2>
                    <button type="button" onClick={handleClose}>
                        <OffersFormCross />
                    </button>
                </section>
                <section className="create-story__body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group create-story__category">
                            <label>Select Category</label>
                            <ul>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li className={ (state == 'edit') ? 'active' : '' }>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                            </ul>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input 
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter Title"
                                defaultValue={ (state == 'edit') ? 'Sample Text Here' : '' }
                            />
                        </div>
                        <div className="create-story__wysiwyg form-group">
                            
                        </div>
                        <div className="create-story__featured form-group">
                            <label>Featured Image</label>
                            {
                                (state == 'edit')
                                    ?   <div className="flex bg-cover bg-center" style={{backgroundImage: "url(https://www.ratemds.com/blog/wp-content/uploads/2015/09/handshake-shaking-hands-shake-hands-trust.jpg)"}}>
                                            <button>
                                                <OffersViewEdit /> 
                                                Update Image
                                            </button>
                                        </div>
                                    :   <div className="create-story__featured-container">
                                            <div>
                                                <Browse />
                                                <span>Drag & drop or browse</span>
                                            </div>
                                        </div>
                                    
                            }
                        </div>
                    </form>
                </section>
                <section className="create-story__footer">
                    <div className="create-story__footer-container">
                        <button className="discard" onClick={handleClose}>Discard</button>
                        <div>
                            <span onClick={toggle}>Preview</span>
                            <button className="publish">
                                <span>Publish</span>
                                <StoriesPublishIcon />
                            </button>
                        </div>
                    </div>
                </section>
            </section>
            {
                <StoriesModal modal={modal} toggle={toggle} />
            }
        </>
       
    );
}

export default StoriesForm;