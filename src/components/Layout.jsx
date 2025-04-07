import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSidebar } from '../contexts/SidebarContext';
import LoginModal from '../components/LoginModal';

function Layout() {
  const { isToggled, toggleSidebar, sidebarProps } = useSidebar();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/user');

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Expected JSON, but received ${contentType}`);
        }

        const data = await response.json();
        setUserInfo({ name: data.name });
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    if (isToggled) {
      toggleSidebar();
    }
  };

  const handleCloseModal = () => setShowLoginModal(false);

  const links = [
    { path: '/course-home', id: 'sidebar', label: 'Course Home' },
    { path: '/cooking', id: 'cooking', label: 'Cooking' },
    { path: '/produce', id: 'produce', label: 'Produce' },
    { path: '/sautee', id: 'sautee', label: 'Sautee' },
    { path: '/sear', id: 'sear', label: 'Sear' },
    { path: '/international', id: 'international', label: 'International' },
  ];

  const userName = userInfo?.name || 'Guest';

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <Sidebar
        title={sidebarProps.title}
        image={sidebarProps.image}
        links={links}
        titleClassName={sidebarProps.titleClassName}
        imageClassName={sidebarProps.imageClassName}
      />

      {/* Page content wrapper */}
      <div id="page-content-wrapper" className="flex-grow-1">
        {/* Top navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbarContainer">
          <div className="container-fluid">
            <button
              className={`hamburger-btn ${isToggled ? 'right' : ''}`}
              id="sidebarToggle"
              onClick={toggleSidebar}
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
                  <Link to="/course-home" id="course-home" className="nav-link">
                    Course Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create-course" id="create" className="nav-link">
                    Create
                  </Link>
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
                      onClick={handleLoginClick}
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

        {/* Render child routes (e.g., CourseHome, Cooking, etc.) */}
        <Outlet />
      </div>

      {/* Login Modal */}
      <LoginModal show={showLoginModal} onClose={handleCloseModal} />
    </div>
  );
}

export default Layout;
