import React, { useState } from "react";
import axios from "axios";
import env from "../env";

const LoginModal = ({ show, onClose }) => {
    const baseURL = env.BASE_URL;
    const [formData, setFormData] = useState({
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
                `${baseURL}/auth/login`, formData
            );
            setMessage(response.data.message);
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
                                <label htmlFor="email-login-label" className="loginLabel">Email:</label>
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
