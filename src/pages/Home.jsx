import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import LoginModal from '../components/LoginModal';
import BrandLogo from '../assets/Culinary-Mastery-Logo.png';
import RegisterModal from '../components/RegisterModal';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleLoginClick = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);

  const handleRegisterClick = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const slides = [
    {
      id: "title",
      title: "The Culinary Mastery App",
      description: "Master the art of cooking with high-quality tutorials and personalized learning paths.",
      image: null,
    },
    {
      id: "about",
      title: "About Culinary Mastery",
      description: "The Culinary Mastery app is designed to teach foundational cooking skills, allowing users to confidently apply each learned skill to a variety of dishes. Our mission is to empower users to become proficient in the kitchen, regardless of their prior experience.",
      image: "https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "features",
      title: "Features",
      description: (
        <>
          <ul>
            <li>High-Quality Video Tutorials: Learn cooking techniques with step-by-step guidance.</li>
            <li>Personalized Learning Paths: Tailor your learning experience based on your skill level.</li>
            <li>Diverse & Accessible Content: Subtitles, closed captions, and multilingual support available.</li>
            <li>Community Forums: Connect with other learners and share your culinary journey.</li>
          </ul>
        </>
      ),
      image: "https://images.unsplash.com/photo-1518291344630-4857135fb581?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const intervalRef = useRef(null);

  const toggleNavbar = () => {
    if (isNavbarOpen) {
      setIsClosing(true);
      setIsNavbarOpen(false);
      setTimeout(() => {
        setIsClosing(false);
      }, 500);
    } else {
      setIsNavbarOpen(true);
      setIsClosing(false);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleManualChange = (direction, targetSlideId = null) => {
    if (targetSlideId) {
      const targetIndex = slides.findIndex(slide => slide.id === targetSlideId);
      setActiveIndex(targetIndex);
    } else {
      if (direction === "next") {
        nextSlide();
      } else if (direction === "prev") {
        prevSlide();
      }
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 8000);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark homeNavbarContainer">
        <Link className="navbar-brand" to="/">
          Culinary Mastery
        </Link>
        <div className="navbar-brand-wrapper">
          <img src={BrandLogo} alt="The Culinary Master Logo" className="navbar-brand-image" />
        </div>
        <button
          className={`navbar-toggler ${isNavbarOpen ? "toggled" : ""}`}
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isNavbarOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <div className="navbar-toggler-icon">
            <span className={`line ${isNavbarOpen ? "toggled" : ""}`}></span>
            <span className={`line ${isNavbarOpen ? "toggled" : ""}`}></span>
            <span className={`line ${isNavbarOpen ? "toggled" : ""}`}></span>
          </div>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''} ${isClosing ? 'closing' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <ScrollLink
                className="nav-link"
                to="about"
                smooth={true}
                duration={250}
                offset={-70}
                onClick={() => handleManualChange('next', 'about')}
              >
                About
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                className="nav-link"
                to="features"
                smooth={true}
                duration={250}
                offset={-70}
                onClick={() => handleManualChange('next', 'features')}
              >
                Features
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                className="nav-link"
                to="courses"
                smooth={true}
                duration={50}
                offset={-100}
              >
                Courses
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                className="nav-link"
                to="contact"
                smooth={true}
                duration={50}
                offset={-70}
              >
                Contact Us
              </ScrollLink>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={handleLoginClick}
                id="login-button"
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={handleRegisterClick}
                id="register-button"
              >
                Register
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="aboutFeaturesCarousel" className="carousel slide hero-section">
        <div className="hero-overlay"></div>
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${activeIndex === index ? 'active' : ''} ${!slide.image ? 'no-image' : ''} ${slide.id === 'about' ? 'about' : ''} ${slide.id === 'features' ? 'features' : ''}`}
            >
              <div className="container d-flex align-items-center justify-content-center">
                {/* Left Side: Title & Description */}
                <div className="text-content text-center">
                  <h1 className={`display-3 mb-4 ${slide.id === 'about' ? 'about-title' : ''} ${slide.id === 'features' ? 'feature-title' : ''}`}>
                    {slide.title}
                  </h1>
                  {typeof slide.description === 'string' ? (
                    <p className="lead about-description">{slide.description}</p>
                  ) : (
                    slide.description
                  )}
                </div>

                {/* Right Side: Image */}
                {slide.image && (
                  <div className="hero-image-container">
                    <img
                      src={slide.image}
                      className="img-fluid rounded hero-image"
                      alt={slide.title}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="carousel-control-wrapper">
          <button
            className="carousel-control-prev"
            type="button"
            onClick={() => {
              handleManualChange("prev");
              document.activeElement.blur();
            }}
            aria-label="Previous"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            onClick={() => {
              handleManualChange("next");
              document.activeElement.blur();
            }}
            aria-label="Next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      {/* Courses Section */}
      <section id="courses" className="container mt-5">
        <h2>Courses</h2>
        <div className="row">
          {/* Course Cards */}
          {[
            {
              title: 'Produce Basics',
              description: 'Discover the essentials of selecting, preparing, and storing fresh produce.',
              image: 'https://images.unsplash.com/photo-1556911220-dabc1f02913a?q=80&w=2070&auto=format&fit=crop',
            },
            {
              title: 'Searing Basics',
              description: 'Master the technique of searing to create rich and flavorful crusts on meats or vegetables.',
              image: 'https://cdn.shopify.com/s/files/1/0619/7487/2253/files/Anova-Steak-Guide-Sous-Vide-Photos10-copy-flip-sear-1024x682.jpg',
            },
            {
              title: 'Sauté Basics',
              description: 'Learn the technique of sautéing to cook ingredients quickly, meanwhile preserving flavor and texture.',
              image: 'https://www.bhg.com/thmb/w98FgPUYDih5VuKXn11RDJoL3g0=/4000x0/filters:no_upscale():strip_icc()/BHG-how-to-saute-onions-03-5665975_BdVQC-b5KnZBxtNuR5SHEC-ce9832e411d64dfb99488ad3fe408d2c.jpg',
            }
          ].map((course, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img src={course.image} className="card-img-top" alt={course.title} />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <Link to="/course-home" className="btn btn-primary courseBtn">Start Learning</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-7">
            <h2>Contact Us</h2>
            <p>If you have any questions or need assistance, feel free to reach out to us.</p>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  placeholder="Your message"
                  autoComplete="off"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
          <div className="col-md-5 d-flex justify-content-end">
            <img
              src="https://images.unsplash.com/photo-1586985564259-6211deb4c122?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="contact-img img-fluid"
              alt="Contact us"
            />
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal show={showLoginModal} onClose={handleCloseModal} />

      {/* Register Modal */}
      <RegisterModal show={showRegisterModal} onClose={handleCloseRegisterModal} />

      {/* Footer */}
      <footer className="footer bg-dark p-3 homeFooter">
        <div className="textContent">
          <p className="footerP">Developed by Online Senior Design Group 7: Levi Huff, Guy-Leroc Ossebi, Jackson Pinchot, Deepak Baral, and Carrie Louderback. &nbsp;&nbsp;&nbsp;&nbsp;&copy; 2024-2025 Culinary Mastery Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
