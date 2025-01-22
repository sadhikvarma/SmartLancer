import { useState } from 'react';
import { Link } from 'react-router-dom';
/* pending to be implemented*/
const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Example validation (you might want to enhance this)
    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col items-center justify-center text-center p-6 relative">
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

      <div className="w-full max-w-lg p-8 bg-opacity-80 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-white">Contact Us</h1>
        {success && <p className="text-green-500 mb-4">Your message has been sent successfully!</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-300">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-teal-400 text-white px-6 py-3 rounded-lg border border-teal-300 hover:bg-teal-500 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      <footer className="w-full text-center p-4 bg-gray-900 text-gray-500 mt-20">
        <p>&copy; 2024 Sadhik. All rights reserved.</p>
        <Link to="/" className="text-teal-400 hover:underline">Home</Link>
      </footer>
    </div>
  );
};

export default Contact;
