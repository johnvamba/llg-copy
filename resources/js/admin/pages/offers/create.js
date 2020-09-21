import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
//import Select from '../../../components/Select';
import { Link } from 'react-router-dom';
import { swalCreate } from '../../../components/helpers/alerts';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const CreateOffer = () => {
    const [types, setTypes] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [errors, setErrors] = useState({});
    const [showOtherName, setShowOtherName] = useState(false);
    const [tags, setTags] = useState([]);
    const [form, setForm] = useState({
        lat: 12.22,
        lng: 12.22
    });

    useEffect(() => {
        async function fetchOrganization() {
            let { data } = await axios.get('/api/organizations');
            setOrganizations(data);
        }

        fetchOrganization();
    }, [])

    useEffect(() => {
        async function fetchTypes() {
            let { data } = await axios.get('/api/offers-types');
            console.log(data);
            setTypes(data);
        }

        fetchTypes();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = "";

        try {
            form['tags'] = tags;

            let response = await axios.post('/api/service-offer', form)

            await swalCreate("/admin/offers")
        } catch (err) {
            let { data } = err.response;

            errors = data.errors;
        }

        setErrors(errors || {});
    }

    const handleChange = (e) => {
        let inputs = { ...form };
        inputs[e.target.name] = e.target.value;

        if (e.target.name == 'service_type_id') {
            types.filter(type => {
                if (type.id == e.target.value) {
                    setShowOtherName(type.name == 'Other' ? true : false);
                    inputs['name'] = '';
                }else {
                    delete inputs['name'];
                }
            })
        }
        
        setForm(inputs);
    }

    return (
        <div className="p-12">
            <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/offers">
                <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
                <span>Go Back</span>
            </Link>

            <p className="text-gray-dark text-xl">
                Create Offer
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex bg-white shadow-lg mt-4 mb-10 rounded-sm p-4">
                    <div className="flex flex-col w-1/2">
                        <p className="text-gray-dark text-sm mb-4">
                            Details
                        </p>

                        {/* <Select
                            label="Organisation"
                            name="organization_id"
                            value={form.organization_id || ``}
                            data={organizations}
                            onChange={handleChange}
                            errors={errors}
                        />

                        <Select
                            label="Type"
                            name="service_type_id"
                            value={form.service_type_id || ``}
                            data={types}
                            onChange={handleChange}
                            errors={errors}
                        /> */}

                        {showOtherName && (
                            <TextInput
                                label="Type name"
                                name="name"
                                value={form.name || ``}
                                placeholder="Specify name"
                                onChange={handleChange}
                                errors={errors}
                            />
                        )}

                        <TextInput
                            label="Title"
                            name="title"
                            value={form.title || ``}
                            placeholder="Enter title"
                            onChange={handleChange}
                            errors={errors}
                        />

                        <TextArea
                            label="Description"
                            name="description"
                            value={form.description || ``}
                            placeholder="Enter description"
                            onChange={handleChange}
                            errors={errors}
                        />

                        <TextInput
                            label="Location"
                            name="location"
                            value={form.location || ``}
                            placeholder="Enter location"
                            onChange={handleChange}
                            errors={errors}
                        />

                        <label className="text-gray-600 font-thin">
                            Tags
                        </label>
                        <ReactTagInput
                            tags={tags}
                            onChange={(newTags) => setTags(newTags)}
                        />
                        {errors['tags'] &&
                            <p className="text-red-500 text-xs italic">{errors['tags'][0]}</p>
                        }
                    </div>
                </div>

                <Button
                    type="submit"
                    className="text-white bg-blue-500 hover:bg-blue-600"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default CreateOffer;