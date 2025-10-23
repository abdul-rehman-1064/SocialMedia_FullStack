import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { serverURL } from '../App';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step,setStep]=useState(1);
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState('');

  const navigate = useNavigate()

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    console.log('Sending OTP to:', email);

    try {
      const response = await axios.post(`${serverURL}/api/auth/sendOtp`,{email},{withCredentials:true});
      console.log("Email sent :" , response.data);
      
      setMessage('OTP sent successfully to your email!');
      setLoading(false);
      setStep(2);

    } catch (error) {
      setMessage('Failed to send OTP. Please try again.');
      console.error('Forgot Password Error:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(OTP);
    

    console.log('OTP send at :', email);

    try {
      const trimmedOTP = OTP.trim();
      console.log("front otp ",trimmedOTP);
      console.log("front otp email ",email);
      
      const response = await axios.post(`${serverURL}/api/auth/verifyOtp`,{email,otp:trimmedOTP},{withCredentials:true});
      console.log("Email sent :" , response.data);
      
      setMessage('OTP verify successfully !');
      setOTP('');
      setLoading(false);
      setStep(3);

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to Verify OTP. Please try again.';
    
    // Yahan console.log karein taaki aap exact message dekh sakein
    console.error('VERIFY OTP FAILED. Backend Message:', errorMessage); 
    
    setMessage(errorMessage); // Display the specific reason to the user
    console.error('Verify OTP Error:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit3 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPassword('');
    setConfirmPassword('');

    if(password !== confirmPassword){
      setMessage('Password and Confirm Password do not match.');
      setLoading(false);
      return;
    }

    console.log('New Password :', password);

    try {
      const response = await axios.post(`${serverURL}/api/auth/resetPassword`,{email,newPassword:password},{withCredentials:true});
      console.log("New Password Set :" , response.data);
      
      setMessage('Password Reset  successfully !');
      setPassword('');
      setConfirmPassword('');
      setLoading(false);
      navigate("/signin")
      setStep(1);

    } catch (error) {
      setMessage('Failed to Verify OTP. Please try again.');
      console.error('Verify OTP Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 p-4 sm:p-8">
      {step === 1 && <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 text-center">
        
        <h2 className="text-3xl font-semibold font-serif text-gray-800 mb-8">
          Forgot Password
        </h2>
        
        <form onSubmit={handleSubmit1} className="space-y-6">
          
          {/* Email Input Field */}
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
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // Disable input when loading
            />
          </div>

          {/* Message display */}
          {message && (
            <p className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          {/* Send OTP Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out shadow-md"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <ClipLoader size={20} color='white'/>
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
        </form>

      </div>}


      {step === 2 &&  <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 text-center">
        
        <h2 className="text-3xl font-semibold font-serif text-gray-800 mb-8">
          Forgot Password
        </h2>
        
        <form onSubmit={handleSubmit2} className="space-y-6">
          
          {/* Email Input Field */}
          <div>
            <label htmlFor="OPT" className="sr-only">Enter Email</label>
            <input
              id="otp"
              name="otp"
              type="number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black text-sm sm:text-base transition duration-150 ease-in-out"
              placeholder="Enter OTP"
              
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              disabled={loading} // Disable input when loading
            />
          </div>

          {/* Message display */}
          {message && (
            <p className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          {/* Send OTP Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out shadow-md"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <ClipLoader size={20} color='white'/>
              ) : (
                'Submit '
              )}
            </button>
          </div>
        </form>

      </div>}


      {step === 3 && <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 text-center">
        
        <h2 className="text-3xl font-semibold font-serif text-gray-800 mb-8">
          Forgot Password
        </h2>
        
        <form onSubmit={handleSubmit3} className="space-y-6">
          
          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="sr-only">Enter Email</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black text-sm sm:text-base transition duration-150 ease-in-out"
              placeholder="Enter New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading} // Disable input when loading
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Enter Email</label>
            <input
              id="conpassword"
              name="conpassword"
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black text-sm sm:text-base transition duration-150 ease-in-out"
              placeholder="Confirm New password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading} // Disable input when loading
            />
          </div>

          {/* Message display */}
          {message && (
            <p className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          {/* Send OTP Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out shadow-md"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <ClipLoader size={20} color='white'/>
              ) : (
                'Reset Password'
              )}
            </button>
          </div>
        </form>

      </div>}

    </div>
  );
};

export default ForgotPassword;