require('dotenv').config();
require('dotenv').config();

const express = require('express');
const router = express.Router();
const YouTubeVideo = require('../../model/YouTubeVideo');
// Enpoint will be: /video/:<pass video id>
router.get('/video/:videoId', async (req, res) => {
  const { videoId } = req.params; // getting the video add in the req parameter
  try {
    const video = new YouTubeVideo(videoId); // creating a new object video Youtube class and passing the videoId in the contructor
    await video.fetchDetails(); // calling the fetchDetail method from the YoutubeVideo class
    res.json({
      title: video.title,
      description: video.description,
      channelName: video.channelName,
      article: video.article
    }); // json response with all the video details
  } catch (error) {
    console.error('Error fetching video details:', error.message);
    res.status(500).json({ message: 'Failed to retrieve video details' });
  }
});


// Route to display a video and its information
router.get('/video-display/:videoId', async (req, res) => {
    const { videoId } = req.params;
    try {
        const video = new YouTubeVideo(videoId);
        await video.fetchDetails();
        
        
        const htmlContent = `
            <html>
            <head>
                <title>${video.title}</title>
            </head>
            <body>
                <h1>${video.title}</h1>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>${video.description}</p>
                <p>Channel: ${video.channelName}</p>
            </body>
            </html>
        `;

        res.send(htmlContent);
    } catch (error) {
        console.error('Failed to fetch video details:', error);
        res.status(500).send('Failed to load video details.');
    }
});

module.exports = router;