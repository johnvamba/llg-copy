import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import CustomSelect from '../../../components/CustomSelect';
import Location from '../../../components/Location';
import { Link } from 'react-router-dom';
import { swalCreate } from '../../../components/helpers/alerts';

const CreateOrganization = () => {
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});

    useEffect(() => {
        async function fetchData() {
            let results = [];
            let {data} = await axios.get('/api/organizations-categories');
            
            data.map((record) => {
                results.push({value: record.id, label: record.name})
            })

            setCategories(results);
        }

        fetchData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = "";

        try {
            let response = await axios.post('/api/organizations', form)

            await swalCreate("/admin/organizations")
        } catch (err) {
            let { data } = err.response;

            errors = data.errors;
        }

        setErrors(errors || {});
    }

    const handleUpload = (e) => {
        console.log(e.target.name);
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
            inputs['category'] = values.map(data => {
                return data.value   
            });
        } else {
            inputs['category'] = [];
        }
        
        setForm(inputs);
    }

    return (
        <div className="p-12">
            <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/organizations">
                <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
                <span>Go Back</span>
            </Link>

            <p className="text-gray-dark text-xl">
                Create Organisation
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-row bg-white shadow-lg mt-4 mb-10 rounded-sm p-4">
                    <div className="flex flex-col flex-1 sm:w-full md:w-3/5 xl:w-2/5 m-2">
                        <label className="font-thin text-sm text-gray-500 mb-2">Photo</label>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleUpload}
                            className="mb-4"
                        />

                        <p className="text-gray-dark text-sm mb-4">
                            Details
                        </p>

                        <TextInput
                            label="Name"
                            name="name"
                            value={form.name || ``}
                            placeholder="Enter name"
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

                        <Location
                            label="Location"
                            name="location"
                            placesSelected={handleLocation}
                            className="border-b"
                            errors={errors}
                        />

                        <CustomSelect 
                            label="Category"
                            name="category"
                            options={categories} 
                            onChange={handleSelect}
                            isMulti={true}
                            className="border-0"
                            errors={errors}
                        />
                    </div>

                    <div className="flex flex-col flex-1 m-2">
                        <label className="font-thin text-sm text-gray-500 mb-2">Cover Photo</label>
                        <input
                            type="file"
                            name="cover_photo"
                            accept="image/*"
                            onChange={handleUpload}
                            className="mb-4"
                        />

                        <p className="text-gray-dark text-sm mb-4">
                            Stripe Credentials
                        </p>

                        <TextInput
                            label="Secret Key"
                            name="secretKey"
                            value={form.secretKey || ``}
                            placeholder="Enter stripe secret key"
                            onChange={handleChange}
                            errors={errors}
                        />

                        <TextInput
                            label="Publishable Key"
                            name="publishableKey"
                            value={form.publishableKey || ``}
                            placeholder="Enter stripe publishable key"
                            onChange={handleChange}
                            errors={errors}
                        />
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

export default CreateOrganization;