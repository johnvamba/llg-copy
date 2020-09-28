import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import CustomSelect from '../../../components/CustomSelect';
import Button from '../../../components/Button';
import Location from '../../../components/Location';
import { Link } from 'react-router-dom';
import { swalCreate } from '../../../components/helpers/alerts';
import { Radio } from 'pretty-checkbox-react';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import 'pretty-checkbox';

const CreateGroup = () => {
    const [privacy, setPrivacy] = useState([
        { value: 'public', label: 'Public' },
        { value: 'private', label: 'Private' }
    ]);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});
    const [tags, setTags] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = "";

        try {
            form['tags'] = JSON.stringify(tags);
            let response = await axios.post('/api/groups', form)

            await swalCreate("/admin/groups")
        } catch (err) {
            let { data } = err.response;

            errors = data.errors;
        }

        setErrors(errors || {});
    }

    const handleUpload = (e) => {
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

    const handleSelect = (values) => {
        let inputs = { ...form };

        if (values) {
            inputs['privacy'] = values.value
        } else {
            inputs['privacy'] = [];
        }

        setForm(inputs);
    }

    const handleRadio = (e) => {
        let inputs = { ...form };
        inputs[e.target.name] = e.target.value

        setForm(inputs);
    }

    return (
        <div className="p-12">
            <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/groups">
                <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
                <span>Go Back</span>
            </Link>

            <p className="text-gray-dark text-xl">
                Create Group
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col bg-white shadow-lg mt-4 mb-10 rounded-sm p-8">

                    <div className="flex flex-row flex-wrap space-x-4">
                        <div className="flex flex-1 flex-col">
                            <label className="font-thin text-sm text-gray-500 mb-2">Photo</label>
                            <input
                                type="file"
                                name="media"
                                accept="image/*"
                                onChange={handleUpload}
                                className="mb-4 w-64"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap space-x-4">
                        <div className="flex flex-1 flex-col">
                            <TextInput
                                label="Name"
                                name="name"
                                value={form.name || ``}
                                placeholder="Enter name"
                                onChange={handleChange}
                                errors={errors}
                            />
                        </div>

                        <div className="flex flex-1 flex-col">
                            <label
                                className="text-gray-500 text-sm font-thin pb-2"
                            >
                                Term
                            </label>
                            <div className="flex flex-row">
                                <Radio
                                    color="primary"
                                    name="term"
                                    onChange={handleRadio}
                                    value="Per Month"
                                    checked={form.term === 'Per Month'}
                                >Per Month</Radio>
                                <Radio
                                    color="primary"
                                    name="term"
                                    onChange={handleRadio}
                                    value="Per Year"
                                    checked={form.term === 'Per Year'}
                                >Per Year</Radio>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap space-x-4">
                        <div className="flex flex-1 flex-col">
                            <Location
                                label="Location"
                                name="location"
                                placesSelected={handleLocation}
                                className="border-b"
                                errors={errors}
                            />
                        </div>

                        <div className="flex flex-1 flex-col">
                            <TextInput
                                type="number"
                                label="Goals to Meet"
                                name="need"
                                value={form.need || ``}
                                placeholder="e.g 8"
                                onChange={handleChange}
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div className="w-1/2">
                        <TextArea
                            label="Description"
                            name="description"
                            value={form.description || ``}
                            placeholder="Enter description"
                            onChange={handleChange}
                            errors={errors}
                        />
                    </div>

                    <CustomSelect
                        label="Privacy"
                        name="privacy"
                        options={privacy}
                        onChange={handleSelect}
                        className="border-0 w-64"
                        errors={errors}
                    />

                    <div className="w-64">
                        <label className="text-gray-500 font-thin text-sm">
                            Tags
                            </label>
                        <ReactTagInput
                            tags={tags}
                            onChange={(newTags) => setTags(newTags)}
                        />
                    </div>
                    {errors['tags'] &&
                        <p className="text-red-500 text-xs italic">{errors['tags'][0]}</p>
                    }
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

export default CreateGroup;