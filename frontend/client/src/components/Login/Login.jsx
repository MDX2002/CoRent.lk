import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.jsx';  // import context

const UserLogin = ({ onClose }) => {
  const [state, setState] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');

  const { login } = useContext(AuthContext);   // get login function from context

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    if (!backendURL) {
      alert('Backend URL is undefined. Check your .env file and restart the dev server.');
      return;
    }

    try {
      let res;

      if (state === 'login') {
        res = await axios.post(`${backendURL}/api/auth/login`, { email, password });

        // Email verification check
        if (res.data.user && res.data.user.is_verified === 0) {
          alert('Please verify your email before logging in.');
          return;
        }

        // Save login via context (updates localStorage and global state)
        login(res.data.token, res.data.user);

        alert(res.data.message);
        onClose();

      } else if (state === 'register') {
        res = await axios.post(`${backendURL}/api/auth/register`, {
          name,
          email,
          contact_number: contact,
          password,
        });

        alert(res.data.message); // e.g., "Check your email to verify"
        setState('login'); // switch to login after registration
      }

    } catch (err) {
      console.error('Axios error:', err);
      alert(err.response?.data?.message || 'Server error');
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
          <span className="text-indigo-500">User</span> {state === 'login' ? 'Login' : 'Sign Up'}
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
