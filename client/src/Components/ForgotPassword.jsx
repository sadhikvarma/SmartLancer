import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        Axios.defaults.withCredentials = true;
        e.preventDefault();
        
        Axios.post("http://localhost:3000/auth/forgot-password", { email }).then(response => {
            if (response.data.status) {
                alert("Check your email for reset password link");
                navigate('/login');
            } else {
                alert("Failed to send reset password email. You may not be signed in.");
            }
        }).catch(err => {
            console.log(err);
            alert("An error has occurred");
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
            <form className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-teal-400 mb-6 text-center">Forgot Password</h2>
    
                <label htmlFor="email" className="block text-teal-400 font-semibold mb-2">Email:</label>
                <input
                    type="email"
                    autoComplete='off'
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />
    
                <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors">
                    Send
                </button>
            </form>
        </div>
    );
    
};

export default ForgotPassword;
