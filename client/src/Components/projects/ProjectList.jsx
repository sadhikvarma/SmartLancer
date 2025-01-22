import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold text-white mb-6">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {projects.length === 0 && (
          <p className="text-gray-400 text-center col-span-3 py-8">
            No projects yet. Create your first project!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;