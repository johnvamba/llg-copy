import React, {useState, useCallback} from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { Checkbox } from 'pretty-checkbox-react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
 
import 'pretty-checkbox';

const Login = () => {
    const [form, setForm] = useState({});
    const [remember, setRemember] = useState(false);

    const handleCheck = useCallback(() => {
        setRemember(prev => !prev);
    }, []);

    React.useEffect(() => {
        if (remember) {
            // perform some side effect
            // when the state changes
        }
    }, [remember]);

    const handleChange = (event) => {
        let inputs = {...form};
        inputs[event.target.name] = event.target.value;
        setForm(inputs);
    }

    const handleSubmit = async () => {
        let response = axios.post('api/login', form);
        console.log(response);
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
                    <p className="text-center text-2xl text-blue-400 py-4 font-semibold">
                            Sign In Here
                    </p>

                    <form
                        className="w-3/5 xs:w-2/4 sm:w-2/4 md:w-2/4 lg:w-2/5 xl:w-2/5"
                    >
                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            placeholder="Email address"
                            onChange={handleChange}
                        />

                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            placeholder="********"
                            onChange={handleChange}
                        />

                        <div className="flex flex-row flex-wrap">
                            <div className="flex-1">
                                <Checkbox 
                                    className="text-sm"
                                    animation="smooth"
                                    color="primary" 
                                    shape="curve" 
                                    state={remember} 
                                    onChange={handleCheck}
                                >
                                    Remember me
                                </Checkbox>
                            </div>

                            <div className="flex-1 justify-center text-right">
                                <Link className="text-sm text-blue-500 font-medium" to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </div>

                        <Button
                            title="Sign In"
                            style="text-white font-semibold mt-8 bg-blue-400 hover:bg-blue-500"
                            onClick={handleSubmit}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;