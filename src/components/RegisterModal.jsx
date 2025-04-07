import React, { useState } from "react";
import axios from "axios";
import env from "../env";

const RegisterModal = ({ show, onClose }) => {
    const baseURL = env.BASE_URL || "http://localhost:5000";
    console.log(baseURL);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${baseURL}/auth/register`, formData
            );
            setMessage(response.data.message);
        } catch (error) {
            const errorMsg = error.response?.data?.error ? error.response.data.error : "Error registering user. Email might already exist";
            setMessage(errorMsg);
            console.log(error.response?.data?.error || 'No specific error message received');
        }
    };

    return (
        <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content p-4">
                    <div className="modal-header">
                        <h5 className="modal-title">Register</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username" className="loginLabel">Full Name:</label>
                                <input
                                    type="text"
                                    className="form-control loginInput"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ex. John Doe"
                                />
                            </div>
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
                                    placeholder="Ex. john@gmail.com"
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
                            <button type="submit" className="btn loginBtn">Register</button>
                        </form>
                        {message && <div className="alert alert-info mt-3">{message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
