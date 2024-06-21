import React, { useState } from 'react';
// import './styles/LoginForm.css';
// import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = 'http://127.0.0.1:8000' || process.env.REACT_APP_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("API_BASE_URL:", API_BASE_URL);  // Log API URL

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Read the response body once
      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      if (response.ok) {
        console.log('Login successful');
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        console.error('Login failed');
        alert(data.detail); // Show the error message
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className=''>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUserAlt className='icon' />
        </div>
        <div className=''>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>
        <div className='remember-forgot'>
          <label>
            <input type='checkbox' /> Remember me
          </label>
          <a href='#'>Forgot password?</a>
        </div>
        <button type='submit'>Login</button>
        <div className='register-link'>
          {/* <p>
            Don't have an account?<a href='#'>Register</a>
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;