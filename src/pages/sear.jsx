import React, { useEffect, useRef, useState } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import axios from '../axiosConfig'; // Ensure the path is correct
import SauteeImage from '../assets/saute-icon.png';
import { Link } from 'react-router-dom'; // For navigation

function Sear() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newProps = {
      title: 'Sauté',
      image: SauteeImage,
      titleClassName: 'sauteeTitle',
      imageClassName: 'sauteeImage',
    };

    if (
      prevSidebarProps.current.title !== newProps.title ||
      prevSidebarProps.current.image !== newProps.image
    ) {
      updateSidebarProps(newProps);
      prevSidebarProps.current = newProps;
    }

    // Fetch courses for Sauté
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/courses/culinaryTechnique/Sear`);
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Sautee courses:', error);
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
    <div className="content-wrapper">
      <h1 className="mt-4">Sear Techniques</h1>
      <p>Explore the world of Sear techniques and master the art of cooking.</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
            <p>No courses found for Sauté techniques.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Sear;
