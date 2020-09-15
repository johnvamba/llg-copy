import React, { useState } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';
import { swalCreate } from '../../../components/helpers/alerts';

const CreateNeedsCategory = () => {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = "";

        try {
            let response = await axios.post('/api/needs-categories', form)

            await swalCreate("/admin/needs/category")
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

    return (
        <div>
            <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/needs/category">
                <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
                <span>Go Back</span>
            </Link>

            <p className="text-gray-dark text-xl">
                Create Category
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex bg-white shadow-lg mt-4 mb-10 rounded-sm p-4">
                    <div className="flex flex-col w-1/2">
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

export default CreateNeedsCategory;