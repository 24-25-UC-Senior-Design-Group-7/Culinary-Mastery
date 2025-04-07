import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import CourseHomeImage from '../assets/house-icon.png';
import LoginModal from '../components/LoginModal';

function Sidebar({ links = [] }) {  // Make sure `links` is passed as a prop
  const { isToggled, toggleSidebar, sidebarProps } = useSidebar();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    toggleSidebar();
  };

  const handleCloseModal = () => setShowLoginModal(false);

  return (
    <div className={`d-flex ${isToggled ? 'sb-sidenav-toggled' : ''}`} id="wrapper">
      <div id="sidebar-wrapper" className={isToggled ? 'open' : ''}>
        {/* Sidebar */}
        <div className={`${isToggled ? 'sb-sidenav-toggled' : ''}`} id="sidebar-content">
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
                className={`list-group-item list-group-item-action list-group-item-light p-3`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Page content wrapper */}
      <div id="page-content-wrapper" className={isToggled ? 'shifted' : ''}>
        {/* Top navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom navbarContainer">
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
                <li className="nav-item active"><Link to="/home" id="home" className="nav-link">Home</Link></li>
                <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#!">Action</a>
                    <a className="dropdown-item" href="#!">Another action</a>
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

        {/* Page content */}
        <div className="container-fluid">
          <h1 className="mt-4"></h1>
          <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
        </div>

        {/* Login Modal */}
        <LoginModal show={showLoginModal} onClose={handleCloseModal} />
      </div>
    </div>
  );
}

export default Sidebar;
