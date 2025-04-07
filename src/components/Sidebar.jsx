import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';

function Sidebar({ links = [], handleLoginClick }) {
  const { isToggled, sidebarProps } = useSidebar();

  return (
    <div id="sidebar-wrapper" className={isToggled ? 'open' : ''}>
      {/* Sidebar */}
      <div id="sidebar-content" className={`${isToggled ? 'sb-sidenav-toggled' : ''}`}>
        <div className="sidebarTitleContainer">
          <div className={`sidebar-heading border-bottom bg-light ${sidebarProps.titleClassName || 'sidebarTitle'}`}>
            {sidebarProps.title}
            {sidebarProps.image && sidebarProps.image !== '' ? (
              <img className={`${sidebarProps.imageClassName || 'sidebarImage'}`} src={sidebarProps.image} alt="Sidebar icon" />
            ) : null}
          </div>
        </div>
        <div className="list-group list-group-flush">
          {/* Render links dynamically */}
          {links?.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              id={link.id}
              className="list-group-item list-group-item-action list-group-item-light p-3"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
