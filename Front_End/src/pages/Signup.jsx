import React, { use, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../App';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleNameChange = (e) => setName(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const dataToSend = { name, username, email, password };
        console.log(dataToSend);
        

        try {
            
            const result = await axios.post(`${serverURL}/api/auth/signup`, dataToSend, { withCredentials: true });
            console.log('Signup Successful:', result.data);
            setLoading(false);
            setName('');
            setUsername('');
            setEmail('');
            setPassword('');

            navigate('/signin');

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.log("Signup FrontEnd Error:", errorMessage);
            alert(`Registration Failed: ${errorMessage}`);
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 p-4 sm:p-8">
            <div className="relative flex w-full max-w-sm md:max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">

                <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    
                    <div className="lg:hidden text-center mb-6">
                        <h1 className="text-4xl font-extrabold font-serif italic text-black">VYBE</h1>
                        <p className="mt-1 text-sm text-gray-600">Not Just A Platform, It's A VYBE</p>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center lg:text-left">
                        Sign Up to <span className="font-serif italic text-black">VYBE</span> 
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        <div>
                            <label htmlFor="name" className="sr-only">Enter Your Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black text-sm sm:text-base transition duration-150 ease-in-out"
                                placeholder="Enter Your Name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="username" className="sr-only">Enter Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black text-sm sm:text-base transition duration-150 ease-in-out"
                                placeholder="Enter Username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">Enter Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black text-sm sm:text-base transition duration-150 ease-in-out"
                                placeholder="Enter Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className='sr-only'>Enter password</label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black text-sm sm:text-base transition duration-150 ease-in-out pr-12"
                                placeholder="Enter password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-black transition duration-150 ease-in-out"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {showPassword ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-2.074m9.73-2.077A9.97 9.97 0 0118.823 12c-1.275 4.057-5.065 7-9.543 7a9.97 9.97 0 01-1.428-.109m10.091-10.091L3 3m11.192 11.192L21 21" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    )}
                                    {showPassword ? null : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out shadow-md"
                                disabled={loading}
                            >
                                {loading ? <ClipLoader color="#ffffff" size={20} /> : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    <div className="flex ml-4 gap-4 mt-6 text-center text-sm text-gray-600">
                        Already Have An Account? {' '}
                        <p className="font-medium text-indigo-600 hover:text-indigo-400 underline cursor-pointer" onClick={()=>navigate("/signin")}>
                            Sign In
                        </p>
                    </div>
                </div>

                <div className="hidden lg:flex w-1/2 bg-black text-white p-12 flex-col items-center justify-center text-center">
                    <h1 className="text-6xl font-extrabold font-serif italic tracking-widest text-white">VYBE</h1>
                    <p className="mt-4 text-xl font-light">Not Just A Platform, It's A VYBE</p>
                </div>
            </div>
        </div>
    );
};

export default Signup;