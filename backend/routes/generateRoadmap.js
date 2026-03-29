const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const Roadmap = require('../models/Roadmap');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 1. ROUTE: Generate and Save Roadmap
router.post('/create-path', async (req, res) => {
  // Extract userId along with the form data
  const { goal, currentSkillLevel, timeCommitment, userId } = req.body;

  const systemPrompt = `
    You are an expert career and education strategist. 
    The user wants to learn: ${goal}.
    Their current level is: ${currentSkillLevel}.
    They have ${timeCommitment} hours per week.
    
    Output a structured learning roadmap in STRICT JSON format. 
    It must follow this exact structure:
    {
      "title": "Roadmap Title",
      "modules": [
        {
          "step": 1,
          "topic": "Topic Name",
          "description": "Brief description of what to learn",
          "estimatedHours": 5,
          "projectIdea": "A small task to verify knowledge"
        }
      ]
    }
    Do not include any other text outside of the JSON.
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }],
      model: 'llama-3.3-70b-versatile', // Using the active model
      temperature: 0.3, 
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0].message.content);

    // Save to MongoDB using the REAL logged-in user's ID
    const newRoadmap = new Roadmap({
      userId: userId, 
      goal: goal,
      currentLevel: currentSkillLevel,
      modules: aiResponse.modules,
      title: aiResponse.title
    });

    const savedRoadmap = await newRoadmap.save();
    res.json({ success: true, roadmap: savedRoadmap });

  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ success: false, message: "Failed to generate or save roadmap" });
  }
});

// 2. ROUTE: Update Module Progress (Mark as Complete)
router.put('/update-module', async (req, res) => {
  const { roadmapId, moduleId, newStatus } = req.body;

  try {
    const updatedRoadmap = await Roadmap.findOneAndUpdate(
      { _id: roadmapId, "modules._id": moduleId },
      { $set: { "modules.$.status": newStatus } },
      { new: true } 
    );

    res.json({ success: true, roadmap: updatedRoadmap });
  } catch (error) {
    console.error("Update Progress Error:", error);
    res.status(500).json({ success: false, message: "Failed to update progress" });
  }
});

// 3. ROUTE: Fetch all roadmaps for the Dashboard
router.get('/user/:userId', async (req, res) => {
  try {
    // Find roadmaps that match the user ID and sort them by newest first
    const roadmaps = await Roadmap.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, roadmaps });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch roadmaps" });
  }
});

module.exports = router;