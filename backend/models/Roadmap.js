// backend/models/Roadmap.js
const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  step: Number,
  topic: String,
  description: String,
  estimatedHours: Number,
  projectIdea: String,
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  }
});

const RoadmapSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Later, tie this to actual user auth
  goal: { type: String, required: true },   // e.g., "Master Data Structures and Algorithms"
  currentLevel: String,
  modules: [ModuleSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);