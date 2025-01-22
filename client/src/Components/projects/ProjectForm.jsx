import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectForm = ({ onClose, projectToEdit = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    techStack: '',
    implementation: '',
    links: ''
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title,
        techStack: projectToEdit.techStack.join(', '),
        implementation: projectToEdit.implementation,
        links: projectToEdit.links.map(link => `${link.title}:${link.url}`).join('\n')
      });
    }
  }, [projectToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedData = {
      title: formData.title,
      techStack: formData.techStack.split(',').map(tech => tech.trim()),
      implementation: formData.implementation,
      links: formData.links.split('\n').map(link => {
        const [title, url] = link.split(':');
        return { title: title.trim(), url: url.trim() };
      }).filter(link => link.title && link.url)
    };

    try {
      if (projectToEdit) {
        await axios.patch(`http://localhost:3000/api/projects/${projectToEdit._id}`, processedData);
      } else {
        await axios.post('http://localhost:3000/api/projects', processedData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl text-white">
        <h2 className="text-2xl font-bold mb-6 text-teal-400">
          {projectToEdit ? 'Edit Project' : 'Create New Project'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tech Stack (comma-separated)</label>
          <input
            type="text"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Implementation Details</label>
          <textarea
            value={formData.implementation}
            onChange={(e) => setFormData({ ...formData, implementation: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white h-32"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Links (one per line, format: title:url)
          </label>
          <textarea
            value={formData.links}
            onChange={(e) => setFormData({ ...formData, links: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white h-32"
            placeholder="GitHub:https://github.com/..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            {projectToEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
