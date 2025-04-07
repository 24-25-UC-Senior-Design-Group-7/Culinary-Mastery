import React, { useEffect, useRef, useState } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import ProduceImage from '../assets/produce.png';
import CoursePage from '../components/CoursePage';

function Produce() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const newProps = {
      title: 'Produce',
      image: ProduceImage,
      titleClassName: 'produceTitle',
      imageClassName: 'produceImage',
    };

    if (
      prevSidebarProps.current.title !== newProps.title ||
      prevSidebarProps.current.image !== newProps.image
    ) {
      updateSidebarProps(newProps);
      prevSidebarProps.current = newProps;
    }

    return () => {
      updateSidebarProps({
        title: '',
        image: '',
        titleClassName: '',
        imageClassName: '',
      });
    };
  }, [updateSidebarProps]);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses/produce-course-id");
        const jsonData = await response.json();
        setCourseData(jsonData.course);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    loadCourse();
  }, []);

  return (
    <div className="content-wrapper">
      <h1>Explore the World of Produce</h1>
      <p>In this section, we'll explore various fruits, vegetables, and other plant-based ingredients used in culinary creations.</p>

      {courseData ? (
        <CoursePage courseData={courseData} />
      ) : (
        <p>Loading course data...</p>
      )}
    </div>
  );
}

export default Produce;