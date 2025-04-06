import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProduceImage from '../assets/produce.png';

function Produce() {
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
                title="Produce" 
                image={ProduceImage} 
                links={links}
                titleClassName="produceTitle"
                imageClassName="produceImage"
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
                    <h1 className="mt-4">Explore the World of Produce</h1>
                    <p>In this section, we'll explore various fruits, vegetables, and other plant-based ingredients used in culinary creations. From farm to table, discover the importance of fresh produce in cooking.</p>
                    <p>Learn how to select, store, and prepare a wide variety of produce to elevate your dishes.</p>
                </div>
            </div>
        </div>
    );
}

export default Produce;