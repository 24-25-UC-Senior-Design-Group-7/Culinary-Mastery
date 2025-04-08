import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
import { enrollUserInCourse, getCoursesForUser, updateCourseCompletion, insertUserAnalytics, getAnalyticsForUser } from '../db/operations.js';


// Enroll a user in a course
// post /api/usercourses/enroll
router.post('/enroll', async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      await enrollUserInCourse(userId, courseId);
      res.status(200).send('User enrolled successfully.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Get user courses
  // get /api/usercourses
  router.get('/user/:userId/courses', async (req, res) => {
    try {
      const courses = await getCoursesForUser(req.params.userId);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Update course completion
  // put /api/usercourses
  router.put('/course-completion', async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      await updateCourseCompletion(userId, courseId);
      res.status(200).send('Course completion updated successfully.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Insert user analytics data
  // post /api/usercourses
  router.post('/analytics', async (req, res) => {
    try {
      const { user_id, course_id, quiz_score } = req.body;
      await insertUserAnalytics(user_id, course_id, quiz_score);
      res.status(200).send('Analytics data inserted successfully.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Get analytics for a user
  // get /api/usercourses
  router.get('/analytics/:userId', async (req, res) => {
    try {
      const analytics = await getAnalyticsForUser(req.params.userId);
      res.status(200).json(analytics);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
export default router;