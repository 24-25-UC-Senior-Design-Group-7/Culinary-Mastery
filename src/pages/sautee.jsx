import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import SauteeImage from '../assets/saute-icon.png'; // Sautee image

function Sautee() {
    // Define the links specific to the Sautee page
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
                title="Sautee" 
                image={SauteeImage} 
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
                    <h1 className="mt-4">Sautee Techniques</h1>
                    <p>Learn the art of sauteeing in this section. It's a cooking technique where food is cooked quickly in a pan with a small amount of fat.</p>
                    <p>Explore various sautee methods and master the skills to create delicious dishes.</p>
                </div>
            </div>
        </div>
    );
}

export default Sautee;