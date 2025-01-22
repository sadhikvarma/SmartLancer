import { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        Axios.defaults.withCredentials = true;
        e.preventDefault();
        Axios.post(`http://localhost:3000/auth/resetpassword/${token}`, { password })
            .then(response => {
                if (response.status) {
                    navigate('/login');
                } else {
                    alert("Failed to reset password. Please try again.");
                }
            })
            .catch(err => {
                console.log(err);
                alert("An error has occurred");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
            <form className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-teal-400 mb-6 text-center">Reset Password</h2>
                
                <label htmlFor="password" className="block text-teal-400 font-semibold mb-2">Password:</label>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />
                
                <button
                    type="submit"
                    className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors">
                
                    Reset
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
