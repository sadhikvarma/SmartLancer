import { useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !email || !password) {
            setError('All fields are required.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (password.length < 8) {
            setError('Password should be at least 8 characters long.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        Axios.post("http://localhost:3000/auth/signup", { username, email, password })
            .then(response => {
                setLoading(false);
                if (response.data.status) {
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    navigate('/login');
                } else {
                    setError(response.data.message || 'Signup failed. Please try again.');
                }
            })
            .catch(err => {
                setLoading(false);
                console.error(err);
                setError('An error occurred. Please try again later.');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
            <form className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-teal-400 mb-6 text-center">Sign Up</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <label htmlFor="username" className="block text-teal-400 font-semibold mb-2">Username:</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                />

                <label htmlFor="email" className="block text-teal-400 font-semibold mb-2">Email:</label>
                <input
                    type="email"
                    autoComplete="off"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                />

                <label htmlFor="password" className="block text-teal-400 font-semibold mb-2">Password:</label>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors"
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                <p className="mt-4 text-center text-gray-400">
                    Have an account? <Link to="/login" className="text-teal-400 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
