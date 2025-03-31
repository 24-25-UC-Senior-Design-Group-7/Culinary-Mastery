import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProduceImage from '../assets/produce.png';

function Produce() {
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        const savedToggleState = localStorage.getItem('sb|sidebar-toggle');
        // Set initial state based on saved state, default to closed
        if (savedToggleState === 'true') {
            setIsToggled(true);
        }
    }, []);

    useEffect(() => {
        // Apply or remove the body class based on the state
        if (isToggled) {
            document.body.classList.add('sb-sidenav-toggled');
        } else {
            document.body.classList.remove('sb-sidenav-toggled');
        }
        // Save the state in localStorage
        localStorage.setItem('sb|sidebar-toggle', isToggled);
    }, [isToggled]);

    const toggleSidebar = () => {
        setIsToggled(prevState => !prevState); // Toggle the state
    };

    return (
        <div className={`d-flex ${isToggled ? 'sb-sidenav-toggled' : ''}`} id="wrapper">
            {/* Produce */}
            <div className={`border-end bg-white ${isToggled ? 'sb-sidenav-toggled' : ''}`} id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom bg-light produceTitle">Produce<img className="produceImage" src={ProduceImage} alt="icon image of produce" /></div>
                <div className="list-group list-group-flush">
                    <Link to="/course-home" id="sidebar" className="list-group-item list-group-item-action list-group-item-light p-3">Course Home</Link>
                    <Link to="/cooking" id="cooking" className="list-group-item list-group-item-action list-group-item-light p-3">Cooking</Link>
                    <Link to="/produce" id="produce" className="list-group-item list-group-item-action list-group-item-light p-3 produce produceLink">Produce</Link>
                    <Link to="/sautee" id="sautee" className="list-group-item list-group-item-action list-group-item-light p-3">Sautee</Link>
                    <Link to="/sear" id="sear" className="list-group-item list-group-item-action list-group-item-light p-3">Sear</Link>
                    <Link to="/nepalese" id="sear" className="list-group-item list-group-item-action list-group-item-light p-3">Nepalese</Link>
                </div>
            </div>

            {/* Page content wrapper */}
            <div id="page-content-wrapper">
                {/* Top navigation */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom navbarContainer">
                    <div className="container-fluid">
                        <button className="hamburger-btn" id="sidebarToggle" onClick={toggleSidebar}>
                            <div className={`hamburger ${!isToggled ? 'toggled' : ''}`}>
                                <div className="line line-1"></div>
                                <div className="line line-2"></div>
                                <div className="line line-3"></div>
                            </div>
                        </button>
                        <div className="navbarTitleContainer">
                            <h1 className='mt-4 navbarTitle'><Link to="/" id="home" className="navbarTitleLink">Culinary Mastery Courses</Link></h1>
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
                                        <a className="dropdown-item" href="#!">Something else here</a>
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
            </div>
        </div>
    );
}

export default Produce;
