import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLogin = ({ onClose, onLoginSuccess }) => {
  const [state, setState] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  {/*
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (state === 'login') {
        // Login POST request
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
          email,
          password,
        });

        // Save JWT token to localStorage
        localStorage.setItem('token', res.data.token);

        onLoginSuccess(); // Notify Navbar to update
        alert(res.data.message);
        onClose(); // Close modal

      } else if (state === 'register') {
        // Register POST request
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
          name,
          email,
          contact_number: contact,
          password,
        });

        console.log('Registration response:', res.data);
        alert(res.data.message); // e.g., "Check your email to verify."
        setState('login'); // Switch to login after registration
      }
    } catch (err) {
      console.error('Error response:', err.response);
      alert(err.response?.data?.message || 'Server error');
    }
  };
  
  */}



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted');
    console.log('Current state:', state);
    console.log('Form values:', { name, email, password, contact });

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    console.log('Backend URL:', backendURL);

    if (!backendURL) {
      alert('Backend URL is undefined. Check your .env file and restart the dev server.');
      return;
    }

    try {
      let res;
      if (state === 'login') {
        console.log('Sending login request...');
        res = await axios.post(`${backendURL}/api/auth/login`, { email, password });

        
        // --- EMAIL VERIFICATION CHECK ---
        if (res.data.user && res.data.user.is_verified === 0) {
          alert('Please verify your email before logging in.');
          return; // Stop login
        }

        // Store JWT token
        localStorage.setItem('token', res.data.token);
        onLoginSuccess(); // Update Navbar / auth state



      } else if (state === 'register') {
        console.log('Sending register request...');
        res = await axios.post(`${backendURL}/api/auth/register`, {
          name,
          email,
          contact_number: contact,
          password,
        });
      }

      console.log('Response from server:', res);
      if (state === 'login') {
        localStorage.setItem('token', res.data.token);
        onLoginSuccess();
      }

      alert(res.data.message);
      if (state === 'login') onClose();
      if (state === 'register') setState('login');
    } catch (err) {
      console.error('Axios error:', err);

      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        console.error('Error response headers:', err.response.headers);
        alert(err.response.data.message || 'Server returned an error');
      } else if (err.request) {
        console.error('No response received. Request:', err.request);
        alert('No response from server. Check backend is running.');
      } else {
        console.error('Error setting up request:', err.message);
        alert('Request setup error: ' + err.message);
      }
    }
  };





  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl text-sm text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-8 py-12 w-80 sm:w-[352px]"
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg font-bold"
        >
          X
        </button>

        <p className="text-2xl font-medium text-center mb-4">
          <span className="text-indigo-500">User</span>{' '}
          {state === 'login' ? 'Login' : 'Sign Up'}
        </p>

        {state === 'register' && (
          <>
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-left">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="type here"
                className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded w-full p-2 outline-indigo-500"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-left">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="07XXXXXXXX"
                pattern="07[0-9]{8}"
                maxLength="10"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded w-full p-2 outline-indigo-500"
                required
              />
              <small className="text-gray-500">
                Must start with 07 and contain 10 digits.
              </small>
            </div>
          </>
        )}

        <div className="mt-4">
          <label className="block mb-1 text-sm font-medium text-left">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="type here"
            className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded w-full p-2 outline-indigo-500"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-sm font-medium text-left">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="type here"
            className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded w-full p-2 outline-indigo-500"
            required
          />
        </div>

        <p className="mt-4 text-sm">
          {state === 'register' ? (
            <>
              Already have an account?{' '}
              <span
                className="text-indigo-500 cursor-pointer hover:underline"
                onClick={() => setState('login')}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              <div>
                Create an account?{' '}
                <span
                  className="text-indigo-500 cursor-pointer hover:underline"
                  onClick={() => setState('register')}
                >
                  Click here
                </span>
              </div>

              <div className="mt-1">
                Forgot password?{' '}
                <span className="text-indigo-500 cursor-pointer hover:underline">
                  Click here
                </span>
              </div>
            </>
          )}
        </p>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md mt-6"
        >
          {state === 'register' ? 'Create Account' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
