import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const CreateCourse = () => {
  const [socketId, setSocketId] = useState('Not connected');
  const [course, setCourse] = useState(null);
  const [articleVisible, setArticleVisible] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io();

    // Set the socket ID when connected
    socket.on('connect', () => {
      setSocketId(socket.id);
      console.log('Connected. Socket ID:', socket.id);
    });

    // Listen for partial transcription updates
    socket.on('transcriptUpdate', (partialText) => {
      setUpdates((prevUpdates) => [...prevUpdates, partialText]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle form submission
  const handleCreateCourse = async () => {
    const videoId = document.getElementById('videoIdInput').value.trim();
    const culinaryTechnique = document.getElementById('culinaryTechniqueInput').value.trim();

    // Clear previous data
    setUpdates([]);
    setCourse(null);

    // Basic validation
    if (!videoId) {
      alert('Please enter a video ID');
      return;
    }
    if (!culinaryTechnique) {
      alert('Please enter a culinary technique');
      return;
    }

    try {
      // Build the body payload
      const payload = { videoId, culinaryTechnique };

      // Build the URL with the socket ID as query param
      const url = `/api/courses/creation?socketId=${socketId}`;

      // Make a POST request with JSON body
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setCourse(data.course); // set the final course object
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course. Check console for details.');
    }
  };

  const toggleArticle = () => setArticleVisible(!articleVisible);
  const toggleQuiz = () => setQuizVisible(!quizVisible);

  const formatQuiz = (quiz) => {
    if (!quiz || !quiz.questions || !quiz.questions.length) {
      return "No quiz available.";
    }
    let output = '';
    quiz.questions.forEach((q) => {
      output += `Q${q.number}: ${q.question}\n\n`;
      q.options.forEach((opt, i) => {
        output += `   ${String.fromCharCode(65 + i)}. ${opt}\n`;
      });
      output += "\n";
    });
    return output;
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 bg-white p-4 rounded shadow-sm">
          <h1 className="mb-4">Create a Course</h1>

          {/* Display Socket ID */}
          <div className="mb-4">
            <p>Your Socket ID: <span className="fw-bold text-primary">{socketId}</span></p>
          </div>

          {/* Form for videoId and culinaryTechnique */}
          <div className="mb-3">
            <label htmlFor="videoIdInput" className="form-label">Enter Video ID</label>
            <input type="text" id="videoIdInput" className="form-control" placeholder="e.g., dQw4w9WgXcQ" />
          </div>

          <div className="mb-3">
            <label htmlFor="culinaryTechniqueInput" className="form-label">Enter Culinary Technique</label>
            <input type="text" id="culinaryTechniqueInput" className="form-control" placeholder="e.g., Sear, Sauté, etc." />
          </div>

          <button id="createCourseBtn" className="btn btn-primary" onClick={handleCreateCourse}>
            Create Course
          </button>

          {/* Transcription Updates */}
          <div className="mt-4">
            <h2 className="h5 mb-2">Live Transcription Updates</h2>
            <div id="updates" className="p-3 border rounded" style={{ minHeight: '50px' }}>
              {updates.map((update, index) => (
                <p key={index}>{update}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Display */}
      {course && (
        <div className="container d-none mt-5" id="courseDisplay">
          <div className="row justify-content-center">
            <div className="col-md-10 bg-white p-4 rounded shadow-sm">
              <a href="/course.html" className="btn btn-primary">Start Learning</a>
              <h2 className="mb-4">Final Course Details</h2>

              {/* Basic Info */}
              <p>
                <strong>Title:</strong> <span>{course.title || 'No Title'}</span>
              </p>
              <p>
                <strong>Description:</strong> <span>{course.description || 'No Description'}</span>
              </p>
              <p>
                <strong>Technique:</strong> <span>{course.culinaryTechnique || 'N/A'}</span>
              </p>
              <p>
                <strong>Channel:</strong> <span>{course.channelName || 'Unknown'}</span>
              </p>

              {/* Video Embed */}
              <div className="my-3">
                <iframe
                  id="courseVideo"
                  className="w-100 rounded"
                  height="360"
                  src={`https://www.youtube.com/embed/${course.videoId || ''}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Show/Hide Article */}
              <div className="mb-3">
                <button id="toggleArticleBtn" className="btn btn-secondary" onClick={toggleArticle}>
                  {articleVisible ? 'Hide Article' : 'View Article'}
                </button>
                {articleVisible && (
                  <div id="articleSection" className="mt-3 p-3 border rounded">
                    <h3 className="h5 mb-2">Article</h3>
                    <div id="articleContent" style={{ whiteSpace: 'pre-wrap' }}>
                      {course.article || 'No article available.'}
                    </div>
                  </div>
                )}
              </div>

              {/* Show/Hide Quiz */}
              <div>
                <button id="toggleQuizBtn" className="btn btn-success" onClick={toggleQuiz}>
                  {quizVisible ? 'Hide Quiz' : 'View Quiz'}
                </button>
                {quizVisible && (
                  <div id="quizSection" className="mt-3 p-3 border rounded">
                    <h3 className="h5 mb-2">Quiz</h3>
                    <div id="quizContent" className="text-muted" style={{ whiteSpace: 'pre-wrap' }}>
                      {formatQuiz(course.quiz || {})}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
