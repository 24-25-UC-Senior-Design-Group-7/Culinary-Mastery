import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSidebar } from '../contexts/SidebarContext';
import LoginModal from '../components/LoginModal';

function Layout() {
  const { isToggled, toggleSidebar, sidebarProps } = useSidebar();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Handle the login click
  const handleLoginClick = () => {
    setShowLoginModal(true);
    if (isToggled) {
      toggleSidebar();  // Close the sidebar if it's open
    }
  };

  // Close the login modal
  const handleCloseModal = () => setShowLoginModal(false);

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
      {/* Sidebar */}
      <Sidebar
        title={sidebarProps.title}
        image={sidebarProps.image}
        links={links}
        titleClassName={sidebarProps.titleClassName}
        imageClassName={sidebarProps.imageClassName}
        handleLoginClick={handleLoginClick}  // Passing handleLoginClick to Sidebar
      />

      {/* Page content wrapper */}
      <div id="page-content-wrapper" className="flex-grow-1">
        {/* Top navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom navbarContainer">
          <div className="container-fluid">
            <button
              className={`hamburger-btn ${isToggled ? 'right' : ''}`}
              id="sidebarToggle"
              onClick={toggleSidebar}  // Allow hamburger to toggle sidebar normally
            >
              <div className={`hamburger ${isToggled ? 'toggled' : ''}`}>
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
              </div>
            </button>
            <div className="navbarTitleContainer">
              <h1 className="mt-4 navbarTitle">
                <Link to="/" id="home" className="navbarTitleLink">
                  Culinary Mastery
                </Link>
              </h1>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <Link to="/home" id="home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#!">
                    Link
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#!">
                      Action
                    </a>
                    <a className="dropdown-item" href="#!">
                      Another action
                    </a>
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-item"
                      onClick={handleLoginClick}  // Call the handleLoginClick function
                      id="login-button"
                    >
                      Login
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal show={showLoginModal} onClose={handleCloseModal} />
    </div>
  );
}

export default Layout;
