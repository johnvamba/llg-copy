import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import { Link, useParams } from 'react-router-dom';
import { swalCreate } from '../../../components/helpers/alerts';

const EditNeeds = () => {
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});

    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/needs/${id}`);

            setForm(data);
        }

        fetchData()
    }, [])

    useEffect(() => {
        async function fetchOrganization() {
            let { data } = await axios.get('/api/organizations');
            setOrganizations(data);
        }

        fetchOrganization();
    }, [])
    
    useEffect(() => {
        async function fetchCategory() {
            let { data } = await axios.get('/api/needs-categories');
            setCategories(data);
        }

        fetchCategory();
    }, [])

    useEffect(() => {
        async function fetchType() {
            let { data } = await axios.get('/api/needs-types');
            setTypes(data);
        }

        fetchType();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = "";

        try {
            delete form['media'];

            let response = await axios.patch(`/api/needs/${id}` , form)

            await swalCreate("/admin/needs")
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

    const handleTags = (tag) => {
        console.log(tag);
    }

    return (
        <div>
            <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/needs">
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

                        <TextInput
                            label="Location"
                            name="location"
                            value={form.location || ``}
                            placeholder="Enter location"
                            onChange={handleChange}
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

export default EditNeeds;