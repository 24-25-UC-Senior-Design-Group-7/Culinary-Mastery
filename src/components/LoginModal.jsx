import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../service/auth.js'; // Import the login function from AuthService
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook from AuthContext

const LoginModal = ({ show, onClose }) => {
    const { login } = useAuth(); // Use login method from AuthContext to set user globally
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginService(formData.email, formData.password);
            if (response.status === 200) {
                login(response.data.user); // Assuming response.data.user contains the user details
                setMessage("Login successful!");
                onClose(); // Close the modal
                navigate('/course-home'); // Redirect user to the course home page
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error occurred while logging in');
        }
    };

    return (
        <div
            className={`modal fade ${show ? "show d-block" : ""}`}
            style={{ display: show ? "block" : "none" }}
            aria-hidden={!show}
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content p-4">
                    <div className="modal-header">
                        <h5 className="modal-title">Login</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email" className="loginLabel">Email:</label>
                                <input
                                    type="email"
                                    className="form-control loginInput"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ex. John@gmail.com"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="loginLabel">Password:</label>
                                <input
                                    type="password"
                                    className="form-control loginInput"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn loginBtn">Login</button>
                        </form>
                        {message && <div className="alert alert-info mt-3">{message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
