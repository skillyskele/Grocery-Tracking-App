import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        console.log(`Here is the token achieved from the server: ${data.token}`)
        setMessage("Successful Login");
        setMessageColor('green');
        navigate("dashboard");
      } else {
        setMessage(data.message);
        setMessageColor('red');
      }
    } catch (error) {
      alert('Unable to connect to the server. Please check your internet connection or try again later.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("register");
  };

  return (
    <div style={{ width: "100vh", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h4>Sign in Page</h4>
      <div id="message-container" style={{ color: messageColor }}>
        {message}
      </div>
      <form id="login" onSubmit={handleLogin}>
        <TextField 
          id="username" 
          label="Enter Username" 
          variant="outlined" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <TextField 
          id="password" 
          label="Enter Password" 
          type="password" 
          variant="outlined" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button variant="contained" type="submit" onClick={handleLogin}>Login</Button>
      </form>
      <Button variant="contained" type="submit" onClick={handleRegister}>Register</Button>
    </div>
  );
}

export default Login;
