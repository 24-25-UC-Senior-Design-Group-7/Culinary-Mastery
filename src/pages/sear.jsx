import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SearImage from '../assets/sear-icon.png'; 

function Sear() {
    const links = [
        { path: '/course-home', id: 'sidebar', label: 'Course Home' },
        { path: '/cooking', id: 'cooking', label: 'Cooking' },
        { path: '/produce', id: 'produce', label: 'Produce' },
        { path: '/sautee', id: 'sautee', label: 'Sautee' },
        { path: '/sear', id: 'sear', label: 'Sear' },
        { path: '/international', id: 'international', label: 'International' }
    ];

    return (
        <div className="d-flex" id="wrapper">
            {/* Sidebar Component with specific props */}
            <Sidebar 
                title="Sear" 
                image={SearImage} 
                links={links}
                titleClassName="searTitle"
                imageClassName="searImage"
            />

            {/* Page content wrapper */}
            <div id="page-content-wrapper">
                {/* Top navigation */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom navbarContainer">
                    <div className="container-fluid">
                        <div className="navbarTitleContainer">
                            <h1 className='mt-4 navbarTitle'>
                                <Link to="/" id="home" className="navbarTitleLink">
                                    Culinary Mastery
                                </Link>
                            </h1>
                        </div>
                    </div>
                </nav>

                {/* Page content */}
                <div className="container-fluid">
                    <h1 className="mt-4">Sear Techniques</h1>
                    <p>Learn how to sear meat and other ingredients to perfection in this section. Searing enhances flavors and adds texture.</p>
                    <p>Explore different methods for searing, from pan-searing to grilling, and master this important cooking technique.</p>
                </div>
            </div>
        </div>
    );
}

export default Sear;