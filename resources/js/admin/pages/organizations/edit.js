import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import Location from '../../../components/Location';
import { Link, useParams } from 'react-router-dom';
import { swalUpdate } from '../../../components/helpers/alerts';

const EditOrganization = () => {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});

    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/organizations/${id}`);
            setForm(data);
        }

        fetchData()
    }, [])

    console.log(id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = "";

        try {
            delete form['media'];
            let response = await axios.patch(`/api/organizations/${id}`, form)

            await swalUpdate("/admin/organizations");
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

    const handleLocation = (input) => {
        let inputs = { ...form };
        inputs['location'] = input.formatted_address;
        inputs['lat'] = input.geometry.location.lat();
        inputs['lng'] = input.geometry.location.lng();
        setForm(inputs);
    }

    return (
        <div className="p-12">
            <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/organizations">
                <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
                <span>Go Back</span>
            </Link>

            <p className="text-gray-dark text-xl">
                Edit Organisation
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-row bg-white shadow-lg mt-4 mb-10 rounded-sm p-4">
                    <div className="flex flex-col flex-1 sm:w-full md:w-3/5 xl:w-2/5 m-2">
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
                            defaultValue={form.location || ``}
                            placesSelected={handleLocation}
                            className="border-b"
                            errors={errors}
                        />
                    </div>

                    <div className="flex flex-col flex-1 m-2">
                        <p className="text-gray-dark text-sm mb-4">
                            Stripe Credentials
                        </p>

                        <TextInput
                            label="Secret Key"
                            name="secretKey"
                            value={form.secretKey || ``}
                            onChange={handleChange}
                            errors={errors}
                        />

                        <TextInput
                            label="Publishable Key"
                            name="publishableKey"
                            value={form.publishableKey || ``}
                            onChange={handleChange}
                            errors={errors}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="text-white bg-blue-500 hover:bg-blue-600"
                >
                    Save Changes
                </Button>
            </form>
        </div>
    );
}

export default EditOrganization;