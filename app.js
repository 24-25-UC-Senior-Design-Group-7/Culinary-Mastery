// app.js
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import dbRouter from './routes/dbRoutes.js';
import youtubeRouter from './routes/ytRouter.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

var indexRouter = require('./api/routes/index');
var dbRouter = require('./api/routes/dbRoutes');
// Importing the ytvideo router
const youtubeRouter = require('./api/routes/ytRouter');

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use your routes
app.use('/', indexRouter);
app.use('/api/db', dbRouter);
app.use('/api/youtube', youtubeRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
