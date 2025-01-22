import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
const Chatbot = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('Loading...');

    try {
      const res = await axios.post(`http://localhost:5000/chatbot/ask/`, { topic, difficulty });
      setResponse(res.data.suggestion);
    } catch (error) {
        console.log(error);
      setResponse('Error fetching project idea. Try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Chatbot for Project Ideas</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Get Project Idea
        </button>
      </form>
      <div className="mt-4">
        <h2 className="font-semibold">Response:</h2>
        <p className="text-gray-700 mt-2">{response}</p>
      </div>
    </div>
  );
};

export default Chatbot;
