import React, {useState, useCallback} from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {Link} from 'react-router-dom';
 
const ForgotPassword = () => {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState(null);

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = () => {
        alert("submit");
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

            <div className="w-full md:w-2/3">
                <div className="flex flex-col justify-center items-center h-full">
                    <form
                        className="w-2/3 xs:w-2/4 sm:w-2/4 md:w-2/4 lg:w-2/5 xl:w-2/5 mt-2 mb-10"
                    >
                        <Link className="text-sm text-gray-500 inline-flex items-center" to="/">
                            <i className="fa fa-angle-left mr-2" aria-hidden="true"></i>
                            <span>Go Back</span>
                        </Link>

                        <div className="py-10 text-center">
                            <p className="text-2xl pb-2 text-blue-400 font-semibold">
                                Forgot your password?
                            </p>
                            <p className="text-sm">
                                Type in the email you registered and we will
                                send you a password reset link.
                            </p>
                        </div>

                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            placeholder="Email address"
                            onChange={handleChange}
                            errors={errors}
                            labelStyle="font-semibold"
                        />

                        <Button
                            className="w-full text-white mt-4 bg-blue-400 hover:bg-blue-500"
                            onClick={handleSubmit}
                        >
                            Send
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

export default ForgotPassword;