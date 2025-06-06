import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import youtubeRouter from './routes/ytRouter.js';
import routercourses from './routes/courses.js';
import authRouther from './routes/authRoutes.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

import cors from 'cors';
import helmet from 'helmet';
import { authenticateToken } from './middleware/authMiddleware.js';
import userCourseRouter from './routes/userCourseInfo.js';

// Database
import { createCoursesTable, createUserTable, CreateUserCoursesTable, createAnalysisTable } from './db/operations.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add a health-check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Function to initialize the app (readiness signal)
async function init() {
  try {
    console.log("Checking Course table if tables exist...");
    await createCoursesTable();
    console.log("Course Table check/creation done.");
  } catch (error) {
    console.error("Error ensuring Course table exists:", error);
  }

  try {
    console.log("Checking User table if tables exist...");
    await createUserTable();
    console.log("User Table check/creation done.");
  } catch (error) {
    console.error("Error ensuring User table exists:", error);
  }

  try {
    console.log("Checking UserCourses table if tables exist...");
    await CreateUserCoursesTable();
    console.log("UserCourses Table check/creation done.");
  } catch (error) {
    console.error("Error ensuring UserCourses table exists:", error);
  }

  try {
    console.log("Checking Analysis table if tables exist...");
    await createAnalysisTable();
    console.log("Analysis Table check/creation done.");
  } catch (error) {
    console.error("Error ensuring Analysis table exists:", error);
  }

  console.log("All initialization tasks completed.");
}

// Export the readiness signal as a promise
export const readinessSignal = init();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

// routes and middleware
app.use(cors({
  credentials: true, // Allows cookies to be sent and received
  origin: true // Reflects the request origin, or true if the origin is not specified
}));
app.use('/', indexRouter);
// auth routes endpoint /auth/login, /auth/register and /auth/verify-otp
app.use('/auth', authRouther);
app.use('/users/', authenticateToken, usersRouter);
// test routes
app.use('/api/youtube', youtubeRouter);
// course routes
app.use('/api/courses', routercourses);
// user course routes
app.use('/api/usercourses', authenticateToken, userCourseRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((req, res, next) => {
  console.log("Received cookies:", req.cookies);
  next();
});

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    // If headers are already sent, delegate to the default Express error handler
    return next(err);
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;