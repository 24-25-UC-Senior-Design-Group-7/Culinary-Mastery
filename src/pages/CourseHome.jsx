import React, { useEffect, useRef } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import { Link, useOutletContext } from 'react-router-dom';
import CourseHomeImage from '../assets/house-icon.png';

function CourseHome() {
  const { updateSidebarProps } = useSidebar();
  const prevSidebarProps = useRef({});

  // Get userInfo and loading from Layout's Outlet context
  const { userInfo, loading } = useOutletContext();

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
        {loading ? (
          'Loading, please wait...'
        ) : (
          <>
            Welcome to the Course Home,{' '}
            <span className="user-name">
              {userInfo?.name || 'Guest User'}
            </span>
          </>
        )}
      </h1>
      <section id="course-home-courses" className="container">
        <div className="coursehome-cards-wrapper">
          <div className="d-flex flex-wrap justify-content-center">
            {[
              {
                title: 'Produce Basics',
                description: 'Learn how to select, prepare, and store fresh produce.',
                image: 'https://images.unsplash.com/photo-1556911220-dabc1f02913a?q=80&w=2070&auto=format&fit=crop',
                link: '/produce',
                buttonText: 'Start Produce',
              },
              {
                title: 'Searing Basics',
                description: 'Master the art of searing for perfectly cooked meats.',
                image: 'https://cdn.shopify.com/s/files/1/0619/7487/2253/files/Anova-Steak-Guide-Sous-Vide-Photos10-copy-flip-sear-1024x682.jpg',
                link: '/sear',
                buttonText: 'Start Searing',
              },
              {
                title: 'Sauté Basics',
                description: 'Learn the technique of sautéing to cook ingredients quickly, meanwhile preserving flavor and texture.',
                image: 'https://www.bhg.com/thmb/w98FgPUYDih5VuKXn11RDJoL3g0=/4000x0/filters:no_upscale():strip_icc()/BHG-how-to-saute-onions-03-5665975_BdVQC-b5KnZBxtNuR5SHEC-ce9832e411d64dfb99488ad3fe408d2c.jpg',
                link: '/sautee',
                buttonText: 'Start Sautéing',
              }
            ].map((course, index) => (
              <div className="coursehome-card-container" key={index}>
                <div className="coursehome-card">
                  <img src={course.image} className="coursehome-card-img-top" alt={course.title} />
                  <div className="coursehome-card-body">
                    <h5 className="coursehome-card-title">{course.title}</h5>
                    <p className="coursehome-card-text">{course.description}</p>
                    <Link to={course.link} className="btn btn-primary courseBtn">{course.buttonText}</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseHome;
