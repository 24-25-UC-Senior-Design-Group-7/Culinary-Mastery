import dotenv from 'dotenv';
import { generateArticle } from '../services/geminiService.js';
import express from 'express';
import YouTubeVideo from '../model/YouTubeVideo.js';
import { transcribeAudioStreaming } from '../services/transcriptionModule.js';
dotenv.config();

const router = express.Router();


router.get('/video-display/:videoId/:culinaryTechnique', async (req, res) => {
  const { videoId, culinaryTechnique } = req.params;
  const { socketId } = req.query;
  try {
    // Create a new YouTubeVideo instance and fetch details
    const video = new YouTubeVideo(videoId);
    await video.fetchDetails();

    // Defining an output file path for the audio file
    const outputAudioPath = `./output/audio_${videoId}.mp3`;

    // Downloading and converting the video to an audio file
    await video.downloadAndConvert(outputAudioPath);

    // Access Socket.IO instance from app.locals
    const io = req.app.locals.io;
    

    // Streaming the audio file to Watson for transcription in real time
    const transcript = await transcribeAudioStreaming(outputAudioPath, io, socketId);
    // Assigning the transcript to the video instance
    video.transcript = transcript;

    // Generating a refined article using the transcript
    const refinedArticle = await generateArticle(transcript, culinaryTechnique);
    console.log('Refined Article:', refinedArticle);
    video.article = refinedArticle;

    // Generating quiz data from the refined article
    const quiz = await generateQuizFromArticle(refinedArticle);

    // Returning the final transcript and video details as JSON
    res.json({
      title: video.title,
      description: video.description,
      channelName: video.channelName,
      transcript: video.transcript,
      article: video.article,
      quiz: quiz,
      culinaryTechnique: culinaryTechnique
    });
  } catch (error) {
    console.error('Failed to process video:', error);
    res.status(500).send('Failed to load video details.');
  }
});

export default router;
