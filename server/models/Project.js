import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  techStack: [{
    type: String,
    trim: true
  }],
  implementation: {
    type: String,
    required: true
  },
  links: [{
    title: String,
    url: String
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const ProjectModel = mongoose.model('Project', projectSchema);

export {ProjectModel as Project};