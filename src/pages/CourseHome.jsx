import React, { useEffect, useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import axios from '../axiosConfig'; // Ensure this path is correct based on your project structure
import CourseHomeImage from '../assets/house-icon.png';

function CourseHome() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useOutletContext();

  useEffect(() => {
    const newProps = {
      title: 'Course Home',
      image: CourseHomeImage,
      titleClassName: 'sidebarTitle',
      imageClassName: 'sidebarImage',
    };

    if (
      prevSidebarProps.current.title !== newProps.title ||
      prevSidebarProps.current.image !== newProps.image ||
      prevSidebarProps.current.titleClassName !== newProps.titleClassName ||
      prevSidebarProps.current.imageClassName !== newProps.imageClassName
    ) {
      updateSidebarProps(newProps);
      prevSidebarProps.current = newProps;
    }

    // Fetch courses from the backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses/list_of_courses');
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();

    return () => {
      updateSidebarProps({
        title: '',
        image: '',
        titleClassName: '',
        imageClassName: '',
      });
    };
  }, [updateSidebarProps]);

  return (
    <div className="Course-Home-Content">     
      <h1 className="mt-4 text-center">
        {loading ? 'Loading, please wait...' : `Welcome to the Course Home, ${userInfo?.name || 'Guest User'}`}
      </h1>
      <section id="course-home-courses" className="container">
        <div className="coursehome-cards-wrapper">
          <div className="d-flex flex-wrap justify-content-center">
            {courses.length > 0 ? courses.map((course, index) => (
              <div className="coursehome-card-container" key={index}>
                <div className="coursehome-card">
                  <img src={`https://img.youtube.com/vi/${course.videoId}/0.jpg`} className="coursehome-card-img-top" alt={course.title} />
                  <div className="coursehome-card-body">
                    <h5 className="coursehome-card-title">{course.title}</h5>
                    <p className="coursehome-card-text">{course.description}</p>
                    <Link to={`/courses/${course.id}`} className="btn btn-primary courseBtn">Start Course</Link>
                  </div>
                </div>
              </div>
            )) : (
              <p>No courses available.</p>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseHome;
