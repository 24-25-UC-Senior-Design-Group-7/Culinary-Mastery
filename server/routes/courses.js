// routes/courses.js
import express from 'express';
import YouTubeVideo from '../model/YouTubeVideo.js';
import { transcribeAudioStreaming } from '../services/transcriptionModule.js';
import { generateArticle, generateQuizFromArticle, translateArticle } from '../services/geminiService.js';
import { insertCourse, getAllCourses, getCourseById, getCoursesByCulinaryTechnique } from '../db/operations.js';


const router = express.Router();

/**
 * Create a new course using a video ID.
 * POST /api/courses/creation
 *
 * Expected JSON payload:
 * {
 *   "videoId": "VIDEO_ID",
 *   "CulinaryTechnique": "CulinaryTechnique"
 * }
 *
 * Note: The socketId must be provided as a query parameter (e.g., ?socketId=YOUR_SOCKET_ID)
 */
router.post('/creation', async (req, res) => {

  // Destructuring videoId and CulinaryTechnique from the request body
  const { videoId, culinaryTechnique } = req.body;
  const { socketId } = req.query;
  
  
  if (!videoId) {
    return res.status(400).json({ error: "videoId is required" });
  }

  if (!culinaryTechnique) {
    return res.status(400).json({ error: "CulinaryTechnique is required" });
  }
  
  try {
    // Instantiating the YouTubeVideo class using the videoId.
    const video = new YouTubeVideo(videoId);

    // Fetching video details from the YouTube API.
    await video.fetchDetails();

    // Defining an output file path for the audio file.
    const outputAudioPath = `./output/audio_${videoId}.mp3`;

    // Downloading and converting the video to an audio file.
    await video.downloadAndConvert(outputAudioPath);

    // Accessing Socket.IO instance from app.locals.
    const io = req.app.locals.io;

    // Streaming the audio file to Watson for transcription in real time,
    // emitting live updates via the provided socketId.
    const transcript = await transcribeAudioStreaming(outputAudioPath, io, socketId);
    video.transcript = transcript;

    // Generating a refined article from the transcript using the Gemini API.
    const article = await generateArticle(transcript, culinaryTechnique);

    // Assigning the refined article to the video instance.
    video.article = article;

    // Generating quiz data from the refined article.
    const quiz = await generateQuizFromArticle(article);
    console.log("Generated quiz:", quiz);

    // Building the final course object.
    const course = {
      title: video.title,
      description: video.description,
      videoId: video.videoId,
      transcript: video.transcript,
      article: video.article,
      quiz: quiz,
      culinaryTechnique: culinaryTechnique,
      channelName: video.channelName,
    };

    // Inserting the course into the database.
    await insertCourse(course);

    // Sending a response back to the client.
    console.log("Course created successfully.");

    res.status(201).json({
      message: "Course created successfully.",
      course: course
    });
  } catch (error) {
    console.error("Failed to create course:", error);
    res.status(500).json({
      error: "Failed to create course",
      details: error.message
    });
  }
});




/**
 * List all courses
 * GET /api/courses/list
 */
router.get('/list_of_courses', async (req, res) => {
  
  try{
    
  
      const courses = await getAllCourses();
      res.json({
        message: "List of courses",
        courses: courses
      });
    
  } catch (error) {
    console.error("Failed to list courses:", error);
    res.status(500).json({
      error: "Failed to list courses",
      details: error.message
    });
  }
});

/**
 * Translate an article.
 * POST /api/courses/translate
 *
 * Expected JSON payload:
 * {
 *   "article": "The original article text...",
 *   "language": "Spanish"
 * }
 */
router.post('/translate', async (req, res) => {
  const { article, language } = req.body;

  // Basic validation
  if (!article) {
    return res.status(400).json({ error: "Article text is required." });
  }
  if (!language) {
    return res.status(400).json({ error: "Target language is required." });
  }

  try {
    const translatedText = await translateArticle(article, language);
    return res.json({ translatedText });
  } catch (error) {
    console.error("Failed to translate article:", error);
    return res.status(500).json({
      error: "Failed to translate article",
      details: error.message
    });
  }
});



/**
 * Retrieve a course by ID
 * GET /api/courses/:id
 */
router.get('/:id', async (req, res) => {
  // TODO: Replace with logic to fetch course by its ID.
  try{
    const course = await getCourseById(req.params.id);
    res.json({
      message: "Course retrieved successfully.",
      courseId: req.params.id,
      course: course
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve course" });
    console.error("Error retrieving course by ID:", error);
  }
 
});

/**
 * Retrieve courses by culinary technique
 * GET /api/courses/culinaryTechnique/:culinaryTechnique
 */
router.get('/culinaryTechnique/:culinaryTechnique', async (req, res) => {

  try{
    const course =await getCoursesByCulinaryTechnique(req.params.culinaryTechnique);
    if(!course){
      return res.status(404).json({message: "No course found"});
    }
    res.json({
      message: "Courses retrieved successfully.",
      courses: course
    })
  }
  catch(error){
    res.status(500).json({ error: "Failed to retrieve course" });
    console.error("Error retrieving course by ID:", error);
  }
});

export default router;
