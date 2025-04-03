import React from 'react';
import Sidebar from '../components/Sidebar';
import CourseHomeImage from '../assets/house-icon.png';

function CourseHome() {
  // Sidebar links
  const links = [
    { path: '/course-home', label: 'Course Home', id: 'sidebar' },
    { path: '/cooking', label: 'Cooking', id: 'cooking' },
    { path: '/produce', label: 'Produce', id: 'produce' },
    { path: '/sautee', label: 'Sautee', id: 'sautee' },
    { path: '/sear', label: 'Sear', id: 'sear' },
    { path: '/international', label: 'International', id: 'international' },
  ];

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar Component */}
      <Sidebar title="Course Home" image={CourseHomeImage} links={links} />

      {/* Page content wrapper */}
      <div id="page-content-wrapper">
        {/* Page content */}
        <div className="container-fluid">
          <h1 className="mt-4">Welcome to the Course Home</h1>
          <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
        </div>
      </div>
    </div>
  );
}

export default CourseHome;