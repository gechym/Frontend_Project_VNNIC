import React, { useState } from "react";
import "./styles/LoginForm.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = "http://127.0.0.1:8000" || process.env.REACT_APP_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("API_BASE_URL:", API_BASE_URL); // Log API URL

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Read the response body once
      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      if (response.ok) {
        console.log("Login successful");
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        console.error("Login failed");
        alert(data.detail); // Show the error message
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-window">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-title">Login</h1>
          <div className="input-group">
            <FaUserAlt className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="register-link">
            {/* <p>
            Don't have an account?<a href='#'>Register</a>
          </p> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
