import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step,setStep]=useState(3);
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Yahan aap apna backend API call karenge
    // For now, hum ek simulated delay dikhayenge
    console.log('Sending OTP to:', email);

    try {
      // Example: Replace with your actual API call
      // const response = await axios.post(`${serverURL}/auth/forgot-password`, { email });
      // setMessage(response.data.message || 'OTP sent successfully!');
      
      // Simulated delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      setMessage('OTP sent successfully to your email!');
      setEmail(''); // Clear email field on success

    } catch (error) {
      // Example error handling
      // const errorMessage = error.response?.data?.message || 'Failed to send OTP.';
      setMessage('Failed to send OTP. Please try again.');
      console.error('Forgot Password Error:', error);
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
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
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
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
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
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="sr-only">Enter Email</label>
            <input
              id="password"
              name="password"
              type="text"
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
              type="text"
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