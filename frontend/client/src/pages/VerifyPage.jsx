import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VerifyPage() {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify/${token}`);
        setMessage(res.data); // "Email verified successfully!"

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data || 'Verification failed or token expired.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="text-gray-700">{message}</p>
        {message === 'Email verified successfully!' && (
          <p className="text-gray-500 mt-2">Redirecting to login page...</p>
        )}
      </div>
    </div>
  );
}
