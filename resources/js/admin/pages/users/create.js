import React, { useState } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';
import { swalCreate } from '../../../components/helpers/alerts';

const CreateUser = () => {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        lat: 8.492381,
        lng: 124.654649
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = "";

        try {
            let response = await axios.post('/api/users', form)
            console.log(response);

            await swalCreate("/admin/users")
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
            <Link className="mb-4 text-sm text-gray-500 inline-flex items-center" to="/users">
                <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
                <span>Go Back</span>
            </Link>

            <p className="text-gray-dark text-xl">
                Create User
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-row bg-white shadow-lg mt-4 mb-10 rounded-sm p-4">
                    <div className="flex flex-col flex-1 m-2">
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

                        <TextInput
                            label="Age"
                            name="age"
                            value={form.age || ``}
                            placeholder="Enter age"
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

                        <TextArea
                            label="Bio"
                            name="bio"
                            value={form.bio || ``}
                            placeholder="Enter bio"
                            onChange={handleChange}
                            errors={errors}
                        />


                    </div>

                    <div className="flex flex-col flex-1 m-2">
                        <p className="text-gray-dark text-sm mb-4">
                            Account Credentials
                        </p>

                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email || ``}
                            placeholder="Enter email"
                            onChange={handleChange}
                            errors={errors}
                        />

                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password || ``}
                            placeholder="Enter password"
                            onChange={handleChange}
                            errors={errors}
                        />

                        <TextInput
                            label="Confirm Password"
                            name="password_confirmation"
                            type="password"
                            value={form.password_confirmation || ``}
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

export default CreateUser;