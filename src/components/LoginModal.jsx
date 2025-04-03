import React from "react";

const LoginModal = ({ show, onClose }) => {
  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content p-4">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="username" className="mb-2 loginLabel">Username:</label>
                <input
                  type="text"
                  className="form-control py-2 loginInput"
                  id="username"
                  placeholder="Enter your username"
                  name="username"
                  autoComplete="username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="mb-2 mt-3 loginLabel">Password:</label>
                <input
                  type="password"
                  className="form-control py-2 loginInput"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-4 loginBtn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
