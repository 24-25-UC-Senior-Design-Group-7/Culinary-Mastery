import React, { useEffect, useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import axios from '../axiosConfig'; // Adjust import path to your axios config
import CourseHomeImage from '../assets/house-icon.png'; // Adjust to your local image path

function MyCourses() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // If you already have user info stored in context or localStorage, you can retrieve userId from there.
  // For example, using your outlet context from the parent's Layout:
  const { userInfo } = useOutletContext();
  const userId = userInfo?.id || localStorage.getItem('userId');

  useEffect(() => {
    const newProps = {
      title: 'My Courses',
      image: CourseHomeImage,
      titleClassName: 'sidebarTitle',
      imageClassName: 'sidebarImage',
    };

    // Only update sidebar if the props have changed
    if (
      prevSidebarProps.current.title !== newProps.title ||
      prevSidebarProps.current.image !== newProps.image ||
      prevSidebarProps.current.titleClassName !== newProps.titleClassName ||
      prevSidebarProps.current.imageClassName !== newProps.imageClassName
    ) {
      updateSidebarProps(newProps);
      prevSidebarProps.current = newProps;
    }

    // Fetch the user's enrolled courses from the backend
    const fetchUserCourses = async () => {
      if (!userId) {
        setError('No user ID found. Unable to fetch user courses.');
        setLoading(false);
        return;
      }

      try {
        // Using your user courses endpoint
        const response = await axios.get(`/api/usercourses/user/${userId}/courses`);
        // The endpoint is expected to return an array of courses the user is enrolled in
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching user courses:', err);
        setError('Failed to fetch user courses');
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();

    // Cleanup or re-init if needed
    return () => {
      updateSidebarProps({
        title: '',
        image: '',
        titleClassName: '',
        imageClassName: '',
      });
    };
  }, [updateSidebarProps, userId]);

  if (loading) {
    return <div className="Course-Home-Content"><h1 className="mt-4 text-center">Loading, please wait...</h1></div>;
  }

  if (error) {
    return <div className="Course-Home-Content"><h1 className="mt-4 text-center">{error}</h1></div>;
  }

  const truncateText = (text = '', maxLen = 150) => {
    if (text.length > maxLen) {
      return text.slice(0, maxLen) + '...';
    }
    return text;
  };

  return (
    <div className="Course-Home-Content">
      <h1 className="mt-4 text-center">
        {courses.length > 0
          ? `Here are your courses, ${userInfo?.name || 'Guest User'}`
          : `You have not enrolled in any courses yet, ${userInfo?.name || 'Guest User'}`
        }
      </h1>
      <section id="course-home-courses" className="container">
        <div className="coursehome-cards-wrapper">
          <div className="d-flex flex-wrap justify-content-center">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <div className="coursehome-card-container" key={index}>
                  <div className="coursehome-card">
                    {/* Using YouTube's thumbnail if videoId is a YouTube ID */}
                    <img
                      src={`https://img.youtube.com/vi/${course.videoId}/0.jpg`}
                      className="coursehome-card-img-top"
                      alt={course.title}
                    />
                    <div className="coursehome-card-body">
                      <h5 className="coursehome-card-title">{course.title}</h5>
                      <p className="coursehome-card-text"> {truncateText(course.description, 150)}</p>
                      <Link to={`/courses/${course.id}`} className="btn btn-primary courseBtn">
                        Resume Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyCourses;
