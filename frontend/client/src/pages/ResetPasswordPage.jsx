import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(`${backendURL}/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);

      // Optional: Redirect to login page after 2s
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-35 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-1">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
