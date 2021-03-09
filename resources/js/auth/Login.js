import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import { Checkbox } from 'pretty-checkbox-react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import Logo from '../svg/logo';
import formBackground from '../../assets/images/login-1.png';
import mainBackground from '../../assets/images/login-2.jpg';

import './auth.css';

import 'pretty-checkbox';

const Login = () => {
    const [form, setForm] = useState({});
    const [remember, setRemember] = useState(false);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    if (Cookie.get('oToken_admin')) {
        window.location.href = '/admin'
    } 
    // else if(Cookie.get('oToken_org_admin')){
    //     window.location.href = '/org'
    // }

    const handleCheck = useCallback(() => {
        setRemember(prev => !prev);
    }, []);

    const handleChange = (event) => {
        let inputs = { ...form };
        inputs[event.target.name] = event.target.value;
        setForm(inputs);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let {data} = await axios.post('api/login', form);
            
            if (data.user.roles[0].name != 'user') {
                Cookie.set("oToken_admin", data.token);
                const oldpath = Cookie.get('pathname');
                if(oldpath){
                    Cookie.remove('pathname');
                    window.location.href = oldpath;
                    return;
                }
                window.location.href = '/admin';
            } else {
                alert("user is not allowed to sign in here");
            }
            // switch(data.user.roles[0].name){
            //     case 'admin':
            //         Cookie.set("oToken_admin", data.token);
            //         window.location.href = '/admin';
            //     break;
            //     case 'organization admin':
            //         Cookie.set("oToken_org_admin", data.token);
            //         window.location.href = '/org';
            //     break;
            //     case 'user':
            //     default:
            //         alert("user is not allowed to sign in here");
            //     return;
            // }            
        } catch(err) {
            let response = err.response;
            
            if (response.status == 422) {
                setErrors(response.data.errors)
                setError(null)
            } else if (response.status == 401) {
                setError(response.data.message)
                setErrors({})
            }
        }
    }

    return (
        <>
            <section className="login flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
                <section className="login__container">
                    <img src={formBackground} />
                    <section className="left">
                        <Logo />
                        <h1>Welcome, <br/> please sign in.</h1>
                        <form
                            onSubmit={handleSubmit}
                        >
                            {error && 
                                <p className="text-red-500 text-xs italic">* {error}</p>
                            }
                            <div className="form-group">
                                <label>
                                    Email
                                </label>

                                <input
                                    name="email"
                                    type="email"
                                    value={form.email || ``}
                                    placeholder="Email address"
                                    onChange={handleChange}
                                    className="w-full border-b border-t-0 border-l-0 
                                    border-r-0 border-grey-dark 
                                    focus:outline-none focus:border-blue-300"
                                />
                            </div>
                            {errors.email && 
                                <p className="text-red-500 text-xs italic">{errors.email[0]}</p>
                            }

                            <div className="form-group">
                                <label>
                                    Password
                                </label>

                                <input
                                    name="password"
                                    type={show ? 'text' : 'password'}
                                    value={form.password || ``}
                                    placeholder="********"
                                    onChange={handleChange}
                                    className="w-full border-b border-t-0 border-l-0 
                                    border-r-0 border-grey-dark 
                                    focus:outline-none focus:border-blue-300"
                                />
                                <div className={`absolute inset-y-0 right-0 pr-2 flex items-end text-sm leading-7`}>
                                    <button type="button" className="focus:outline-none" onClick={() => setShow(!show)}>
                                        {show ?
                                            <i className="fa fa-eye-slash text-gray-500" aria-hidden="true"></i>
                                            :
                                            <i className="fa fa-eye text-gray-600" aria-hidden="true"></i>
                                        }
                                    </button>
                                </div>
                            </div>
                            {errors.password && 
                                <p className="text-red-500 text-xs italic">{errors.password[0]}</p>
                            }

                            <div className="flex flex-row flex-wrap mt-4 mb-4">
                                <div className="flex-1">
                                    <Checkbox
                                        className="remember-me"
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
                                    <Link 
                                        className="forgot-pass" 
                                        to="/forgot-password"
                                    >Forgot Password?</Link>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full primary-btn"
                            >
                                Sign In
                            </Button>
                        </form>
                    </section>
                </section>
            </section>
        </>
        // <div className="flex flex-wrap h-screen">
        //     <div className="flex w-full md:w-1/3 bg-blue-500 p-12">
        //         <div className="flex flex-col justify-end">
        //             <p className="text-white text-2xl font-semibold align-text-bottom">Title</p>
        //             <p className="text-gray-200 text-lg font-medium">
        //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        //                 sed do eiusmod tempor incididunt ut labore et dolore
        //                 magna aliqua.
        //             </p>
        //         </div>
        //     </div>

        //     <div className="w-full md:w-2/3 mb-16">
        //         <div className="flex flex-col justify-center items-center h-full">
        //             <p className="text-center text-2xl text-blue-400 py-4 font-semibold">
        //                 Sign In Here
        //             </p>

                    // <form
                    //     onSubmit={handleSubmit}
                    //     className="w-3/5 xs:w-2/4 sm:w-2/4 md:w-2/4 lg:w-2/5 xl:w-2/5"
                    // >
                    //     {error && 
                    //         <p className="text-red-500 text-xs italic">* {error}</p>
                    //     }

                    //     <div className="relative">
                    //         <label className="block text-gray-500 text-sm font-semibold mb-2">
                    //             Email
                    //         </label>

                    //         <input
                    //             name="email"
                    //             type="email"
                    //             value={form.email || ``}
                    //             placeholder="Email address"
                    //             onChange={handleChange}
                    //             className="w-full border-b border-t-0 border-l-0 
                    //             border-r-0 border-grey-dark 
                    //             focus:outline-none focus:border-blue-300"
                    //         />
                    //     </div>
                    //     {errors.email && 
                    //         <p className="text-red-500 text-xs italic">{errors.email[0]}</p>
                    //     }

                    //     <div className="relative mt-4">
                    //         <label className="block text-gray-500 text-sm font-semibold mb-2">
                    //             Password
                    //         </label>

                    //         <input
                    //             name="password"
                    //             type={show ? 'text' : 'password'}
                    //             value={form.password || ``}
                    //             placeholder="********"
                    //             onChange={handleChange}
                    //             className="w-full border-b border-t-0 border-l-0 
                    //             border-r-0 border-grey-dark 
                    //             focus:outline-none focus:border-blue-300"
                    //         />
                    //         <div className={`absolute inset-y-0 right-0 pr-2 flex items-end text-sm leading-7`}>
                    //             <button type="button" className="focus:outline-none" onClick={() => setShow(!show)}>
                    //                 {show ?
                    //                     <i className="fa fa-eye-slash text-gray-500" aria-hidden="true"></i>
                    //                     :
                    //                     <i className="fa fa-eye text-gray-600" aria-hidden="true"></i>
                    //                 }
                    //             </button>
                    //         </div>
                    //     </div>
                    //     {errors.password && 
                    //         <p className="text-red-500 text-xs italic">{errors.password[0]}</p>
                    //     }

                    //     <div className="flex flex-row flex-wrap mt-4">
                    //         <div className="flex-1">
                    //             <Checkbox
                    //                 className="text-sm"
                    //                 animation="smooth"
                    //                 color="primary"
                    //                 shape="curve"
                    //                 state={remember}
                    //                 onChange={handleCheck}
                    //             >
                    //                 Remember me
                    //             </Checkbox>
                    //         </div>

                    //         <div className="flex-1 justify-center text-right">
                    //             <Link 
                    //                 className="text-sm text-blue-500 font-medium" 
                    //                 to="/forgot-password"
                    //             >Forgot Password?</Link>
                    //         </div>
                    //     </div>

                    //     <Button
                    //         type="submit"
                    //         className="w-full text-white font-semibold mt-8 bg-blue-400 hover:bg-blue-500"
                    //     >
                    //         Sign In
                    //     </Button>
                    // </form>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Login;