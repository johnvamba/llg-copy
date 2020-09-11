import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import {Link, useParams} from 'react-router-dom';

const EditOrganization = () => {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});

    let {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`/api/organizations/${id}`);
            delete data['media'];
            setForm(data);
        }

        fetchData()
    }, [])

    console.log(id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let errors = "";

        try {
            let response = await axios.patch(`/api/organizations/${id}`, form)

            window.location.href = "/admin/organizations"
        } catch (err) {
            let {data} = err.response;
            
            errors = data.errors;
        }

        setErrors(errors || {});
    }

    const handleChange = (e) => {
        let inputs = {...form};
        inputs[e.target.name] = e.target.value;
        setForm(inputs);
    }

    return (
        <div>
            <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/organizations">
                <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
                <span>Go Back</span>
            </Link>

            <p className="text-gray-dark text-xl">
                Edit Organisation
            </p>
            
            <form onSubmit={handleSubmit}>
                <div className="bg-white shadow-lg mt-4 mb-10 rounded-sm">
                    <div className="w-full sm:w-full md:w-3/5 xl:w-2/5 p-6">
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

                        <TextInput
                            label="Location"
                            name="location"
                            value={form.location || ``}
                            placeholder="Enter location"
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