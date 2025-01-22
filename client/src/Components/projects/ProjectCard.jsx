import React from 'react';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      
      <div className="mb-3">
        <h4 className="text-sm font-medium text-teal-400">Tech Stack:</h4>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-700 px-2 py-1 rounded text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <h4 className="text-sm font-medium text-teal-400">Implementation:</h4>
        <p className="text-sm mt-1 text-gray-300">{project.implementation}</p>
      </div>

      {project.links.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-teal-400">Links:</h4>
          <div className="mt-1 space-y-1">
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline block text-sm"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(project)}
          className="bg-teal-500 text-white px-3 py-1 rounded text-sm hover:bg-teal-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project._id)}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;