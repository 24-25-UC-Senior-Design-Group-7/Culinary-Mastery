import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Adjust the import path as needed

function AnalyticsTab({ userId, courseId, courseData, quizData }) {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch analytics data for the user
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await axios.get(`/api/usercourses/analytics/${userId}`);
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [userId]);

  if (loading) return <div>Loading analytics, please wait...</div>;
  if (error) return <div>{error}</div>;

  // Filter analytics records so we only show data for the current courseId
  const filteredAnalytics = analytics.filter(item => item.course_id === courseId);

  return (
    <div className="Course-Home-Content">
      <h1 className="mt-4 text-center">Analytics for {courseData?.title}</h1>

      <section id="analytics-cards" className="container">
        <div className="coursehome-cards-wrapper">
          <div className="d-flex flex-wrap justify-content-center">
            {filteredAnalytics.length > 0 ? (
              filteredAnalytics.map((analytic, index) => (
                <div className="coursehome-card-container" key={index}>
                  <div className="coursehome-card">
                    {/* Thumbnail from the course's videoId */}
                    {courseData?.videoId ? (
                      <img
                        src={`https://img.youtube.com/vi/${courseData.videoId}/0.jpg`}
                        className="coursehome-card-img-top"
                        alt={courseData.title}
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/150"
                        className="coursehome-card-img-top"
                        alt="No Thumbnail"
                      />
                    )}

                    <div className="coursehome-card-body">
                      {/* Analytics info for this course */}
                      <h5 className="coursehome-card-title">Score: {analytic.quiz_score} / {quizData.quiz.length}</h5>
                      <p className="coursehome-card-text">
                        Completed: {analytic.completed ? 'Yes' : 'No'}
                      </p>
                      <p className="coursehome-card-text">
                        Course ID: {courseData.culinaryTechnique}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No analytics available for this course.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnalyticsTab;
