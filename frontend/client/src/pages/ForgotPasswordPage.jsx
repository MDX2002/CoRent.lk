import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(`${backendURL}/api/auth/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Error sending reset link');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-35 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
