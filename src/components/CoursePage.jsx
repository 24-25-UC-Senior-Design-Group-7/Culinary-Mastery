import React, { useState, useEffect } from 'react';

// Child Components
import VideoSection from '../components/VideoSection';
import ArticleSection from '../components/ArticleSection';
import QuizSection from '../components/QuizSection';

const CoursePage = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState('video');

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses/9E29C27D-B513-4172-80AC-05111ADBED31");
        if (!response.ok) {
          throw new Error('Failed to load course data');
        }
        const jsonData = await response.json();
        setCourseData(jsonData.course);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError('An error occurred while fetching the course data.');
        setLoading(false);
      }
    };

    loadCourse();
  }, []);

  const showSection = (section) => setCurrentSection(section);

  if (loading) {
    return <div>Loading course data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-fluid">
      {courseData && (
        <>
          <div className="course-header">
            <h1>{courseData.title}</h1>
            <p>{courseData.description}</p>
          </div>

          <div className="nav nav-tabs" role="tablist">
            <button
              onClick={() => showSection('video')}
              className={`nav-link ${currentSection === 'video' ? 'active' : ''}`}
            >
              Video
            </button>
            <button
              onClick={() => showSection('article')}
              className={`nav-link ${currentSection === 'article' ? 'active' : ''}`}
            >
              Article
            </button>
            <button
              onClick={() => showSection('quiz')}
              className={`nav-link ${currentSection === 'quiz' ? 'active' : ''}`}
            >
              Quiz
            </button>
          </div>

          {/* Conditional rendering based on currentSection */}
          <div className="content-section">
            {currentSection === 'video' && <VideoSection courseData={courseData} />}
            {currentSection === 'article' && <ArticleSection courseData={courseData} />}
            {currentSection === 'quiz' && <QuizSection quizData={courseData.quiz} />}
          </div>
        </>
      )}
    </div>
  );
};

export default CoursePage;
