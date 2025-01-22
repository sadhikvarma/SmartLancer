import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectForm from './projects/ProjectForm';
import ProjectList from './projects/ProjectList';
import ProjectCard from './projects/ProjectCard'; // Assuming you have a ProjectCard component

const DashBoard = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [activeView, setActiveView] = useState('recent'); // 'recent' or 'projects'

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        axios.defaults.withCredentials = true;
        
        axios.get('http://localhost:3000/auth/verify')
            .then(res => {
                if (res.data.status) {
                    fetchProjects();
                } else {
                    navigate('/login');
                }
            })
            .catch(err => {
                console.error("Error during API call:", err);
                navigate('/login');
            });
    }, [navigate]);

    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/projects/${id}`);
            setProjects(projects.filter(p => p._id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleEditProject = (project) => {
        setProjectToEdit(project);
        setShowProjectForm(true);
    };

    const handleCloseForm = () => {
        setShowProjectForm(false);
        setProjectToEdit(null);
        fetchProjects();
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-gray-800 to-gray-900">
            {/* Left Part - 25% */}
            <div className="w-1/4 bg-gray-900 p-10 flex flex-col justify-center shadow-lg border-r border-gray-800" style={{ borderRight: '4px solid white' }}>
                <h2 className="text-2xl font-bold text-teal-400 mb-6 text-center">Dashboard</h2>
                <div className="space-y-4">
                    <button 
                        onClick={() => setShowProjectForm(true)}
                        className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors"
                    >
                        New Project
                    </button>
                    <button 
                        onClick={() => setActiveView('projects')}
                        className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors"
                    >
                        My Projects
                    </button>
                    <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors">Do Payment</button>
                    <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors">Due Payment</button>
                    <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors">Payment History</button>
                    <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors">Friend's List</button>
                </div>
            </div>
  
            {/* Right Part - 75% */}
            <div className="w-3/4 bg-gray-900 p-6 relative">
                {/* Profile Section */}
                <div className="absolute top-4 right-4 flex items-center">
                    <div className="relative">
                        <img
                            src="/path/to/profile.jpg"
                            alt="Profile"
                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white bg-white p-1"
                            onClick={toggleDropdown}
                        />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg">
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Add Profile Photo</Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="mt-16 px-4">
                    {/* Button to open the Project Form */}
                    <button
                        onClick={() => setShowProjectForm(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6"
                    >
                        Create New Project
                    </button>

                    {activeView === 'recent' ? (
                        <div className="flex flex-col items-center">
                            <h2 className="text-3xl font-semibold text-white mb-6">Recently Opened Projects</h2>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.slice(0, 3).map(project => (
                                    <ProjectCard
                                        key={project._id}
                                        project={project}
                                        onEdit={handleEditProject}
                                        onDelete={handleDeleteProject}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <ProjectList
                            projects={projects}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                        />
                    )}

                    {/* Show the ProjectForm if showProjectForm is true */}
                    {showProjectForm && (
                        <ProjectForm
                            onClose={handleCloseForm}
                            projectToEdit={projectToEdit}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
