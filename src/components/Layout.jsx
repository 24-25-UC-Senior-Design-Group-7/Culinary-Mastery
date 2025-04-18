import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSidebar } from '../contexts/SidebarContext';
import LoginModal from '../components/LoginModal';
import { logout } from '../service/auth';
import axios from '../axiosConfig.js';
import { useAuth } from '../contexts/AuthContext'; // Import your auth context


function Layout() {
  const { isToggled, toggleSidebar, sidebarProps } = useSidebar();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Use auth context
  const [userInfo, setUserInfo] = useState(null);
  

  

  useEffect(() => {
    setUserInfo(user);
    const fetchUserInfo = async () => {
        try {
            // Since withCredentials is set to true, the browser will automatically include the HTTP-only cookies with the request
            const response = await axios.get('/users/current-user', {
                withCredentials: true
            });
            if (response.status === 200) {
                setUserInfo(response.data.user);
                // Store the user ID in localStorage
          localStorage.setItem('userId', response.data.user.id);
            }
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            setError(error.response?.data?.message || 'Failed to fetch user information');
        } finally {
            setLoading(false);
        }
    };
    fetchUserInfo();
}, [user]);



  const handleLoginClick = () => {
    setShowLoginModal(true);
    if (isToggled) {
      toggleSidebar();
    }
  };

  const handleLogout = async () => {
    try {
        await logout(); // Use the logout function
        setUserInfo(null); // Clear user info after successful logout
        console.log('Logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};


  const handleCloseModal = () => setShowLoginModal(false);

  const links = [
    { path: '/course-home', id: 'sidebar', label: 'Course Home' },
    { path: '/my-courses', id: 'sidebar', label: 'My Courses' },
    { path: '/cooking', id: 'cooking', label: 'Cooking' },
    { path: '/produce', id: 'produce', label: 'Produce' },
    { path: '/sautee', id: 'sautee', label: 'Sautee' },
    { path: '/sear', id: 'sear', label: 'Sear' },
    { path: '/international', id: 'international', label: 'International' },
  ];

  const userName = userInfo?.name || 'Guest';

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar
        title={sidebarProps.title}
        image={sidebarProps.image}
        links={links}
        titleClassName={sidebarProps.titleClassName}
        imageClassName={sidebarProps.imageClassName}
      />

      <div id="page-content-wrapper" className="flex-grow-1">
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
                <li className="nav-item active">
                  <Link to="/my-courses" id="course-home" className="nav-link">
                    My Courses
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
                    {userName}
                  </a>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <div className="dropdown-items-container">
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <a className="dropdown-item" href="#!">
                        Another action
                      </a>
                      <div className="dropdown-divider"></div>
                      {userInfo ? (
                        <button className="dropdown-item" onClick={handleLogout} id="logout-button">Logout</button>
                      ) : (
                        <button className="dropdown-item" onClick={handleLoginClick} id="login-button">Login</button>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Outlet context={{ userInfo, loading, error }} />
      </div>

      <LoginModal show={showLoginModal} onClose={handleCloseModal} />
    </div>
  );
}

export default Layout;
