import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Ensure this imports your Axios configuration
import VideoSection from '../components/VideoSection';
import ArticleSection from '../components/ArticleSection';
import QuizSection from '../components/QuizSection';
import AnalyticsTab from '../components/AnalyticsTab';

import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState('video');
  const { id } = useParams();  // This fetches the courseId from the URL
  const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const { data } = await axios.get(`/api/courses/${id}`);
        if (data.course.quiz) {
          data.course.quiz = JSON.parse(data.course.quiz);
        }
        // Automatically enroll the user in the course
        await axios.post(`/api/usercourses/enroll`, { userId, courseId: id });
        setCourseData(data.course);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError('An error occurred while fetching the course data.');
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  if (loading) {
    return <div>Loading course data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="Course-Home-Content">
      <div className="container">
      
        {courseData && (
          <>
            <div className="course-header">
              <h1>{courseData.title}</h1>
            </div>

            <div className="nav nav-tabs" role="tablist">
              <button onClick={() => handleSectionChange('video')} className={`nav-link ${currentSection === 'video' ? 'active' : ''}`}>Video</button>
              <button onClick={() => handleSectionChange('article')} className={`nav-link ${currentSection === 'article' ? 'active' : ''}`}>Article</button>
              <button onClick={() => handleSectionChange('quiz')} className={`nav-link ${currentSection === 'quiz' ? 'active' : ''}`}>Quiz</button>
              <button onClick={() => handleSectionChange('analytics')} className={currentSection === 'analytics' ? 'nav-link active' : 'nav-link'}>Analytics</button>

            </div>

            <div className="content-section">
              {currentSection === 'video' && <VideoSection courseData={courseData} />}
              {currentSection === 'article' && <ArticleSection courseData={courseData} />}
              {currentSection === 'quiz' && <QuizSection quizData={courseData.quiz} courseId={id}/>}
              {currentSection === 'analytics' && <AnalyticsTab userId={userId} courseId={id} courseData={courseData} quizData={courseData.quiz} />}
            </div>
          </>
        )}
      </div>
    </div>
    
  );
};

export default CoursePage;
