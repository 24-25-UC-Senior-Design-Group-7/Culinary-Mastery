import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Reusable Sidebar Component
import internationalImage from '../assets/nepalese-flag.png'; // International image

function International() {
    // Define the links specific to the International page
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
                title="International" 
                image={internationalImage} 
                links={links}
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
                    <h1 className="mt-4">Explore International Cuisine</h1>
                    <p>In this section, you'll learn about the rich and diverse flavors from different cultures around the world.</p>
                    <p>We'll dive into recipes, techniques, and unique ingredients that define the culinary traditions of various countries.</p>
                </div>
            </div>
        </div>
    );
}

export default International;
