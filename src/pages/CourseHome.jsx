import React, { useEffect, useRef } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import CourseHomeImage from '../assets/house-icon.png';

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
      // Clear props on unmount
      updateSidebarProps({
        title: '',
        image: '',
        titleClassName: '',
        imageClassName: '',
      });
    };
  }, [updateSidebarProps]);

  return (
    <div className="container-fluid">
      <h1 className="mt-4">Welcome to the Course Home</h1>
      <p>
        The starting state of the menu will appear collapsed on smaller screens,
        and will appear non-collapsed on larger screens. When toggled using the
        button below, the menu will change.
      </p>
    </div>
  );
}

export default CourseHome;
