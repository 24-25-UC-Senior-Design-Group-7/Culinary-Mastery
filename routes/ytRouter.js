import dotenv from 'dotenv';
import { generateArticle } from '../services/articleGenerator.js';
dotenv.config();

import express from 'express';
const router = express.Router();
import YouTubeVideo from '../model/YouTubeVideo.js';
import { transcribeAudioStreaming } from '../services/transcriptionModule.js';

router.get('/video-display/:videoId', async (req, res) => {
  const { videoId } = req.params;
  const { socketId } = req.query;
  try {
    // Create a new YouTubeVideo instance and fetch details
    const video = new YouTubeVideo(videoId);
    await video.fetchDetails();

    // Define an output file path for the audio file
    const outputAudioPath = `./output/audio_${videoId}.mp3`;

    // Download and convert the video to an audio file
    await video.downloadAndConvert(outputAudioPath);

    // Access Socket.IO instance from app.locals
    const io = req.app.locals.io;

    // Stream the audio file to Watson for transcription in real time
    const transcript = await transcribeAudioStreaming(outputAudioPath, io, socketId);
    // Assign the transcript to the video instance
    video.transcript = transcript;

    // Generate a refined article using the transcript
    const refinedArticle = await generateArticle(transcript);
    console.log('Refined Article:', refinedArticle);
    video.article = refinedArticle;

    // Return the final transcript and video details as JSON
    res.json({
      title: video.title,
      description: video.description,
      channelName: video.channelName,
      transcript: video.transcript,
      article: video.article
    });
  } catch (error) {
    console.error('Failed to process video:', error);
    res.status(500).send('Failed to load video details.');
  }
});

export default router;
