import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CookingImage from '../assets/cooking-icon.png'

function Cooking() {
    const links = [
        { path: '/course-home', label: 'Course Home', id: 'sidebar' },
        { path: '/cooking', label: 'Cooking', id: 'cooking' },
        { path: '/produce', label: 'Produce', id: 'produce' },
        { path: '/sautee', label: 'Sautee', id: 'sautee' },
        { path: '/sear', label: 'Sear', id: 'sear' },
        { path: '/international', label: 'International', id: 'international' },
    ];

    return (
        <div className="d-flex" id="wrapper">
            {/* Sidebar Component */}
            <Sidebar 
            title="Cooking" 
            image={CookingImage} 
            links={links} 
            titleClassName="cookingTitle"
            imageClassName="cookingImage"
            />

            {/* Page content wrapper */}
            <div id="page-content-wrapper">
                {/* Page content */}
                <div className="container-fluid">
                    <h1 className="mt-4">Cooking</h1>
                    <p>Welcome to the Cooking section. Here you will learn the art of cooking.</p>
                    <p>
                        Explore various cooking techniques and recipes that will help you master the culinary world.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Cooking;