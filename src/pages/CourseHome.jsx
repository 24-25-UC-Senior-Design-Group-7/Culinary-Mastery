import React, { useEffect, useRef } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import CourseHomeImage from '../assets/house-icon.png';
import { Link } from 'react-router-dom';

function CourseHome() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});

  useEffect(() => {
    const newProps = {
      title: 'Course Home',
      image: CourseHomeImage,
      titleClassName: 'sidebarTitle',
      imageClassName: 'sidebarImage',
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

  return (
    <div className="Course-Home-Content">
      <h1 className="mt-4 text-center">Welcome to the Course Home</h1>
      {/* Courses Section */}
      <section id="course-home-courses" className="container">
        <div className="d-flex flex-wrap justify-content-center">
          {/* Course Cards */}
          {[
            {
              title: 'Produce Basics',
              description: 'Discover the essentials of selecting, preparing, and storing fresh produce.',
              image: 'https://images.unsplash.com/photo-1556911220-dabc1f02913a?q=80&w=2070&auto=format&fit=crop',
            },
            {
              title: 'Searing Basics',
              description: 'Master the technique of searing to create rich and flavorful crusts on meats or vegetables.',
              image: 'https://cdn.shopify.com/s/files/1/0619/7487/2253/files/Anova-Steak-Guide-Sous-Vide-Photos10-copy-flip-sear-1024x682.jpg',
            },
            {
              title: 'Sautee Basics',
              description: 'Learn the technique of sautéing to cook ingredients quickly, meanwhile preserving flavor and texture.',
              image: 'https://www.bhg.com/thmb/w98FgPUYDih5VuKXn11RDJoL3g0=/4000x0/filters:no_upscale():strip_icc()/BHG-how-to-saute-onions-03-5665975_BdVQC-b5KnZBxtNuR5SHEC-ce9832e411d64dfb99488ad3fe408d2c.jpg',
            }
          ].map((course, index) => (
            <div className="coursehome-card-container" key={index}>
              <div className="coursehome-card">
                <img src={course.image} className="coursehome-card-img-top" alt={course.title} />
                <div className="coursehome-card-body">
                  <h5 className="coursehome-card-title">{course.title}</h5>
                  <p className="coursehome-card-text">{course.description}</p>
                  <Link to="/course-home" className="btn btn-primary courseBtn">Start Learning</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CourseHome;
