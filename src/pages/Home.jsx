import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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

      {/* Hero Section with Slider */}
      <div id="aboutFeaturesCarousel" className="carousel slide hero-section" data-bs-ride="carousel">
        <div className="hero-overlay"></div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container text-center">
              <h1 className="display-3">The Culinary Mastery Application</h1>
              <p className="lead">Master the art of cooking with high-quality tutorials and personalized learning paths</p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container text-center">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h2>About Culinary Mastery</h2>
                  <p>The Culinary Mastery app is designed to teach foundational cooking skills...</p>
                </div>
                <div className="col-md-6">
                  <img src="https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=2076&auto=format&fit=crop" className="img-fluid rounded" alt="Cooking in action" />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container text-center">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h2>Features</h2>
                  <ul>
                    <li>High-Quality Video Tutorials</li>
                    <li>Personalized Learning Paths</li>
                    <li>Diverse & Accessible Content</li>
                    <li>Community Forums</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <img src="https://images.unsplash.com/photo-1518291344630-4857135fb581?q=80&w=2069&auto=format&fit=crop" className="img-fluid rounded" alt="Features overview" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#aboutFeaturesCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#aboutFeaturesCarousel" data-bs-slide="next">
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
              <img src="https://images.unsplash.com/photo-1556911220-dabc1f02913a?q=80&w=2070&auto=format&fit=crop" className="card-img-top" alt="Basic Knife Skills" />
              <div className="card-body">
                <h5 className="card-title">Basic Knife Skills</h5>
                <Link to="/course-home" className="btn btn-primary">Start Learning</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="https://images.unsplash.com/photo-1504693390394-c24671c3e8bb?q=80&w=2070&auto=format&fit=crop" className="card-img-top" alt="Sauce Making" />
              <div className="card-body">
                <h5 className="card-title">Sauce Making</h5>
                <Link to="/course-home" className="btn btn-primary">Start Learning</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=500&auto=format&fit=crop&q=60" className="card-img-top" alt="Baking Basics" />
              <div className="card-body">
                <h5 className="card-title">Baking Basics</h5>
                <Link to="/course-home" className="btn btn-primary">Start Learning</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mt-5">
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" id="message" rows="4" placeholder="Your message"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
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
      <footer className="footer bg-dark text-white text-center p-3">
        <p>&copy; 2024-2025 Culinary Mastery Team. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
