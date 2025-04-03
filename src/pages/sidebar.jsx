import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sidebarImage from '../assets/house-icon.png';
import LoginModal from '../components/LoginModal';


function Sidebar() {
  const [isToggled, setIsToggled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);  // Show the login modal
    setIsToggled(false);     // Close the sidebar
  };
  const handleCloseModal = () => setShowLoginModal(false);

  const toggleSidebar = () => {
    setIsToggled(prevState => !prevState);
  };

  useEffect(() => {
    const savedToggleState = localStorage.getItem('sb|sidebar-toggle');
    if (savedToggleState === 'true') {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sb|sidebar-toggle', isToggled);
  }, [isToggled]);

  return (
    <div className={`d-flex ${isToggled ? 'sb-sidenav-toggled' : ''}`} id="wrapper">
      <div id="sidebar-wrapper" className={isToggled ? "open" : ""}>
        {/* Sidebar content here */}
        <div className={`border-end bg-white ${isToggled ? 'sb-sidenav-toggled' : ''}`} id="sidebar-content">
          <div className="sidebarTitleContainer">
            <div className="sidebar-heading border-bottom bg-light sidebarTitle">
              Course Home<img className="sidebarImage" src={sidebarImage} alt="icon image of a house" />
            </div>
          </div>
          <div className="list-group list-group-flush">
            <Link to="/course-home" id="sidebar" className="list-group-item list-group-item-action list-group-item-light p-3 sidebar sidebarLink">Course Home</Link>
            <Link to="/cooking" id="cooking" className="list-group-item list-group-item-action list-group-item-light p-3">Cooking</Link>
            <Link to="/produce" id="produce" className="list-group-item list-group-item-action list-group-item-light p-3">Produce</Link>
            <Link to="/sautee" id="sautee" className="list-group-item list-group-item-action list-group-item-light p-3">Sautee</Link>
            <Link to="/sear" id="sear" className="list-group-item list-group-item-action list-group-item-light p-3">Sear</Link>
            <Link to="/international" id="sear" className="list-group-item list-group-item-action list-group-item-light p-3">International</Link>
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
              <h1 className='mt-4 navbarTitle'>
                <Link to="/" id="home" className="navbarTitleLink">
                  Video &#10140; Article &#10140; Quiz &#10140; Profile &#10140; Status
                </Link>
              </h1>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item active"><Link to="/home" id="home" className="nav-link">Home</Link></li>
                <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelled="navbarDropdown">
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
          <p>
            Make sure to keep all page content within the
            <code>#page-content-wrapper</code>
            . The top navbar is optional, and just for demonstration. Just create an element with the
            <code>#sidebarToggle</code>
            ID which will toggle the menu when clicked.
          </p>
        </div>

        {/* Login Modal */}
        <LoginModal show={showLoginModal} onClose={handleCloseModal} />
      </div>
    </div>
  );
}

export default Sidebar;
