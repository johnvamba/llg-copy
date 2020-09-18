import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Location from '../../../components/Location';
import { Link, useParams } from 'react-router-dom';
import { swalUpdate } from '../../../components/helpers/alerts';

const EditOffer = () => {
    const [types, setTypes] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});

    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/service-offer/${id}`);

            setForm(data);
        }

        fetchData()
    }, [])

    useEffect(() => {
        async function fetchType() {
            let { data } = await axios.get('/api/offers-types');
            setTypes(data);
        }

        fetchType();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = "";

        try {
            delete form['media'];
            delete form['name'];

            let response = await axios.patch(`/api/service-offer/${id}` , form)

            await swalUpdate("/admin/offers")
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
            <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/offers">
                <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
                <span>Go Back</span>
            </Link>

            <p className="text-gray-dark text-xl">
                Edit Need
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex bg-white shadow-lg mt-4 mb-10 rounded-sm p-4">
                    <div className="flex flex-col w-1/2">
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

                        <Location
                            label="Location"
                            name="location"
                            defaultValue={form.location || ``}
                            placesSelected={handleLocation}
                            className="border-b"
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

export default EditOffer;