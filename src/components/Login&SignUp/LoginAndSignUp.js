import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, TextField, Button, Link } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginAndSignUp() {
  const [activeTab, setActiveTab] = useState(1); // Set default active tab to Login (index 1)
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    phone: '',
    email: '',
    userType: '', // For the userType selection
  });

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:4000/user/signUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData), // Send the userData object as JSON in the request body
        });
  
        if (response.ok) {
          // Handle success, maybe show a success message
          console.log('User signed up successfully');
        //   setUserData(null)
        } else {
          // Handle failure, maybe show an error message
          console.error('Error signing up user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };


  const handleLogin = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:4000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send the userData object as JSON in the request body
        });
  
        if (response.ok) {
          // Handle success, maybe show a success message
          console.log('User login up successfully');
          navigate('/cards');

        //   setUserData(null)
        } else {
          // Handle failure, maybe show an error message
          console.error('Error login up user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  
  return (
    <div style={{backgroundColor:'black' ,height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Box className="form-wrap" sx={{ width: 320, margin: '4em auto', boxShadow: '0px 1px 8px #BEBEBE',borderRadius:'30px',backgroundColor:'white'}}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Sign Up" />
        <Tab label="Login" />
      </Tabs>

      <Box className="tabs-content" sx={{ padding: '1.5em' }}>
        <Box 
          role="tabpanel" 
          hidden={activeTab !== 0} 
          id="signup-tab-content" 
          sx={{ display: activeTab === 0 ? 'block' : 'none' }}
        >
          <form className="signup-form" action="" method="post">
          <TextField
        name="username"
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userData.username}
        onChange={handleInputChange}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userData.password}
        onChange={handleInputChange}
      />
      <TextField
        name="phone"
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userData.phone}
        onChange={handleInputChange}
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userData.email}
        onChange={handleInputChange}
      />
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="userType-label">User Type</InputLabel>
        <Select
          labelId="userType-label"
          id="userType"
          name="userType"
          value={userData.userType}
          onChange={handleInputChange}
          label="User Type"
        >
          <MenuItem value="">Select User Type</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="faculty">Faculty</MenuItem>
          <MenuItem value="developer">Developer</MenuItem>
        </Select>
      </FormControl>
            <Button variant="contained" color="primary" fullWidth
            onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </form>
          <Box className="help-text" sx={{ marginTop: '.6em' }}>
            <Typography variant="body2" align="center">
              By signing up, you agree to our
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="#">Terms of service</Link>
            </Typography>
          </Box>
        </Box>

        <Box 
          role="tabpanel" 
          hidden={activeTab !== 1} 
          id="login-tab-content" 
          sx={{ display: activeTab === 1 ? 'block' : 'none' }}
        >
          <form className="login-form" action="" method="post">
            <TextField
              id="user_login"
              label="Email or Username"
              variant="outlined"
              fullWidth
              margin="normal"
              name='username'
              value={formData.username}
              onChange={handleFormInputChange}
              autoComplete="off"
            />
            <TextField
              id="user_pass"
              label="Password"
              type="password"
              name='password'
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleFormInputChange}
              margin="normal"
              autoComplete="off"
            />
            <Button variant="contained" color="primary" fullWidth
            onClick={handleLogin}
            >
              Login
            </Button>
          </form>
          <Box className="help-text" sx={{ marginTop: '.6em' }}>
            <Typography variant="body2" align="center">
              <Link href="#">Forget your password?</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
    </div>
  );
}

export default LoginAndSignUp;
