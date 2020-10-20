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
import StoriesModal from './modal';
import "@pathofdev/react-tag-input/build/index.css";

const CreateStory = ({ setShowCreateStory }) => {
    const [errors, setErrors] = useState({});
    const [tags, setTags] = useState([]);
    const [form, setForm] = useState({});
    const [modal, setModal] = useState(false);
    
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


    return (
        <>
            <section className="create-story">
                <section className="create-story__header">
                    <h2>Create Story</h2>
                    <button type="button" onClick={() => setShowCreateStory(false)}>
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
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                            </ul>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Enter Title" />
                        </div>
                        <div className="create-story__wysiwyg form-group">
                            
                        </div>
                        <div className="create-story__featured form-group">
                            <label>Featured Image</label>
                            <div className="create-story__featured-container">
                                <div>
                                    <Browse />
                                    <span>Drag & drop or browse</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
                <section className="create-story__footer">
                    <div className="create-story__footer-container">
                        <button className="discard" onClick={() => setShowCreateStory(false)}>Discard</button>
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

        // <div className="p-12">
        //     <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/stories">
        //         <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
        //         <span>Go Back</span>
        //     </Link>

        //     <p className="text-gray-dark text-xl">
        //         Create Story
        //     </p>

        //     <form onSubmit={handleSubmit}>
        //         <div className="flex bg-white shadow-lg mt-4 mb-10 rounded-sm p-4">
        //             <div className="flex flex-col w-1/2">
        //                 <p className="text-gray-dark text-sm mb-4">
        //                     Details
        //                 </p>

        //                 <label className="font-thin text-sm text-gray-500">Photo</label>
        //                 <input
        //                     type="file"
        //                     name="media"
        //                     accept="image/*"
        //                     onChange={handleUpload}
        //                     className="mb-4"
        //                 />

        //                 <TextInput
        //                     label="Title"
        //                     name="title"
        //                     value={form.title || ``}
        //                     placeholder="Enter title"
        //                     onChange={handleChange}
        //                     errors={errors}
        //                 />

        //                 <TextArea
        //                     label="Description"
        //                     name="description"
        //                     value={form.description || ``}
        //                     placeholder="Enter description"
        //                     onChange={handleChange}
        //                     errors={errors}
        //                 />

        //                 <label className="text-gray-600 font-thin">
        //                     Tags
        //                 </label>
        //                 <ReactTagInput
        //                     tags={tags}
        //                     onChange={(newTags) => setTags(newTags)}
        //                 />
        //                 {errors['tags'] &&
        //                     <p className="text-red-500 text-xs italic">{errors['tags'][0]}</p>
        //                 }
        //             </div>
        //         </div>

        //         <Button
        //             type="submit"
        //             className="text-white bg-blue-500 hover:bg-blue-600"
        //         >
        //             Submit
        //         </Button>
        //     </form>
        // </div>
    );
}

export default CreateStory;