import React from 'react';
import { Link } from 'react-router-dom';

function CourseHome({ userInfo, loading, error }) {
  if (error) {
    console.error('Error fetching user info:', error); 
  }

  return (
    <div className="Course-Home-Content">
      <h1 className="mt-4 text-center">
        {loading
          ? 'Loading, please wait...'
          : `Welcome to the Course Home, ${userInfo?.name || 'Guest User'}`}
      </h1>

      {/* Courses Section */}
      <section id="course-home-courses" className="container">
        <div className="d-flex flex-wrap justify-content-center">
          {/* Course Cards */}
          {[ 
            {
              title: 'Produce Basics',
              description: 'Discover the essentials of selecting, preparing, and storing fresh produce.',
              image: 'https://images.unsplash.com/photo-1556911220-dabc1f02913a?q=80&w=2070&auto=format&fit=crop',
              link: '/produce',
              buttonText: 'Produce Course',
            },
            {
              title: 'Searing Basics',
              description: 'Master the technique of searing to create rich and flavorful crusts on meats or vegetables.',
              image: 'https://cdn.shopify.com/s/files/1/0619/7487/2253/files/Anova-Steak-Guide-Sous-Vide-Photos10-copy-flip-sear-1024x682.jpg',
              link: '/sear',
              buttonText: 'Searing Course',
            },
            {
              title: 'Sautee Basics',
              description: 'Learn the technique of sautéing to cook ingredients quickly, meanwhile preserving flavor and texture.',
              image: 'https://www.bhg.com/thmb/w98FgPUYDih5VuKXn11RDJoL3g0=/4000x0/filters:no_upscale():strip_icc()/BHG-how-to-saute-onions-03-5665975_BdVQC-b5KnZBxtNuR5SHEC-ce9832e411d64dfb99488ad3fe408d2c.jpg',
              link: '/sautee',
              buttonText: 'Sautee Course',
            }
          ].map((course, index) => (
            <div className="coursehome-card-container" key={index}>
              <div className="coursehome-card">
                <img src={course.image} className="coursehome-card-img-top" alt={course.title} />
                <div className="coursehome-card-body">
                  <h5 className="coursehome-card-title">{course.title}</h5>
                  <p className="coursehome-card-text">{course.description}</p>
                  <Link to={course.link} className="btn btn-primary courseBtn">{course.buttonText}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CourseHome;
