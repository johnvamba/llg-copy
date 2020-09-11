import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

import 'pretty-checkbox';

const ResetPassword = () => {
    const [form, setForm] = useState({});
    const [remember, setRemember] = useState(false);
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        let inputs = { ...form };
        inputs[event.target.name] = event.target.value;
        setForm(inputs);
    }

    const handleSubmit = async () => {
        try {
            let response = await axios.post('api/login', form);
        } catch(err) {
            let errors = err.response;
            
            if (errors.status == 422) {
                setErrors(errors.data.errors)
            }
        }
    }

    const handleShowPassword = async(key) => {
        let secure = {...show};
        secure[key] = !secure[key];
        setShow(secure);
    }

    return (
        <div className="flex flex-wrap h-screen">
            <div className="flex w-full md:w-1/3 bg-blue-500 p-12">
                <div className="flex flex-col justify-end">
                    <p className="text-white text-2xl font-semibold align-text-bottom">Title</p>
                    <p className="text-gray-200 text-lg font-medium">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                </div>
            </div>

            <div className="w-full md:w-2/3 mb-16">
                <div className="flex flex-col justify-center items-center h-full">
                    <form
                        className="w-3/5 xs:w-2/4 sm:w-2/4 md:w-2/4 lg:w-2/5 xl:w-2/5"
                    >
                        <div className="py-10 text-center">
                            <p className="text-2xl pb-2 text-blue-400 font-semibold">
                                Reset your password
                            </p>
                            <p className="text-sm">
                                Type in the email you registered and we will
                                send you a password reset link.
                            </p>
                        </div>

                        <div className="relative mt-4">
                            <label className="block text-gray-500 text-sm font-semibold mb-2">
                                New Password
                            </label>

                            <input
                                name="password"
                                type={show.password ? 'text' : 'password'}
                                value={form.password || ``}
                                placeholder="********"
                                onChange={handleChange}
                                className="w-full border-b border-t-0 border-l-0 
                                border-r-0 border-grey-dark 
                                focus:outline-none focus:border-blue-300"
                            />
                            <div className={`absolute inset-y-0 right-0 pr-2 flex items-end text-sm leading-7`}>
                                <button type="button" className="focus:outline-none" onClick={()=>handleShowPassword('password')}>
                                    {show.password ?
                                        <i className="fa fa-eye-slash text-gray-500" aria-hidden="true"></i>
                                        :
                                        <i className="fa fa-eye text-gray-600" aria-hidden="true"></i>
                                    }
                                </button>
                            </div>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password[0]}</p>}

                        <div className="relative mt-4">
                            <label className="block text-gray-500 text-sm font-semibold mb-2">
                                Confirm Password
                            </label>

                            <input
                                name="password_confirmation"
                                type={show.confirmPassword ? 'text' : 'password'}
                                value={form.password_confirmation || ``}
                                placeholder="********"
                                onChange={handleChange}
                                className="w-full border-b border-t-0 border-l-0 
                                border-r-0 border-grey-dark 
                                focus:outline-none focus:border-blue-300"
                            />
                            <div className={`absolute inset-y-0 right-0 pr-2 flex items-end text-sm leading-7`}>
                                <button type="button" className="focus:outline-none" onClick={()=>handleShowPassword('confirmPassword')}>
                                    {show.confirmPassword ?
                                        <i className="fa fa-eye-slash text-gray-500" aria-hidden="true"></i>
                                        :
                                        <i className="fa fa-eye text-gray-600" aria-hidden="true"></i>
                                    }
                                </button>
                            </div>
                        </div>
                        {errors.password_confirmation && <p className="text-red-500 text-xs italic">{errors.password_confirmation[0]}</p>}

                        <Button
                            className="w-full text-white font-semibold mt-8 bg-blue-400 hover:bg-blue-500"
                            onClick={handleSubmit}
                        >
                            Reset
                        </Button>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Did you remember your password?
                            <span>
                                <Link className="ml-2 text-sm text-blue-400 font-semibold" to="/">
                                    Try logging in
                                </Link>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;