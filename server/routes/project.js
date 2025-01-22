import express from 'express'
const router = express.Router();
import {Project} from '../models/Project.js';
import {auth} from '../Middleware/auth.js';


// Create a new project
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      userId: req.user.username
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.log("post in project")
    res.status(400).json({ error: error.message });
  }
});

// Get all projects for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a project
router.patch('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export {router as projectRoutes}