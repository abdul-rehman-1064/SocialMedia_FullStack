import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/authSlice";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setLoading(true);
    const dataToSend = { username, password };
    console.log(dataToSend);

    try {
      const result = await axios.post(
        `${serverURL}/api/auth/signin`,
        dataToSend,
        { withCredentials: true }
      );
      console.log("SignIn Successful:", result.data);
      dispatch(setUserData(result.data))
      setLoading(false);
      setUsername("");
      setPassword("");

      // navigate('/signin');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      console.log("Signup FrontEnd Error:", errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 p-4 sm:p-8">
      <div className="relative flex w-full max-w-sm md:max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-4xl font-extrabold font-serif italic text-black">
              VYBE
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Not Just A Platform, It's A VYBE
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold font-serif italic text-gray-800 mb-8 text-center lg:text-left">
            Sign In to <span className="font-serif italic">VYBE</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="sr-only">
                Enter Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base transition duration-150 ease-in-out"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Enter password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base transition duration-150 ease-in-out pr-12"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-2.074m9.73-2.077A9.97 9.97 0 0118.823 12c-1.275 4.057-5.065 7-9.543 7a9.97 9.97 0 01-1.428-.109m10.091-10.091L3 3m11.192 11.192L21 21"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  )}
                  {showPassword ? null : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  )}
                </svg>
              </button>
            </div>

            {error && (
              <div className="text-sm text-center">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            <div className="text-sm text-center">
              <p
                className="font-medium  text-indigo-600 hover:text-indigo-500 cursor-pointer underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out shadow-md"
                disabled={loading}
              >
                {loading ? <ClipLoader color="#ffffff" size={20} /> : "Sign In"}
              </button>
            </div>
          </form>

          <div className=" flex mt-6 gap-4 ml-4 text-center text-sm text-gray-600">
            Want To Create A New Account?{" "}
            <p
              className="font-medium text-indigo-600 hover:text-indigo-500 underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </p>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 bg-black text-white p-12 flex-col rounded-2xl items-center justify-center text-center">
          <h1 className="text-6xl font-extrabold font-sans tracking-widest">
            VYBE
          </h1>
          <p className="mt-4 text-xl font-light">
            Not Just A Platform, It's A VYBE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
