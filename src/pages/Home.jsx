import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const slides = [
    {
      title: "The Culinary Mastery App",
      description: "Master the art of cooking with high-quality tutorials and personalized learning paths",
      image: null,
    },
    {
      title: "About Culinary Mastery",
      description: "The Culinary Mastery app is designed to teach foundational cooking skills, allowing users to confidently apply each learned skill to a variety of dishes. Our mission is to empower users to become proficient in the kitchen, regardless of their prior experience.",
      image: "https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Features",
      description: (
        <ul>
          <li>High-Quality Video Tutorials: Learn cooking techniques with step-by-step guidance.</li>
          <li>Personalized Learning Paths: Tailor your learning experience based on your skill level.</li>
          <li>Diverse & Accessible Content: Subtitles, closed captions, and multilingual support available.</li>
          <li>Community Forums: Connect with other learners and share your culinary journey.</li>
        </ul>
      ),
      image: "https://images.unsplash.com/photo-1518291344630-4857135fb581?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleManualChange = (direction) => {
    if (direction === "next") nextSlide();
    if (direction === "prev") prevSlide();

    clearInterval(intervalId);

    const newIntervalId = setInterval(nextSlide, 8000);
    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    setIntervalId(interval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark homeNavbarContainer">
        <Link className="navbar-brand" to="/">Culinary Mastery</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="#about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#features">Features</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#courses">Courses</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">Login</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        id="aboutFeaturesCarousel"
        className="carousel slide hero-section"
        data-bs-ride="carousel"
      >
        <div className="hero-overlay"></div>
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${activeIndex === index ? 'active' : ''} ${!slide.image ? 'no-image' : ''}`}
            >
              <div className="container">
                <div className="row justify-content-center align-items-center">
                  <div className={`col-md-${slide.image ? '6' : '12'} text-center`}>
                    <h1 className="display-3 mb-4">{slide.title}</h1>
                    <p className="lead">{slide.description}</p>
                  </div>
                  {slide.image && (
                    <div className="col-md-6 d-flex justify-content-center align-items-center hero-image-container">
                      <img
                        src={slide.image}
                        className="img-fluid hero-image"
                        alt={slide.title}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" onClick={() => handleManualChange("prev")}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" onClick={() => handleManualChange("next")}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Courses Section */}
      <section id="courses" className="container mt-5">
        <h2>Courses</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="https://images.unsplash.com/photo-1556911220-dabc1f02913a?q=80&w=2070&auto=format&fit=crop" className="card-img-top" alt="Produce Basics" />
              <div className="card-body">
                <h5 className="card-title">Produce Basics</h5>
                <p class="card-text">Discover the essentials of selecting, preparing, and storing fresh produce.</p>
                <Link to="/course-home" className="btn btn-primary courseBtn">Start Learning</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="https://cdn.shopify.com/s/files/1/0619/7487/2253/files/Anova-Steak-Guide-Sous-Vide-Photos10-copy-flip-sear-1024x682.jpg" className="card-img-top" alt="Searing Basics" />
              <div className="card-body">
                <h5 className="card-title">Searing Basics</h5>
                <p class="card-text">Master the technique of searing to create rich and flavorful crusts on meats or vegetables.</p>
                <Link to="/course-home" className="btn btn-primary courseBtn">Start Learning</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="https://www.bhg.com/thmb/w98FgPUYDih5VuKXn11RDJoL3g0=/4000x0/filters:no_upscale():strip_icc()/BHG-how-to-saute-onions-03-5665975_BdVQC-b5KnZBxtNuR5SHEC-ce9832e411d64dfb99488ad3fe408d2c.jpg" className="card-img-top" alt="Sautee Basics" />
              <div className="card-body">
                <h5 className="card-title">Sautee Basics</h5>
                <p class="card-text">Learn the technique of sautéing to cook ingredients quickly, meanwhile preserving flavor and texture.</p>
                <Link to="/course-home" className="btn btn-primary courseBtn">Start Learning</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-7">
            <h2 className="contact-title">Contact Us</h2>
            <p>If you have any questions or need assistance, feel free to reach out to us.</p>
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label for="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea className="form-control" id="message" rows="4" placeholder="Your message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
          <div className="col-md-5 d-flex justify-content-end">
            <img src="https://images.unsplash.com/photo-1586985564259-6211deb4c122?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="contact-img img-fluid" alt="Contact us" />
          </div>
        </div>
      </section>


      {/* Login Modal */}
      <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center p-3 homeFooter">
        <p>&copy; 2024-2025 Culinary Mastery Team. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
