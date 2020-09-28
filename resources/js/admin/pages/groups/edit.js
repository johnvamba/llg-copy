import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import CustomSelect from '../../../components/CustomSelect';
import Button from '../../../components/Button';
import Location from '../../../components/Location';
import { Link, useParams } from 'react-router-dom';
import { swalCreate } from '../../../components/helpers/alerts';
import { Radio } from 'pretty-checkbox-react';

import 'pretty-checkbox';

const EditGroup = () => {
    const [privacy, setPrivacy] = useState([
        { value: 'public', label: 'Public' },
        { value: 'private', label: 'Private' }
    ]);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});

    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/groups/${id}`);
            setForm(data);

        }

        fetchData()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = "";

        try {
            delete form['media'];
            let response = await axios.patch(`/api/groups/${form.id}`, form)

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
                Edit Group
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col bg-white shadow-lg mt-4 mb-10 rounded-sm p-8">

                    <div className="w-1/2">
                        <TextInput
                            label="Name"
                            name="name"
                            value={form.name || ``}
                            placeholder="Enter name"
                            onChange={handleChange}
                            errors={errors}
                        />
                    </div>

                    <div className="w-1/2">
                        <Location
                            label="Location"
                            name="location"
                            defaultValue={form.location}
                            placesSelected={handleLocation}
                            className="border-b"
                            errors={errors}
                        />
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

export default EditGroup;