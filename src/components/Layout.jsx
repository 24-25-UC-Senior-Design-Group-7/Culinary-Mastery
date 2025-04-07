import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSidebar } from '../contexts/SidebarContext';

function Layout() {
  const { sidebarProps } = useSidebar();

  const links = [
    { path: '/course-home', id: 'sidebar', label: 'Course Home' },
    { path: '/cooking', id: 'cooking', label: 'Cooking' },
    { path: '/produce', id: 'produce', label: 'Produce' },
    { path: '/sautee', id: 'sautee', label: 'Sautee' },
    { path: '/sear', id: 'sear', label: 'Sear' },
    { path: '/international', id: 'international', label: 'International' },
  ];

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar
        title={sidebarProps.title}
        image={sidebarProps.image}
        links={links}
        titleClassName={sidebarProps.titleClassName}
        imageClassName={sidebarProps.imageClassName}
      />
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
