// backend/routes/resources.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/youtube', async (req, res) => {
  const { topic } = req.body;

  try {
    // We search YouTube for the specific topic + "tutorial" to get educational content
    const searchQuery = `${topic} programming tutorial`;
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(searchQuery)}&type=video&key=${process.env.YOUTUBE_API_KEY}`;

    const response = await axios.get(youtubeUrl);
    
    // Format the data to send back to React
    const videos = response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channel: item.snippet.channelTitle
    }));

    res.json({ success: true, videos });

  } catch (error) {
    console.error("YouTube API Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch resources" });
  }
});

module.exports = router;