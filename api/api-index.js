import express from 'express';
import openapi from './openapi.js';
import dbRoutesPromise from './routes/dbRoutes.js';

const port = process.env.PORT || 3000;

const app = express();

const setupRoutes = async () => {
  const dbRoutes = await dbRoutesPromise;
  app.use('/api', dbRoutes);
};

// Connect App routes
app.use('/api-docs', openapi);
setupRoutes();

app.use('*', (_, res) => {
  res.redirect('/api-docs');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});