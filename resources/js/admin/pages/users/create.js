import React, { useState } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';

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

            window.location.href = "/admin/users"
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
                <div className="flex flex-col bg-white shadow-lg mt-4 mb-10 rounded-sm p-4">

                    <div className="pt-3 mb-10 center mx-auto">
                        <div className="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48">
                            <div className="mb-4">
                                <img 
                                    className="w-auto mx-auto rounded-full object-cover object-center" 
                                    src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp" 
                                    alt="Upload" 
                                />
                            </div>
                            <label className="cursor-pointer mt-6">
                                <span className="mt-2 text-base leading-normal px-4 py-2 bg-blue-500 text-white text-sm rounded-full" >Upload Photo</span>
                                <input 
                                    type='file' 
                                    className="hidden" 
                                    accept="image/*" 
                                />
                            </label>
                        </div>
                    </div>
                    
                    <div className="flex flex-row">
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