import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { setLogin } from '../state/authState';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    phone: '',
    email: '',
    userType: '', // For the userType selection
  });


  const handleSignUp = (e) => {
    e.preventDefault();
    // Process signup logic here using 'signupData'
    console.log('Signup Data:', signupData);
  };

  const handleToggleMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/user/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Handle success, maybe show a success message
        console.log('User logged in successfully');
        navigate('/');
        dispatch(setLogin({
          token:response.data.token,
          user:response.data.username
        }))
        console.log(response)
        // setUserData(null)
      } else {
        // Handle failure, maybe show an error message
        console.error('Error logging in user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
<div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
            <form onSubmit={handleLogin} className="sign-in-form">
            <h2 className="title">Log in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={signupData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signupData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signupData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={signupData.phone}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="input-field">
            <select
  name="userType"
  value={signupData.userType}
  onChange={handleInputChange}
>
  <option value="">Select User Type</option>
  <option value="customer">Customer</option>
  <option value="admin">Admin</option>
  <option value="manager">Manager</option>
</select>

            </div> */}
            <input type="submit" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Are you ready to explore the fascinating world of IT ?</p>
            <button className="btn transparent" id="sign-up-btn" onClick={handleToggleMode}>
              Sign up
            </button>
          </div>
          <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p><h2> CONNECT. INNOVATE. INSPIRE.</h2></p>
            <button className="btn transparent" id="sign-in-btn" onClick={handleToggleMode}>
              Sign in
            </button>
          </div>
          <img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;