import React, { useState } from 'react';
import './styles/LoginForm.css';
import { FaUserAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Khởi tạo navigate

  const API_BASE_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Handle successful login
        console.log('Login successful');
        localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
        navigate('/'); // Điều hướng về trang chính
      } else {
        // Handle failed login
        console.error('Login failed');
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
