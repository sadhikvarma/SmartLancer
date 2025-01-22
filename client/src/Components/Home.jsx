import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Set axios defaults outside the component to avoid setting it on every render
axios.defaults.withCredentials = true;

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    axios.get('http://localhost:3000/auth/verify')
      .then(res => {
        if (res.data.status) {
          setIsAuthenticated(true);
          navigate('/dashboard'); // Redirect to dashboard if authenticated
        }
      })
      .catch(err => {
        console.error("Error during authentication check:", err);
        setIsAuthenticated(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          setIsAuthenticated(false);
          navigate('/login');
        }
      })
      .catch(err => {
        console.error("Error during logout:", err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Top Navigation */}
      <div className="absolute top-4 right-4 flex space-x-4 z-10">
        <Link to="/login">
          <button className="bg-teal-400 text-white px-4 py-2 rounded-lg border border-teal-300 hover:bg-teal-500 transition duration-300">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-teal-400 text-white px-4 py-2 rounded-lg border border-teal-300 hover:bg-teal-500 transition duration-300">
            Signup
          </button>
        </Link>
      </div>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <div className="w-full max-w-3xl p-8 bg-opacity-80 bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6">Welcome to SmartLancer</h1>
          <p className="text-gray-300 text-lg mb-6">
            Discover projects, collaborate with talented people, and showcase your work to attract freelance opportunities.
          </p>
          <p className="text-gray-300 text-lg mb-8">
            Simplify your freelancing journey and connect with professionals to grow your career.
          </p>
          <Link to="/signup">
            <button className="bg-teal-400 text-white px-6 py-3 rounded-lg border border-teal-300 hover:bg-teal-500 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center p-4 bg-gray-900 text-gray-500">
        <p>&copy; 2024 SmartLancer. All rights reserved.</p>
        <Link to="/contact" className="text-teal-400 hover:underline">
          Contact Us
        </Link>
      </footer>
    </div>
  );
};

export default Home;
