import React, { useState, useEffect } from 'react';

const UserLogin = ({ onClose }) => {
  const [state, setState] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl text-sm text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-8 py-12 w-80 sm:w-[352px]">


        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg font-bold"
          aria-label="Close login modal"
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

            {/* 
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-left">Upload Document</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("Selected file:", file);
                  // You can handle file upload logic here
                }}
                className="block w-full text-sm text-gray-900 dark:text-gray-100
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-indigo-500 file:text-white
                   hover:file:bg-indigo-600"
              />
            </div>
            */}
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



        
        {state === 'register' && (
          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium text-left">Upload Document</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={(e) => {
                const file = e.target.files[0];
                console.log("Selected file:", file);
              }}
              className="block w-full text-sm text-gray-900 dark:text-gray-100
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-indigo-500 file:text-white
                 hover:file:bg-indigo-600"
            />
          </div>
        )}


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
                <span
                  className="text-indigo-500 cursor-pointer hover:underline"
                  //onClick={() => setState('register')}
                >
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
      </div>
    </div>
  );
};

export default UserLogin;
