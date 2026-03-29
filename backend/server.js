// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import auth routes
const resourceRoutes = require('./routes/resources'); // Import resource routes

// Import the route we planned earlier
const generateRoadmapRoute = require('./routes/generateRoadmap'); 

const app = express();
app.use(cors({
  origin: '*', // Production mein isko specifically apna Vercel link bhi de sakte ho
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/roadmap', generateRoadmapRoute);
app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/resources', resourceRoutes); // Use resource routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
