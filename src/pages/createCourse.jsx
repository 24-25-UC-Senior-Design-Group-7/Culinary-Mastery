import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from '../axiosConfig'; // Ensure this path is correct based on your project structure

const CreateCourse = () => {
  const [socketId, setSocketId] = useState('Not connected');
  const [course, setCourse] = useState(null);
  const [articleVisible, setArticleVisible] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const socket = io();
    socket.on('connect', () => {
      setSocketId(socket.id);
      console.log('Connected. Socket ID:', socket.id);
    });
    socket.on('transcriptUpdate', (partialText) => {
      setUpdates((prevUpdates) => [...prevUpdates, partialText]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCreateCourse = async () => {
    const videoId = document.getElementById('videoIdInput').value.trim();
    const culinaryTechnique = document.getElementById('culinaryTechniqueInput').value.trim();

    setUpdates([]);
    setCourse(null);

    if (!videoId || !culinaryTechnique) {
      alert('Please enter both a video ID and a culinary technique.');
      return;
    }

    try {
      const payload = { videoId, culinaryTechnique };
      const url = `/api/courses/creation?socketId=${socketId}`;

      const response = await axios.post(url, payload);

      if (response.status === 201) {
        setCourse(response.data.course);
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course. Check console for details.');
    }
  };

  const toggleArticle = () => setArticleVisible(!articleVisible);
  const toggleQuiz = () => setQuizVisible(!quizVisible);

  const formatQuiz = (quiz) => {
    if (!quiz || !quiz.questions || !quiz.questions.length) {
      return 'No quiz available.';
    }
    return quiz.questions.map((q, index) => (
      <div key={index}>
        <p>Q{q.number}: {q.question}</p>
        {q.options.map((opt, i) => (
          <p key={i}> {String.fromCharCode(65 + i)}. {opt}</p>
        ))}
      </div>
    ));
  };

  return (
    <div className="create-course-page">
      <div className="content-wrapper">
        <h1>Create a Course</h1>
        <div className="form-group">
          <label htmlFor="videoIdInput">Enter Video ID</label>
          <input type="text" id="videoIdInput" placeholder="e.g., dQw4w9WgXcQ" />
        </div>

        <div className="form-group">
          <label htmlFor="culinaryTechniqueInput">Enter Culinary Technique</label>
          <input type="text" id="culinaryTechniqueInput" placeholder="e.g., Sear, Sauté, etc." />
        </div>

        <button onClick={handleCreateCourse}>Create Course</button>

        <div className="live-updates">
          <h2>Live Transcription Updates</h2>
          <div className="updates-box">
            {updates.map((update, index) => (
              <p key={index}>{update}</p>
            ))}
          </div>
        </div>

        {course && (
          <div className="course-details">
            <h2>Final Course Details</h2>
            <p><strong>Title:</strong> {course.title || 'No Title'}</p>
            <p><strong>Description:</strong> {course.description || 'No Description'}</p>
            <p><strong>Technique:</strong> {course.culinaryTechnique || 'N/A'}</p>
            <p><strong>Channel:</strong> {course.channelName || 'Unknown'}</p>

            <div className="course-video">
              <iframe
                className="video-frame"
                height="360"
                src={`https://www.youtube.com/embed/${course.videoId || ''}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <button className="btn-secondary" onClick={toggleArticle}>
              {articleVisible ? 'Hide Article' : 'View Article'}
            </button>
            {articleVisible && (
              <div className="article-section">
                <h3>Article</h3>
                <div className="article-content">
                  {course.article || 'No article available.'}
                </div>
              </div>
            )}

            <button className="btn-success" onClick={toggleQuiz}>
              {quizVisible ? 'Hide Quiz' : 'View Quiz'}
            </button>
            {quizVisible && (
              <div className="quiz-section">
                <h3>Quiz</h3>
                <div className="quiz-content">
                  {formatQuiz(course.quiz)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCourse;
