import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import CustomSelect from '../../../components/CustomSelect';
import Button from '../../../components/Button';
import Location from '../../../components/Location';
import { Link } from 'react-router-dom';
import { swalCreate } from '../../../components/helpers/alerts';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const CreateNeeds = () => {
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [errors, setErrors] = useState({});
    const [tags, setTags] = useState([]);
    const [form, setForm] = useState({
        lat: 28.22,
        lng: 28.22,
        raised: 0
    });

    useEffect(() => {
        async function fetchOrganization() {
            let results = [];
            let { data } = await axios.get('/api/organizations');

            data.map((record) => {
                results.push({ value: record.id, label: record.name })
            })

            setOrganizations(results);
        }

        fetchOrganization();
    }, [])

    useEffect(() => {
        async function fetchCategory() {
            let results = [];
            let { data } = await axios.get('/api/needs-categories');

            data.map((record) => {
                results.push({ value: record.id, label: record.name })
            })

            setCategories(results);
        }

        fetchCategory();
    }, [])

    useEffect(() => {
        async function fetchType() {
            let results = [];
            let { data } = await axios.get('/api/needs-types');

            data.map((record) => {
                results.push({ value: record.id, label: record.name })
            })

            setTypes(results);
        }

        fetchType();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = "";

        try {
            form['tags'] = JSON.stringify(tags);

            let response = await axios.post('/api/needs', form)

            await swalCreate("/admin/needs")
        } catch (err) {
            let { data } = err.response;

            errors = data.errors;
        }

        setErrors(errors || {});
    }

    const handleSelect = (values, key) => {
        let inputs = { ...form };

        if (typeof (values) === 'object' && values) {
            if (values.hasOwnProperty('value')) {
                inputs[key] = values.value;
            } else {
                inputs[key] = values.map(data => {
                    return data.value
                });
            }
        } else {
            inputs[key] = null;
        }

        setForm(inputs);
    }

    const handleChange = (e) => {
        let inputs = { ...form };
        inputs[e.target.name] = e.target.value;
        setForm(inputs);
    }

    const handleLocation = (input) => {
        let inputs = { ...form };
        inputs['location'] = input.formatted_address;
        inputs['lat'] = input.geometry.location.lat();
        inputs['lng'] = input.geometry.location.lng();
        setForm(inputs);
    }

    const handleUpload = (e) => {
        // console.log(e.target.name);
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            delete form[e.target.name];
            return;
        }

        createImage(files[0], e.target.name);
    }

    const createImage = (file, key) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            let inputs = { ...form };
            inputs[key] = e.target.result;
            setForm(inputs);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="p-12">
            <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/needs">
                <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
                <span>Go Back</span>
            </Link>

            <p className="text-gray-dark text-xl">
                Create Need
            </p>

            <form onSubmit={handleSubmit}>
                <div className="bg-white shadow-lg mt-4 mb-10 rounded-sm p-4">
                    <div className="flex flex-row space-x-4">
                        <div className="flex flex-1 flex-col">
                            <label
                                className="font-thin text-sm text-gray-500 text-sm"
                            >
                                Photo
                                </label>

                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleUpload}
                                className="mb-4 pt-4"
                            />

                            <CustomSelect
                                label="Category"
                                name="category"
                                data={categories}
                                onChange={handleSelect}
                                errors={errors}
                                isMulti={true}
                            />

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

                            <label className="text-gray-500 font-thin text-sm">
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

                        <div className="flex flex-1 flex-col">
                            <CustomSelect
                                label="Organisation"
                                name="organization"
                                data={organizations}
                                onChange={handleSelect}
                                errors={errors}
                            />

                            <CustomSelect
                                label="Type"
                                name="needs_type_id"
                                data={types}
                                onChange={handleSelect}
                                errors={errors}
                            />

                            <Location
                                label="Location"
                                name="location"
                                placesSelected={handleLocation}
                                className="border-b"
                                errors={errors}
                            />

                            <TextInput
                                type="number"
                                label="Goal"
                                name="goal"
                                value={form.goal || ``}
                                placeholder="e.g. 1000"
                                onChange={handleChange}
                                errors={errors}
                            />
                        </div>

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

export default CreateNeeds;